# Invitation Feature - Implementation Process

## Status: In Progress

**Current Phase:** Phase 4 - Module Integration ✅ COMPLETED
**Started:** 2026-03-07

---

## Phase 1: Domain Layer ✅

### 1.1 Create Invitation Entity
- [x] `Invitation.ts`
- [x] `index.ts`

### 1.2 Create Value Objects
- [x] `InvitationStatus.ts`
- [x] `InvitationToken.ts`
- [x] `SignupSessionToken.ts`
- [x] `index.ts`

### 1.3 Create Domain Errors
- [x] `InvitationDomainError.ts`
- [x] `InvalidInvitationTokenError.ts`
- [x] `InvitationExpiredError.ts`
- [x] `InvitationRevokedError.ts`
- [x] `InvitationAlreadyUsedError.ts`
- [x] `InvitationAlreadyCompletedError.ts`
- [x] `SignupSessionExpiredError.ts`
- [x] `SignupSessionInvalidError.ts`
- [x] `PasswordMismatchError.ts`
- [x] `PasswordPolicyViolationError.ts`
- [x] `EmailAlreadyExistsError.ts`
- [x] `UnauthorizedInviterError.ts`
- [x] `index.ts` (exports + error codes)

### 1.4 Create Domain Contracts
- [x] `PasswordPolicy.ts`
- [x] `InvitationContract.ts`
- [x] `index.ts`

### 1.5 Domain Index
- [x] `domain/index.ts`

---

## Phase 2: Application Layer ✅

### 2.1 Create Ports (Driven)
- [x] `InvitationRepository.ts`
- [x] `TokenGenerator.ts`
- [x] `TokenHasher.ts`
- [x] `AdminRepository.ts`
- [x] `SessionCreator.ts`
- [x] `EmailSender.ts`
- [x] `PasswordHasher.ts`
- [x] `index.ts`

### 2.2 Create Ports (Driving)
- [x] `CreateInvitation.ts`
- [x] `RetrieveInvitation.ts`
- [x] `CompleteSignup.ts`
- [x] `index.ts`

### 2.3 Create Use Cases
- [x] `CreateInvitationUseCase.ts`
- [x] `RetrieveInvitationUseCase.ts`
- [x] `CompleteSignupUseCase.ts`
- [x] `index.ts`

### 2.4 Create Services
- [x] `PasswordPolicyService.ts`
- [x] `index.ts`

### 2.5 Application Entry Point
- [x] `application/index.ts` (InvitationApplication class)

---

## Phase 3: Infrastructure Layer ✅

### 3.1 MongoDB Model
- [x] `InvitationMongoModel.ts` (schema with indexes)

### 3.2 Adapters
- [x] `InvitationMongoRepository.ts`
- [x] `TokenGeneratorAdapter.ts` (crypto randomBytes)
- [x] `TokenHasherAdapter.ts` (SHA-256 + timing-safe compare)
- [x] `PasswordHasherAdapter.ts` (bcrypt)
- [x] `InvitationEmailSenderAdapter.ts` (placeholder)
- [x] `index.ts`

### 3.3 HTTP Layer
- [x] `InvitationController.ts`
- [x] `routes.ts`
- [x] `index.ts`

### 3.4 Error Handler
- [x] `errors/handler.ts`
- [x] `errors/index.ts`

### 3.5 HTTP Exceptions (Global)
- [x] `plugins/errors/exceptions/invitation.ts` (11 exception codes)
- [x] Updated `plugins/errors/exceptions/index.ts`

### 3.6 Infrastructure Index
- [x] `infrastructure/index.ts`

### 3.7 Module Entry Point
- [x] `invitation/index.ts` (createInvitationModule factory)

---

## Phase 4: Module Integration ✅

### 4.1 Environment Configuration
- [x] Updated `config.ts` with Zod schema:
  - `INVITATION_ALLOWED_INVITER_EMAIL` (optional email)
  - `INVITATION_EXPIRATION_HOURS` (default: 72)
  - `INVITATION_SIGNUP_SESSION_EXPIRATION_MINUTES` (default: 30)
  - `INVITATION_BASE_URL` (optional URL)

### 4.2 Proxy Adapters
- [x] `AdminRepositoryProxy.ts` - connects to users module
- [x] `SessionCreatorProxy.ts` - connects to auth module

### 4.3 Fastify Plugin Registration
- [x] Updated `invitation/index.ts` with fastify-plugin
- [x] Module auto-loads via `plugins/routes/modules.ts`
- [x] Decorated fastify instance with `invitation` property

---

## Phase 5: Testing (Pending)

- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests

---

## Phase 6: Documentation (Pending)

- [ ] API documentation
- [ ] Environment variables documentation

---

## Files Created (59 total)

### Domain Layer (Phase 1) - 23 files
```
apps/api/src/modules/invitation/domain/
├── entities/
│   ├── Invitation.ts
│   └── index.ts
├── errors/
│   ├── InvitationDomainError.ts
│   ├── InvalidInvitationTokenError.ts
│   ├── InvitationExpiredError.ts
│   ├── InvitationRevokedError.ts
│   ├── InvitationAlreadyUsedError.ts
│   ├── InvitationAlreadyCompletedError.ts
│   ├── SignupSessionExpiredError.ts
│   ├── SignupSessionInvalidError.ts
│   ├── PasswordMismatchError.ts
│   ├── PasswordPolicyViolationError.ts
│   ├── EmailAlreadyExistsError.ts
│   ├── UnauthorizedInviterError.ts
│   └── index.ts
├── value-objects/
│   ├── InvitationStatus.ts
│   ├── InvitationToken.ts
│   ├── SignupSessionToken.ts
│   └── index.ts
├── contracts/
│   ├── PasswordPolicy.ts
│   ├── InvitationContract.ts
│   └── index.ts
└── index.ts
```

### Application Layer (Phase 2) - 20 files
```
apps/api/src/modules/invitation/application/
├── ports/
│   ├── driven/
│   │   ├── InvitationRepository.ts
│   │   ├── TokenGenerator.ts
│   │   ├── TokenHasher.ts
│   │   ├── AdminRepository.ts
│   │   ├── SessionCreator.ts
│   │   ├── EmailSender.ts
│   │   ├── PasswordHasher.ts
│   │   └── index.ts
│   ├── driving/
│   │   ├── CreateInvitation.ts
│   │   ├── RetrieveInvitation.ts
│   │   ├── CompleteSignup.ts
│   │   └── index.ts
│   └── index.ts
├── services/
│   ├── PasswordPolicyService.ts
│   └── index.ts
├── use-cases/
│   ├── CreateInvitationUseCase.ts
│   ├── RetrieveInvitationUseCase.ts
│   ├── CompleteSignupUseCase.ts
│   └── index.ts
└── index.ts
```

### Infrastructure Layer (Phase 3) - 15 files
```
apps/api/src/modules/invitation/infrastructure/
├── adapters/
│   ├── InvitationMongoRepository.ts
│   ├── TokenGeneratorAdapter.ts
│   ├── TokenHasherAdapter.ts
│   ├── PasswordHasherAdapter.ts
│   ├── InvitationEmailSenderAdapter.ts
│   ├── AdminRepositoryProxy.ts      # Phase 4
│   ├── SessionCreatorProxy.ts       # Phase 4
│   └── index.ts
├── errors/
│   ├── handler.ts
│   └── index.ts
├── http/
│   ├── InvitationController.ts
│   ├── routes.ts
│   └── index.ts
├── InvitationMongoModel.ts
└── index.ts
```

### Module Entry Point
```
apps/api/src/modules/invitation/index.ts  # Fastify plugin
```

### Global Files Modified
```
apps/api/src/config.ts                              # Added env vars
apps/api/src/plugins/errors/exceptions/index.ts     # Added invitation exceptions
apps/api/src/plugins/errors/exceptions/invitation.ts # NEW
```

---

## Environment Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `INVITATION_ALLOWED_INVITER_EMAIL` | email | - | Email authorized to create invitations |
| `INVITATION_EXPIRATION_HOURS` | number | 72 | Hours until invitation expires |
| `INVITATION_SIGNUP_SESSION_EXPIRATION_MINUTES` | number | 30 | Minutes until signup session expires |
| `INVITATION_BASE_URL` | URL | auto | Base URL for invitation links |

---

## API Routes

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| `POST` | `/api/invitations/admin-invitations` | Create invitation | Required |
| `GET` | `/api/invitations/admin-invitations/:token` | Retrieve invitation | Public |
| `POST` | `/api/invitations/admin-invitations/complete` | Complete signup | Public |

---

## Progress Log

### 2026-03-07
- Started Phase 1 implementation
- Created value objects: InvitationStatus, InvitationToken, SignupSessionToken
- Created all domain errors (12 error classes + index with error codes)
- Created domain contracts: PasswordPolicy, InvitationContract
- Created Invitation entity with factory methods and state transition logic
- Phase 1 completed

- Started Phase 2 implementation
- Created driven ports: InvitationRepository, TokenGenerator, TokenHasher, AdminRepository, SessionCreator, EmailSender, PasswordHasher
- Created driving ports: CreateInvitation, RetrieveInvitation, CompleteSignup
- Created PasswordPolicyService with 12-char minimum + confirmation match
- Created use cases: CreateInvitationUseCase, RetrieveInvitationUseCase, CompleteSignupUseCase
- Created InvitationApplication class to wire dependencies
- Phase 2 completed

- Started Phase 3 implementation
- Created InvitationMongoModel with Mongoose schema and indexes
- Created adapters: InvitationMongoRepository, TokenGeneratorAdapter, TokenHasherAdapter, PasswordHasherAdapter, InvitationEmailSenderAdapter
- Created HTTP layer: InvitationController, routes
- Created error handler with HTTP status mapping for all domain errors
- Created invitation HTTP exceptions (11 codes) and updated global exceptions index
- Created module entry point with createInvitationModule factory function
- Phase 3 completed

- Started Phase 4 implementation
- Updated config.ts with Zod schema for invitation environment variables
- Created AdminRepositoryProxy connecting to users module
- Created SessionCreatorProxy connecting to auth module
- Updated invitation/index.ts to be a fastify-plugin with auto-registration
- Module now auto-loads via fastify-autoload pattern
- Phase 4 completed
