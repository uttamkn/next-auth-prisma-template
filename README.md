# Next.js Template with NextAuth.js, Prisma, and shadcn

This repository serves as a starter template for building Next.js applications with **NextAuth.js** for authentication, **Prisma** as the ORM, and **shadcn** for a stylish, accessible component library.

## Getting Started

### 1. Create a Repository from This Template

To get started, create your own repository using this template:

1. Click the **"Use this template"** button at the top of this repository ([next-auth-prisma-template](https://github.com/uttamkn/next-auth-prisma-template)).
2. Select **"Create a new repository"**.
3. Name your repository and click **"Create repository from template"**.

Once the repository is created, clone it to your local machine:

### 2. Install Dependencies

Make sure you have **Node.js** and **npm** or **yarn** installed, then run:

```bash
bun install
# or
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create two environment variable files: `.env.local` and `.env`. Use the following format:

#### `.env.local`

```env
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
NEXTAUTH_URL=http://localhost:3000 (uri)
NEXTAUTH_SECRET=openssl rand -base64 32
```

- Replace `your_github_client_id` and `your_github_client_secret` with the credentials from your [GitHub OAuth App](https://github.com/settings/developers).
- Generate a random secret for `NEXTAUTH_SECRET` using `openssl rand -base64 32`.

#### `.env`

```env
DATABASE_URL=your_database_url
```

- Replace `your_database_url` with your database connection string (e.g., PostgreSQL, MySQL, or SQLite).

### 4. Set Up the Database

Run the Prisma migrations to initialize your database:

```bash
npx prisma migrate dev --name init
```

### 5. Start the Development Server

Start the Next.js development server:

```bash
bun dev
# or
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view your application.
