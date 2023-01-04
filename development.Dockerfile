FROM node:18.12.1

COPY ["package.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

COPY [".", "/usr/src/"]

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
