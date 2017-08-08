FROM node
RUN mkdir -p /etc/simple-app
COPY . /etc/simple-app
WORKDIR /etc/simple-app
RUN npm install
EXPOSE 3000
CMD node /etc/simple-app/app.js
