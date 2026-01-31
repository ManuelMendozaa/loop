# apps/api — Claude guide

## Purpose

API for @loop. Optimize for correctness + maintainability. Tests are the source of truth.

## Map

- Stack: TypeScript, Node >=20, Fastify
- Architecture: DDD modules + Hexagonal
  - domain: `./src/modules/**/domain` (pure logic, no IO/framework)
  - application: `./src/modules/**/application` (use-cases)
    - ports/driven: `.../application/ports/driven`
    - ports/driving: `.../application/ports/driving`
  - infrastructure: `./src/**/infrastructure` (DB/JWT/external/web)
    - http: `./src/modules/**/infrastructure/http` (routes/controllers + DTO/mappers)
- Tests: `./src/test` mirrors `./src/modules` (unit/integration/e2e)

## Rules (non-negotiable)

- domain/application MUST NOT import infrastructure.
- Controllers/routes: map + validate + call use-cases. No business rules.
- Use-cases depend on ports; adapters implement ports.
- Don’t leak domain entities as HTTP DTOs, controllers must map headers/body/params to ports.

## TDD

- Change behavior ⇒ add/adjust tests first, then code until green.
- Mock at boundaries (ports), not inside domain.
- During planning: list key edge-cases and cover the important ones with tests.

## Security + errors

- Validate inputs at the edge; never trust client-provided auth/roles.
- No secrets/PII in logs or error responses.
- Prefer typed domain/application errors over generic throws.
- Diagnose failures before patching; no “fix by guess”.

## Envs

- Env: `./.env` (and any `.env.*`). Never commit secrets.
