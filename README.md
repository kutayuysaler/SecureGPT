# Secure-GPT

This repository contains the Secure-GPT project of the Hephaestus association.

## Information for the developers

- The OpenAI key is in the [`.env`](./.env) file (which is here for simplicity but it should not be stored in Github)
- Most of the the project lives in [`+page.svelte`](./src/routes/+page.svelte)
  - You can consider it some kind of "special" HTML file
  - Styles can be defined either in [`+page.svelte`](./src/routes/+page.svelte) or in in [`styles.css`](./src/routes/styles.css)
- If you use VSCode the following extensions are recommended
  - Svelte
  - ESLint
  - Prettier

## Running the project

Prerequisites:

- [NodeJS](https://nodejs.org)
- [pnpm](https://pnpm.io/installation)
- Install the project's dependencies with the command `pnpm install`

Once you have installed the prerequisites you can run the project with `pnpm run dev` or build it for production with `pnpm run build`.
