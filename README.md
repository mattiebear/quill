# Hexx - Quill Rendering Engine

Quill is the rendering engine for the Hexx virtual tabletop.
It is a single page application built with React and a
bespoke wrapper of Pixi.js.

## Requirements

- [NodeJS](https://nodejs.org/en) - v20+
- [PNPM](https://pnpm.io/) - v8+

## Installation

```shell
git clone git@github.com:built-on-a-space-station/quill.git

cd quill

pnpm install
```

## Setup

### Environment Variables

The client provides an `.env.development` file with default variables
that can be used for developing locally. If you need to make adjustments,
create an `.env.development.local` file and add the overrides needed
for your current setup.

### Authentication

Quill uses Clerk.com to handle authentication. A development environment
has already been created. Public auth keys are found in the `.env.*` files.

## Run Quill

```shell
pnpm dev
```

Run Quill in development mode. The app can then be found at http://localhost:5173
(by default). You will need to create a development user through the UI
using the sign up form or connecting to a Gmail account.

Development mode provides HMR out of the box and will update in the
browser as code is updated.

## Testing

```shell
pnpm test
```

Runs the test suite using [vitest](https://vitest.dev/). Tests should be
placed in a `__tests__` directory within the directory being tested.
Additionally, tests should be named `XXX.test.ts` to allow for easier
search and filtering.
