# Youtube Video Sharing App

We are seeking a developer to build a web app for sharing YouTube videos.

- For Backend and FullStack applicants: using Ruby/Rails or a related Ruby framework. The application should include a real-time notification system to showcase your backend development skills.

- For Frontend applicants: Feel free to use any backend tech of your choice.

### Key Features

FE applicants should accomplish the first 3 features. While BE and Fullstack applicants must complete features 4.

1. User registration and login
2. Sharing YouTube videos
3. Viewing a list of shared videos (no need to display up/down votes)

### Technical Requirements

- Use Git with frequent commits
- If you’re applying for the FS/FE developer position, use React for frontend is a must.
- For FE applicants: must use Typescript/React and use responsive design for the frontend.
- Include unit tests
- Include unit tests (again)
- Include integration test

## Folder Stucture 

1. Frontend Side -> [Read this README](https://github.com/mingweb3/share_video/blob/master/clientside/README.md)
2. Backend Side -> [Read this README](https://github.com/mingweb3/share_video/blob/master/server/README.md)


-----------------------------------------------

### Deploy server

```bash
# Install Docker Service
$ sudo docker-compose up -d

# Setup Backend Side (NestJs + Prisma)
$ cp server/.env.example server/.env
$ sudo docker exec -it svideo-server yarn install
$ sudo docker exec -it svideo-server npx prisma migrate dev
$ sudo docker exec -it svideo-server pm2 start "yarn start:prod" --name server

# Setup Frontend Side (Next13)
$ cp clientside/.env.example clientside/.env
$ sudo docker exec -it svideo-client yarn install
$ sudo docker exec -it svideo-client yarn build
$ sudo docker exec -it svideo-client pm2 start "yarn start" --name client 
```

### IF Docker can't pull Node18.7.0

```bash
$ docker builder prune -a 

$ docker pull node:18.17.0
```

---

#### Contact me: mingweb3@gmail.com