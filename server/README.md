<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).



## MING NOTE 

### 1 - DOCKER 

- Create `docker-compose.yaml`  

- `ls -la` -> List all Files and Folders

-  `docker compose up -d` -> Install and create Services - Container -> Postgres Services
- - `-d`: deamon/background mode (Chạy ngầm)

-  `docker compose down` -> Remove this Services (Down this service)

-  `docker compose up -d dev-database -d` -> Run only "dev-database" service

- `docker exec -it dev-database bash` -> To check DB, run bash 
- `whoami` : who am i -> name of user in DB
- `psql -U postgres -W mnestdb` : vào DB "mnestdb" to view 
- In this DB, run `\dt` -> List all tables
- In this space you can run SQL QUERY as you want.
- exit bash -> exit 

### 2 - Prisma 

- Step 1: Install Prisma: `yarn add -D prisma`

- Step 2: Init a prisma config file 

- `npx prisma init` 

Remember we had docker-compose.yaml file already

Or 

- npx prisma init --datasource-provider sqlite / mysql

- Step 3: Add data Model in Prisma Schema 

```
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```
- Step 4: Run a migration to create your database tables with Prisma Migrate

`npx prisma migrate dev`

OR   

`npx prisma migrate dev --name init` 

- Input the name of this action. 

- Customize CMD in package.json 

```
  "prisma:dev:deploy": "prisma migrate deploy",
  "db:dev:remove": "docker compose rm dev-database --stop --force --volumes",
  "db:dev:create": "docker compose up dev-database --detach",
  "db:dev:restart": "yarn db:dev:remove && yarn db:dev:create && yarn prisma:dev:deploy",
```

- Run `yarn db:dev:restart` -> System will migrate to beginning and DB 

--- 
 - Để làm việc với JWT thì cần: 

 `yarn add @nestjs/jwt passport-jwt`
 
  và 

 `yarn add @nestjs/passport passport` 

## NOTE 

- DTO - Data transform object
- If want to generate a file in NEST without spec. `nest g service --no-spec`

## NODEJS EXAMPLE: 
https://github.com/tkssharma/nestjs-advance-course 

STARTER: 
https://github.com/notiz-dev/nestjs-prisma-starter 

Real project
https://github.com/arielweinberger/nestjs-course-task-management
https://github.com/bashleigh/nestjs-blog 


hoc toi day: https://www.youtube.com/watch?v=ATTAVxKyc6M&t=2312s