# Implementation Plan: Admin Invitation Signup Flow

## Overview

This plan implements the admin invitation-based signup flow as defined in `invitation.specs.md`. The implementation follows the project's DDD + Hexagonal architecture.

---

## Phase 1: Domain Layer

### 1.1 Create Invitation Entity

**Location:** `apps/api/src/modules/invitation/domain/entities/`

- [ ] Create `Invitation.ts` entity with fields:
  - `id`, `email`, `firstName`, `lastName`, `status`
  - `inviteTokenHash`, `inviteTokenUsedAt`
  - `signupSessionTokenHash`, `signupSessionExpiresAt`
  - `initiatedAt`, `completedAt`, `revokedAt`, `expiresAt`
  - `invitedByAdminId`, `createdAt`, `updatedAt`

### 1.2 Create Value Objects

**Location:** `apps/api/src/modules/invitation/domain/value-objects/`

- [ ] Create `InvitationStatus.ts` enum: `pending`, `initiated`, `completed`, `expired`, `revoked`
- [ ] Create `InvitationToken.ts` value object (handles token generation and hashing)
- [ ] Create `SignupSessionToken.ts` value object

### 1.3 Create Domain Errors

**Location:** `apps/api/src/modules/invitation/domain/errors/`

- [ ] `InvitationDomainError.ts` - base error class
- [ ] `InvalidInvitationTokenError.ts` - token not found or invalid
- [ ] `InvitationExpiredError.ts` - invitation past expiration
- [ ] `InvitationRevokedError.ts` - invitation was revoked
- [ ] `InvitationAlreadyUsedError.ts` - token already consumed
- [ ] `InvitationAlreadyCompletedError.ts` - signup already finished
- [ ] `SignupSessionExpiredError.ts` - session token expired
- [ ] `SignupSessionInvalidError.ts` - session token not found
- [ ] `PasswordMismatchError.ts` - password confirmation doesn't match
- [ ] `PasswordPolicyViolationError.ts` - password doesn't meet requirements
- [ ] `EmailAlreadyExistsError.ts` - admin email already registered
- [ ] `UnauthorizedInviterError.ts` - inviter not allowed to create invitations

### 1.4 Create Domain Contracts

**Location:** `apps/api/src/modules/invitation/domain/contracts/`

- [ ] `PasswordPolicy.ts` - interface for password validation policy

---

## Phase 2: Application Layer

### 2.1 Create Ports (Driven)

**Location:** `apps/api/src/modules/invitation/application/ports/driven/`

- [ ] `InvitationRepository.ts` - persistence interface
  - `findByInviteTokenHash(hash: string)`
  - `findBySignupSessionTokenHash(hash: string)`
  - `findByEmail(email: string)`
  - `save(invitation: Invitation)`
  - `updateAtomically(invitation: Invitation)` - for race-safe transitions
- [ ] `TokenGenerator.ts` - interface for secure token generation
- [ ] `TokenHasher.ts` - interface for hashing tokens
- [ ] `AdminRepository.ts` - interface to check/create admin accounts
- [ ] `SessionCreator.ts` - interface to create admin sessions
- [ ] `EmailSender.ts` - interface to send invitation emails

### 2.2 Create Ports (Driving)

**Location:** `apps/api/src/modules/invitation/application/ports/driving/`

- [ ] `CreateInvitation.ts` - contract for invitation creation
- [ ] `RetrieveInvitation.ts` - contract for token retrieval endpoint
- [ ] `CompleteSignup.ts` - contract for signup completion endpoint

### 2.3 Create Use Cases

**Location:** `apps/api/src/modules/invitation/application/use-cases/`

- [ ] `CreateInvitationUseCase.ts`
  - Validate inviter authorization (hardcoded email check)
  - Check email not already invited/registered
  - Generate and hash invitation token
  - Create invitation with `pending` status
  - Send invitation email
  - Return invitation ID

- [ ] `RetrieveInvitationUseCase.ts`
  - Hash incoming token
  - Find invitation by token hash
  - Validate: not expired, not revoked, not used, status is `pending`
  - Atomically transition to `initiated`
  - Generate signup session token
  - Return prefilled data + session token + expiration

- [ ] `CompleteSignupUseCase.ts`
  - Hash signup session token
  - Find invitation by session token hash
  - Validate: status is `initiated`, session not expired
  - Validate password against policy
  - Check admin email doesn't exist
  - Atomically: create admin, complete invitation, create session
  - Return session response

### 2.4 Create Password Policy

**Location:** `apps/api/src/modules/invitation/application/services/`

- [ ] `PasswordPolicyService.ts`
  - Minimum 12 characters
  - Passwords match
  - Extensible for future rules

---

## Phase 3: Infrastructure Layer

### 3.1 Create HTTP Layer

**Location:** `apps/api/src/modules/invitation/infrastructure/http/`

- [ ] `InvitationController.ts`
  - `createInvitation(req, reply)` - POST /admin-invitations
  - `retrieveInvitation(req, reply)` - GET /admin-invitations/:token
  - `completeSignup(req, reply)` - POST /admin-invitations/complete

- [ ] `routes.ts` - register routes with Fastify

- [ ] `InvitationErrorHandler.ts` - map domain errors to HTTP exceptions

- [ ] DTOs:
  - `CreateInvitationDTO.ts`
  - `RetrieveInvitationResponseDTO.ts`
  - `CompleteSignupDTO.ts`

### 3.2 Create Adapters

**Location:** `apps/api/src/modules/invitation/infrastructure/adapters/`

- [ ] `InvitationRepositoryAdapter.ts` - implements repository port
- [ ] `TokenGeneratorAdapter.ts` - crypto random token generation
- [ ] `TokenHasherAdapter.ts` - SHA-256 or similar hashing
- [ ] `InvitationEmailSenderAdapter.ts` - uses existing email infrastructure

### 3.3 Database Migration

**Location:** `apps/api/src/migrations/` (or project's migration location)

- [ ] Create migration for `invitations` table with:
  - All fields from data model
  - Indexes on `email`, `invite_token_hash`, `signup_session_token_hash`
  - Nullable `role_id` column for future extension

### 3.4 HTTP Exceptions

**Location:** `apps/api/src/plugins/errors/exceptions/`

- [ ] Add invitation-related exceptions:
  - `invitation-not-found` (404)
  - `invitation-expired` (410 Gone)
  - `invitation-revoked` (410 Gone)
  - `invitation-already-used` (409 Conflict)
  - `invitation-already-completed` (409 Conflict)
  - `signup-session-expired` (410 Gone)
  - `signup-session-invalid` (401)
  - `password-mismatch` (400)
  - `password-policy-violation` (400)
  - `unauthorized-inviter` (403)

---

## Phase 4: Module Integration

### 4.1 Module Entry Point

**Location:** `apps/api/src/modules/invitation/`

- [ ] `index.ts` - export `InvitationApplication` class
- [ ] Wire up dependencies (repositories, services, use cases)

### 4.2 Environment Configuration

- [ ] Add environment variables:
  - `INVITATION_EXPIRATION_HOURS` (default: 72)
  - `SIGNUP_SESSION_EXPIRATION_MINUTES` (define default)
  - `ALLOWED_INVITER_EMAIL` (hardcoded inviter for now)

### 4.3 Register Module

- [ ] Register invitation routes in main app
- [ ] Ensure auth middleware is applied to creation endpoint

---

## Phase 5: Testing

### 5.1 Unit Tests

**Location:** `apps/api/src/test/modules/invitation/`

- [ ] Domain tests:
  - Invitation entity state transitions
  - Value object validation
  - Password policy validation

- [ ] Use case tests:
  - CreateInvitationUseCase (mock ports)
  - RetrieveInvitationUseCase (mock ports)
  - CompleteSignupUseCase (mock ports)

### 5.2 Integration Tests

- [ ] Repository adapter tests with test database
- [ ] Token generation/hashing tests

### 5.3 E2E Tests

- [ ] Full invitation flow:
  1. Create invitation (authorized admin)
  2. Retrieve invitation (with token)
  3. Complete signup (with password)
  4. Verify admin created and session active

- [ ] Edge cases:
  - Invalid token retrieval
  - Expired invitation
  - Revoked invitation
  - Double retrieval attempt
  - Expired signup session
  - Concurrent completion
  - Duplicate email at completion

---

## Phase 6: Documentation

- [ ] Update API documentation with new endpoints
- [ ] Document environment variables
- [ ] Add module to project map in CLAUDE.md

---

## Dependencies & Order

```
Phase 1 (Domain) → Phase 2 (Application) → Phase 3 (Infrastructure) → Phase 4 (Integration)
                                                    ↓
                                            Phase 5 (Testing)
                                                    ↓
                                          Phase 6 (Documentation)
```

---

## Open Items to Resolve

1. **Signup session expiration duration** - Needs decision (suggested: 30 minutes)
2. **Email template** - Needs design/content for invitation email
3. **Route prefix** - Confirm `/admin-invitations` fits API conventions
4. **Response envelope** - Verify matches existing API response structure

---

## Estimated Scope

- **New module:** `invitation`
- **New files:** ~25-30 files
- **Database changes:** 1 migration (new table + indexes)
- **Environment variables:** 3 new variables
