FROM node:12.8

RUN mkdir -p /app/src
WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000
CMD ["node", "/app/src/index.js"]