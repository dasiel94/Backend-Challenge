<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Atom Challenge Backend

Backend API for a Task List application using NestJS and Firebase Firestore.

## Features
- User registration and lookup by email
- Task CRUD (create, read, update, delete)
- Tasks are user-specific and ordered by creation date
- Ready for deployment on Cloud Functions
- **Interactive API documentation with Swagger (OpenAPI)**

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Add your Firebase service account key:**
   - Place your `firebase-service-account.json` in the project root.
3. **Run the server locally:**
   ```bash
   npm run start
   ```
4. **Test endpoints:**
   - Use Postman, Insomnia, or similar tools to interact with the API.
   - Or use the Swagger UI at [http://localhost:3000/api](http://localhost:3000/api)

---

## API Documentation (Swagger)

Once the server is running, access the interactive API docs at:

```
http://localhost:3000/api
```

You can explore all endpoints, see request/response schemas, and test the API directly from your browser.

---

## API Endpoints

### Users

#### Create User
- **POST** `/users`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "name": "User Name"
  }
  ```
- **Response:**
  ```json
  {
    "email": "user@example.com",
    "name": "User Name"
  }
  ```

#### Get User by Email
- **GET** `/users/:email`
- **Response:**
  ```json
  {
    "email": "user@example.com",
    "name": "User Name",
    "createdAt": "2024-06-07T12:34:56.789Z"
  }
  ```

---

### Tasks

#### Get All Tasks for a User
- **GET** `/tasks?userEmail=USER_EMAIL`
- **Response:**
  ```json
  [
    {
      "id": "taskId1",
      "taskId": "taskId1",
      "title": "Task Title",
      "description": "Task description",
      "userEmail": "user@example.com",
      "completed": false,
      "createdAt": "2024-06-07T12:34:56.789Z"
    },
    ...
  ]
  ```

#### Create Task
- **POST** `/tasks`
- **Body:**
  ```json
  {
    "title": "Task Title",
    "description": "Task description",
    "userEmail": "user@example.com"
  }
  ```
- **Response:**
  ```json
  {
    "id": "taskId1",
    "taskId": "taskId1",
    "title": "Task Title",
    "description": "Task description",
    "userEmail": "user@example.com",
    "completed": false,
    "createdAt": "2024-06-07T12:34:56.789Z"
  }
  ```

#### Update Task
- **PUT** `/tasks/:id`
- **Body:** (any of the following fields)
  ```json
  {
    "title": "New Title",
    "description": "New description",
    "completed": true
  }
  ```
- **Response:**
  ```json
  {
    "id": "taskId1",
    "title": "New Title",
    "description": "New description",
    "userEmail": "user@example.com",
    "completed": true,
    "createdAt": "2024-06-07T12:34:56.789Z"
  }
  ```

#### Delete Task
- **DELETE** `/tasks/:id`
- **Response:**
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

---

## Data Structure

### User
- `email` (string, unique)
- `name` (string)
- `createdAt` (timestamp)

### Task
- `id` (string, auto-generated)
- `taskId` (string, auto-generated, always present)
- `title` (string)
- `description` (string, optional)
- `userEmail` (string, user email)
- `completed` (boolean)
- `createdAt` (timestamp)

---

## Linting & Formatting
- Run ESLint:
  ```bash
  npm run lint
  ```
- Run Prettier:
  ```bash
  npm run format
  ```

---

## Deployment

### Render (Recommended)

This project is configured for deployment on Render. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

Quick setup:
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Use the following settings:
   - **Build Command**: `npm ci && npm run build`
   - **Start Command**: `npm run start:prod`
4. Configure environment variables (see `env.example`)
5. Deploy!

### Other Platforms

- **Firebase Cloud Functions**: Ready for deployment on Firebase Cloud Functions.
- **Heroku**: Use the `Procfile` provided
- **Vercel**: Configure as a Node.js application
- **Railway**: Use the `render.yaml` configuration

### Environment Variables

Copy `env.example` to `.env` and configure:
- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port
- `JWT_SECRET`: Secret key for JWT tokens
- `FIREBASE_PROJECT_ID`: Your Firebase project ID
- `FIREBASE_PRIVATE_KEY`: Firebase private key
- `FIREBASE_CLIENT_EMAIL`: Firebase client email
- `CORS_ORIGIN`: Frontend URL for CORS (ej: `https://lovely-sprite-4c8d0c.netlify.app`)

---

## Autor

- Developed By Dasiel Pedrero
