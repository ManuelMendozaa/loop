# Feature: Admin Invitation Signup Flow

## 1. Overview

Implement an admin invitation-based signup flow for the admin system.

An existing authorized admin can create an invitation for a new admin by providing `email`, `firstName`, and `lastName`. The invited admin receives an email containing a secure URL with an invitation token. Opening that URL starts a secure signup wizard where the invited admin can review their prefilled identity fields and set their password.

The feature requires two API endpoints in this scope:

1. A retrieval endpoint that accepts the invitation token from the URL, validates it, transitions the invitation into the initiated state, consumes the original invitation token, and returns the prefilled data plus a temporary signup-session token.
2. A completion endpoint that accepts the signup-session token and password data, validates the password, creates the admin account, marks the invitation as completed, and creates a normal authenticated admin session immediately.

The implementation must follow the architectural and coding standards defined in the project’s existing `.md` guidance files in the repository.

---

# 2. Functional Requirements

1. Authorized admins can create invitations for new admins.
2. Invitation creation stores:

   * `email`
   * `firstName`
   * `lastName`
3. Invitation creation is restricted to a hardcoded allowed email for now.
4. The design must be ready for future role-based invitation authorization and future role assignment, but role persistence/assignment is out of scope in this feature.
5. Each invitation generates a secure invitation token sent by email.
6. Invitation tokens must expire after a configurable period, defaulting to **72 hours**.
7. Invitations support the following lifecycle states:

```
pending
initiated
completed
expired
revoked
```

8. When the invited admin opens the invite URL:

* the system validates the invitation token
* rejects revoked, expired, invalid, or already-consumed tokens
* atomically transitions the invitation from `pending` to `initiated`
* marks the invitation token as used/consumed
* creates a temporary signup-session token
* returns `email`, `firstName`, `lastName`, `signupSessionToken`, and `signupSessionExpiresAt`

9. The original invitation token is **single-use**.

10. If the invite URL is opened again after initiation, it must not issue another signup-session token.

11. The frontend must continue the flow using the returned signup-session token only.

12. In the signup wizard:

* `email`, `firstName`, and `lastName` are **read-only**
* the invited admin must provide `password`
* the invited admin must provide `passwordConfirmation`

13. On completion:

* validate the signup-session token
* validate the password and confirmation
* verify the invitation is still in a completable state
* create the admin account
* mark the invitation as `completed`
* create a normal admin authenticated session
* return whatever the system normally returns after a successful admin login/session creation

14. Both endpoints must support **idempotent behavior**.

---

# 3. Non-Functional Requirements

## Security

1. Tokens must be cryptographically random and opaque.
2. Only **hashed token values** may be stored in the database.
3. Password validation must be implemented in a way that is easy to expand later.
4. Invitation and signup-session validation must be **atomic and race-safe**.
5. Sensitive tokens must **never be logged** in plaintext.

## Reliability

1. Endpoint behavior must remain correct under retries, double clicks, and page refreshes.
2. Completion must prevent duplicate admin creation under concurrent requests.

## Maintainability

1. Password validation must be encapsulated to allow future policy expansion.
2. Invitation authorization must be implemented so it can later move from **hardcoded email to role/permission-based checks** with minimal refactor.
3. Invitation data model should leave room for **future role linkage** without requiring a redesign.

## Performance

1. Token lookup and completion flow should be constant-time from an application perspective, backed by indexed database access.
2. Endpoints should execute as standard transactional CRUD/auth operations.

---

# 4. Technical Design

## 4.1 Data Model

A dedicated **Invitation** entity is required.

### Invitation Fields

* `id`
* `email`
* `first_name`
* `last_name`
* `status`
* `invite_token_hash`
* `invite_token_used_at`
* `signup_session_token_hash`
* `signup_session_expires_at`
* `initiated_at`
* `completed_at`
* `revoked_at`
* `expires_at`
* `invited_by_admin_id`
* `created_at`
* `updated_at`

### Status Values

```
pending
initiated
completed
expired
revoked
```

### Indexes

* index on `email`
* index on `invite_token_hash`
* index on `signup_session_token_hash`

### Future Extension

Design must allow later introduction of:

```
role_id
or
roles[]
```

without requiring a schema redesign.

---

# 4.2 API Contracts

## Endpoint 1 — Retrieve Invitation / Start Signup

Purpose:

* Validate invitation token
* Consume invite token
* Issue signup session

Suggested route:

```
GET /admin-invitations/:token
```

### Request

Path parameter:

```
token
```

### Success Response

```json
{
  "email": "invited@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "signupSessionToken": "opaque-temporary-token",
  "signupSessionExpiresAt": "2026-03-10T15:00:00.000Z"
}
```

### Behavior

1. Hash incoming token.
2. Find invitation by `invite_token_hash`.
3. Reject if:

   * invalid
   * expired
   * revoked
   * already used
   * already completed
4. Atomically transition:

```
pending → initiated
```

5. Set:

```
invite_token_used_at = now
initiated_at = now
signup_session_token_hash
signup_session_expires_at
```

### Idempotency

* First call consumes invite token.
* Later calls with same invite token **fail safely**.
* No duplicate signup-session tokens issued.

---

## Endpoint 2 — Complete Signup

Purpose:

* Validate signup-session token
* Validate password
* Create admin
* Complete invitation
* Create session

Suggested route:

```
POST /admin-invitations/complete
```

### Request

```json
{
  "signupSessionToken": "opaque-temporary-token",
  "password": "secure-password",
  "passwordConfirmation": "secure-password"
}
```

### Success Response

Must match the **existing admin login success response**, including session creation.

### Behavior

1. Hash `signupSessionToken`.
2. Find invitation.
3. Validate:

   * invitation state = `initiated`
   * token not expired
   * invitation not revoked
   * invitation not completed
4. Validate password.
5. Ensure admin email does not already exist.
6. Atomically:

```
create admin
hash password
mark invitation completed
completed_at = now
invalidate signup session token
create admin session
```

### Idempotency

* Only **one request may complete the invitation**.
* Retries must not create duplicate admins.

---

# 4.3 Validation Rules

## Invitation Creation

* `email` required
* `firstName` required
* `lastName` required
* email format valid
* email not already used
* inviter authorization must pass

## Retrieve Endpoint

* token must exist
* invitation must be `pending`
* invitation not expired
* invitation not revoked

## Completion Endpoint

* signupSessionToken required
* password required
* passwordConfirmation required
* passwords must match
* invitation state must be `initiated`
* signup session not expired

---

# 4.4 Password Policy

Current minimum:

```
minimum length = 12 characters
passwordConfirmation must match
```

Password validation must be implemented through a **policy module** allowing future expansion such as:

* breached password checks
* password similarity checks
* password history
* entropy requirements

---

# 4.5 Business Logic Rules

1. Invitation creation restricted to a **hardcoded allowed email** for now.
2. Authorization logic must be isolated so it can be replaced with **role-based permissions later**.
3. Invitation expiration default:

```
72 hours
```

configured via environment variable.

4. Signup session expiration must also be configurable via environment variable.
5. Invite token is permanently consumed on first retrieval.
6. Revoked invitations must fail both endpoints.
7. Expired invitations must fail both endpoints.
8. Completion must re-check email uniqueness.
9. Admin creation and invitation completion must occur in **one atomic transaction**.
10. Session creation must reuse the **existing admin auth system**.
11. Invited user cannot modify:

```
email
firstName
lastName
```

---

# 4.6 Edge Cases

### Invalid Invite Token

Retrieval fails with no state changes.

### Expired Invite

Retrieval fails.

### Revoked Invitation

Both endpoints reject.

### Invite URL Opened Twice

First request succeeds.
Second request fails.

### Signup Session Expired

Completion fails.

### Invitation Already Completed

Retrieval fails.
Completion resolves safely.

### Email Already Used After Invite

Completion fails.

### Concurrent Completion

Only one request succeeds.

### Retrieval Retry

Retry after successful retrieval fails safely.

### Completion Retry

Must not create duplicate admin.

---

# 5. Infrastructure Considerations

Environment variables:

```
INVITATION_EXPIRATION_HOURS=72
SIGNUP_SESSION_EXPIRATION=...
```

Additional considerations:

* email sending uses existing infrastructure
* raw tokens appear only in emails and requests
* raw tokens must never be stored in DB
* DB migration required for invitation storage
* revocation requires admin UI access to invitations
* endpoints must follow existing project architecture standards

---

# 6. Observability

## Logging

Log:

* invitation creation
* invitation retrieval
* invitation completion
* invitation revocation

Never log:

```
tokens
passwords
password confirmations
```

Suggested log metadata:

```
invitation_id
invited_email
inviter_id
status_transition
failure_reason
request_id
```

## Metrics

Track:

* invitations created
* invitations opened
* invitations completed
* retrieval failures
* completion failures
* expired invitations
* revoked invitations

## Monitoring

Alert on:

* spikes in invalid token usage
* repeated completion failures

---

# 7. Security Considerations

1. Use cryptographically secure random tokens.
2. Store **only token hashes**.
3. Compare tokens using hash comparison.
4. Password hashing must use the existing project standard.
5. Race conditions must be prevented via **transactions or row locking**.
6. Hardcoded inviter authorization must be easily replaceable.
7. Expiration and revocation must be enforced server-side.
8. Session creation must use the **existing authentication flow**.
9. Password policy must remain **centrally extensible**.

---

# 8. Migration / Backward Compatibility

1. Introduce a new invitation persistence model.
2. Existing admin login must remain unchanged.
3. Existing error envelope conventions must be reused.
4. New error cases must follow the **same project exception pattern** used by:

```
invalid credentials
email already in use
```

5. Hardcoded inviter email check must be easily replaceable.
6. Future role support must be possible without changing the public API.

---

# 9. Open Questions

1. The default expiration duration for **signup-session tokens** should be defined if the project does not already have a convention.
2. Exact route naming and response envelope must follow the project's established API conventions.
