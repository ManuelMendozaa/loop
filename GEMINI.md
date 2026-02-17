# Project: Loop

## Project Overview

"Loop" is a monorepo project designed to manage various applications and shared packages using `turborepo`. It comprises a backend API, a frontend client, and shared utility/model packages, all built with TypeScript.

### Key Components:

*   **`apps/api`**: A robust backend API built with **Fastify** and **TypeScript**. It interacts with a **MongoDB** database via **Mongoose**. The API follows a clean architecture pattern, organizing features into modules (e.g., `auth`, `users`, `processes`) with distinct application, domain, and infrastructure layers. It includes centralized error handling, rate limiting, CORS, and Helmet middlewares.
*   **`apps/client`**: A modern frontend application developed with **Next.js** (React), **TypeScript**, and styled using **Tailwind CSS**. It leverages `@tanstack/react-query` for efficient data fetching and state management, and `radix-ui` for accessible UI components. It features a modular structure for features like authentication, user management, and process handling.
*   **`packages/models`**: A shared TypeScript package that defines data models using `zod` for validation. These models are consumed by both the API and the client, ensuring data consistency across the stack.
*   **`packages/utils`**: A shared TypeScript package containing common utility functions, also utilizing `zod` for data-related utilities.

### Technologies Used:

*   **Monorepo Management**: Turborepo
*   **Backend**: Fastify, TypeScript, Mongoose, Zod, Dotenv
*   **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Radix UI, @tanstack/react-query, Zod, Lucide React
*   **Build Tools**: tsup (for packages), Next.js build system
*   **Testing**: Jest (for API)
*   **Linting**: ESLint
*   **Formatting**: Prettier

## Building and Running

### Install Dependencies

To install all project dependencies, navigate to the root directory and run:

```bash
npm install
# or pnpm install
# or yarn install
```

*(Note: The project's root `package.json` specifies `packageManager: "npm@10.9.0"`)*

### Common Commands

All commands below can be run from the root directory and will be executed by Turborepo across the relevant workspaces.

*   **Build all projects**:
    ```bash
    npm run build
    # or turbo run build
    ```
*   **Start development servers**:
    ```bash
    npm run dev
    # or turbo run dev
    ```
    *   The API will typically run on `http://localhost:3000` (configurable via `.env` in `apps/api`).
    *   The Client (Next.js) will typically run on `http://localhost:3001`.
*   **Lint all projects**:
    ```bash
    npm run lint
    # or turbo run lint
    ```
*   **Format code**:
    ```bash
    npm run format
    ```
*   **Check types across all projects**:
    ```bash
    npm run check-types
    ```
*   **Run API tests**:
    ```bash
    npm test --workspace=api
    # or navigate to apps/api and run `npm test`
    ```

## Development Conventions

*   **Monorepo Structure**: The project strictly adheres to a `turborepo` monorepo setup, separating applications (`apps/*`) from shared code (`packages/*`).
*   **TypeScript First**: All codebases within the monorepo are developed using TypeScript for strong typing and improved maintainability.
*   **API Architecture**: The `apps/api` project implements a clean architecture, dividing concerns into Application, Domain, and Infrastructure layers within each module.
*   **Data Validation**: `zod` schemas are extensively used across both the frontend and backend for robust data validation and type inference.
*   **Frontend Styling**: Tailwind CSS is the primary styling framework, complemented by `radix-ui` for unstyled, accessible UI primitives.
*   **API Client**: The frontend (`apps/client`) includes a custom API client (`src/libs/api`) that wraps `fetch` and integrates with `@tanstack/react-query` for streamlined data interaction.
*   **Error Handling (API)**: The API features a centralized error handling mechanism via Fastify plugins, utilizing custom `InternalException` types for structured error responses.
*   **Environment Variables**: Configuration is managed through environment variables (`.env` files), which are validated using `zod` schemas at application startup (`apps/api/src/config.ts`).
