FROM node

RUN mkdir -p /usr/src/hellonworld
COPY . /usr/src/hellonworld

WORKDIR /usr/src/hellonworld

RUN npm install

CMD node /usr/src/hellonworld/src/index.js
