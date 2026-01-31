# apps/api — Claude guide

## Purpose

UI for @loop. Optimize for correctness + maintainability. Tests are the source of truth.

## Map

- Stack: TypeScript, Node >=20, NextJS, Shadcn
- Architecture: Feature-Driven Architecture
  - contexts: `./src/contexts` (global contexts) and `./src/modules/**/contexts` (local feature contexts)
  - components: `./src/modules/**/components` (UI components)
  - services: `./src/modules/**/services` (API connections)
  - hooks: `./src/modules/**/hooks` (helper hooks)
  - utils: `./src/utils` (global utils) and `./src/modules/**/utils` (local utils)
  - libs: `./src/libs` (global libs) and `./src/modules/**/libs` (local libs)
  - commons: `./src/common` (buttons, inputs, and shared UI components)

## Rules (non-negotiable)

- Library implementations must never be used outside of libs folders. Exceptions are NextJs, ReactJs and any other too broad library
- React Component files must define the component's props as interfaces `ComponentNameProps`
- React Components with display responsibility (JSX code) must have as little logic as possible
- JSX code must have as little logic as possible in it
- Contexts, utils and libs must exists in their specific module folders unless they are broadly used
- HTTP calls must be made with the ./src/libs/api implementation
- Shadcn provides the UI building blocks, components are in ./src/common

## User Experience

- Buttons activating async actions must disable and show the `Spinner` in them
- Views requiring loading must implement `Skeleton`
