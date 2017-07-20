let http = require("http");
let fs = require("fs");
let formBody = require('body/form');
let req = require('request');
let download = require('image-downloader')
let log4js = require('log4js');
let base64 = require('base64-stream');

log4js.configure({
  appenders: {
    out: { type: 'stdout', },
    app: { type: 'file', filename: 'application.log', },
  },
  categories: {
    default: { appenders: [ 'out', 'app', ], level: 'debug', },
    error: { appenders: [ 'out', 'app', ], level: 'error', },
  },
},);

let logger = log4js.getLogger();
 
let port = 3000;

http.createServer(function(request, response){
         
  logger.debug(`${request.method} "${request.url}"`);
       
 if(request.method == 'GET'){        
    switch(request.url){
      case '/':
        response.end('Hello Startup Summer');
        break;

      case '/info': 
        response.end('Hello. My name is Artem'); 
        break;

      case '/index.html':
         fs.readFile(`./public/index.html`, function(error, data){         
            if(error){
              logger.error('error from GET "/index.html" ');        
            }   
            else{
                response.end(data);
            } 
        })
        break;
        case '/img': {            
          var img = 'http://minionomaniya.ru/wp-content/uploads/2016/01/%D0%BC%D0%B8%D0%BD%D1%8C%D0%BE%D0%BD%D1%8B-%D0%BF%D1%80%D0%B8%D0%BA%D0%BE%D0%BB%D1%8B-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8.jpg';
          http.get(img, function(res) {
              if (res.statusCode === 200){
                  res.pipe(response);
              }    
          });
        } 
    }
}
  if(request.method == 'POST'){
    switch(request.url){
      case '/info': 
        const send = (err, body) => response.end(`My name is ${body.firstName} ${body.lastName}`);
        formBody(request, {}, send);
        break;
        default:
        break;  
    }

  }
    
}).listen(port);