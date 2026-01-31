# apps/api — Claude guide

## Purpose

UI for @loop. Optimize for correctness + maintainability. Tests are the source of truth.

## Map

- Stack: TypeScript, Node >=20, NextJS, Schadcn
- Architecture: Feature-Driven Architecture
  - contexts: `./src/contexts` (Global contexts) and `./src/modules/**/contexts` (Local feature contexts)
  - components: `./src/modules/**/components` (UI components)
  - services: `./src/modules/**/services` (API connections)
  - hooks: `./src/modules/**/hooks` (helper hooks)
  - utils: `./src/modules/**/utils` (loose helper functions)
  - lib: `./src/modules/**/lib` (loose helper functions related to libraries)

## Rules (non-negotiable)

- Library implementations must never be used outside of lib. Exceptions are NextJs, ReactJs and any other broad library.
- React Component files must define the component's props as interfaces `ComponentNameProps`.
- React Components with display responsibility (JSX code) must have as little logic as possible.
- JSX code must have as little logic as possible in it.
