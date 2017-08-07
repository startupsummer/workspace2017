## Lecture task

The main objective of the task is to learn using of the Node.js.

Mandatory task:

1. Install Node.js 8.1.2 using nvm
2. Create simple http server
3. Add handlers for two different http GET requests (`/` and `/info`)
3.1. Implement `/` handler using Node.JS and return simple text `Hello Startup Summer` from it.
3.2. Implement `/info` and return `Hello. My name is ${username}` from it.
4. Create one more request `GET /index.html` and return local file form the directory `public` in the response
5. Search for npm module for logging and configure it to write logs to the file. Log requests from all endpoints using this logger.

Advanced:

6. Add to the page `index.html` simple form with two fields `firstName`, `lastName` and send data using standard method of submitting. This request should return text `My name is ${firstName} ${lastName}`.
7. Install some module to make requests and create new request `GET /internet-file` which will return some image from the internet

### Once finished..

1. Call a lecturer and show that http server work.
2. Show work of all http server
