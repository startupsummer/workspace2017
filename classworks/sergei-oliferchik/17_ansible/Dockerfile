FROM node

RUN mkdir -p /usr/src/app
COPY ./server /usr/src/app/
WORKDIR /usr/src/app
RUN npm i
EXPOSE 3000

CMD node /usr/src/app/app.js
