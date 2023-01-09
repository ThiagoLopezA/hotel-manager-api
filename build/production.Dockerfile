FROM node:18.12.1 as builder

RUN npm i -g @nestjs/cli

COPY ["package.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm install --omit=dev

COPY [".", "/usr/src/"]

RUN npm run build

RUN npm install --dev

RUN npm run test


# Productive image
FROM node:18.12.1

RUN npm i -g @nestjs/cli

COPY ["package.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm install --omit=dev

COPY --from=builder ["/usr/src/dist/", "/usr/src/"]

EXPOSE 4000

CMD ["node", "main.js"]