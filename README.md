<div style="text-align: center;">
    <img src="public/assets/logo.png"
         alt="Logo"
         style="width: 50%; height: auto;" />
</div>

# Jolly Secrets Frontend

## About The App

[**Jolly Secrets**](https://jollysecrets.uxna.me) - a TypeScript application for secret gift exchange, written on [**Next JS**](https://nextjs.org). I used [**Zustand**](https://github.com/pmndrs/zustand) for state management, [**React Hook Form**](https://react-hook-form.com/) and [**i18n**](https://www.i18next.com/) for data validation and localisation. This app uses [**GraphQL**](https://graphql.org/) API to interact with [**Jolly Secrets Backend**](https://github.com/dariasmyr/secret-santa-backend)

### Stack

- [**Next JS**](https://nextjs.org)
- [**Zustand**](https://github.com/pmndrs/zustand)
- [**GraphQL**](https://graphql.org/)
- [**React Hook Form**](https://react-hook-form.com/)
- [**i18n**](https://www.i18next.com/)
- [**Docker**](https://www.docker.com/)

## Prerequisites
Before you begin, ensure you have the following installed on your machine:

`Node.js (version >= 14)`

`npm (usually comes with Node.js installation)`

## Getting Started

Clone the repository:

```bash
npx degit dariasmyr/secret-santa-frontend my-frontend-app
```

Install Dependencies:

```bash
npm install
```

### Development Mode:

To run the project in development mode with automatic restarts (using Nodemon), use:

```bash
npm run start:dev
```

### Production Mode:

To run the project in production mode, use:

```bash
npm run start:prod
```

This command will build the project using the TypeScript compiler and then start the application.

## Docker-compose
```shell
# Launch
$ docker-compose up -d

# Rebuild and launch
$ docker-compose up -d --build
```

### Linting:

The project has ESLint configured, which checks the code for errors and warnings, and See also tsconfig.json for proper assembly and compilation of types. To check the code for errors and warnings - run the command npm run check. Prettier is also configured to format the code, run npm run format to format the code (but ESLint will still check it).

To check your code for linting errors:

```bash
npm run lint
```

To automatically fix linting errors:

```bash
npm run lint:fix
```

Additional Scripts

`npm run ts:check`: Run TypeScript type checking without emitting files.
`npm run check`: Run TypeScript type checking and linting.
`npm run test:e2e`: Run end-to-end tests using Jest with a custom configuration.
`npm run test:debug`: Run tests in debug mode.

### Updating Dependencies
To update project dependencies, you can use the following command to check for updates and update your package.json:

```bash
npm run update
```

In addition, the project has a pre-commit hook configured to check the code for errors and warnings before each commit.

## Types generation
Run `npm run gen` after every GraphQL API Schema changed or after `./graphql/*.graphql` files are modified

