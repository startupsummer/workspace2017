const http = require('http');
const fs = require('fs');
const winston = require('winston');
const bodyForm = require('body/form');
const port = 3001;

winston.configure({
  transports: [
    new (winston.transports.File)({ filename: 'somefile.log' })
  ]
});

const getImageHandler = (request, response) => {
  http.get("http://fototips.ru/wp-content/uploads/2011/12/landscape_02.jpg", (getRes) => { getRes.pipe(response) })
}

const postHandler = (request, response) => {
  if (request.url === "/data") {
    postHTMLHandler(request,response)
  }
}

const postHTMLHandler = (request, response) => {   
  bodyForm(request, response, (error, body) => {     
    winston.log('info', 'postHandler')     
    response.end(`My name is ${body.firstName} ${body.lastName}`)   
  }) 
}

const getHandler = (request, response) => {
  if (request.url === "/info"){ 
    winston.log('info', 'Hello. My name is Mark Chepicov');
    response.end('Hello. My name is Mark Chepicov');
  } else if (request.url === "/index.html"){ 
    winston.log('info', 'index.html');
    const file = fs.createReadStream('./public/index.html')
    file.pipe(response);
  } else if (request.url === "/main.css"){ 
    winston.log('info', 'main.css');
    const file = fs.createReadStream('./public/main.css');
    file.pipe(response);
  } else if (request.url === "/"){ 
    winston.log('info', 'Hello Startup Summer');
    response.end('Hello Startup Summer');
  } else if (request.url === "/internet-file"){
    getImageHandler(request, response);
  }
}

const requestHandler = (request, response) => {  
  console.log(request.url);

  switch (request.method) {
    case 'GET':
      getHandler(request, response);
      break;

    case 'POST':
      postHandler(request, response);
      break;
  }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
})
