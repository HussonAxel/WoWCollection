# WoWCollection

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines React, React Router, Hono, tRPC, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Hono** - Lightweight, performant server framework
- **tRPC** - End-to-end type-safe APIs
- **Bun** - Runtime environment
- **Drizzle** - TypeScript-first ORM
- **PostgreSQL** - Database engine
- **Authentication** - Email & password authentication with Better Auth

## Getting Started

First, install the dependencies:

```bash
bun install
```

## Database Setup

This project uses PostgreSQL with Drizzle ORM.

1. Make sure you have a PostgreSQL database set up.
2. Update your `apps/server/.env` file with your PostgreSQL connection details.

4. Apply the schema to your database:
```bash
bun db:push
```


Then, run the development server:

```bash
bun dev
```



The API is running at [http://localhost:3000](http://localhost:3000).



## Project Structure

```
WoWCollection/
├── apps/
│   └── server/      # Backend API (Hono, tRPC)
```

## Available Scripts

- `bun dev`: Start both web and server in development mode
- `bun build`: Build both web and server
- `bun dev:web`: Start only the web application
- `bun dev:server`: Start only the server
- `bun check-types`: Check TypeScript types across all apps
- `bun db:push`: Push schema changes to database
- `bun db:studio`: Open database studio UI
