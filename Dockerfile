FROM node:18.17.0

WORKDIR /app

RUN apt update -y
RUN npm install pm2 -g

CMD tail -f
