let http = require("http");
let fs = require("fs");
let formBody = require('body/form');
let req = require('request');
let download = require('image-downloader')
let log4js = require('log4js');

log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    app: { type: 'file', filename: 'application.log' }
  },
  categories: {
    default: { appenders: [ 'out', 'app' ], level: 'debug' },
    error: { appenders: [ 'out', 'app' ], level: 'error' }
  }
});;;

let logger = log4js.getLogger();
 
let port = 3000;

http.createServer(function(request, response){
         
 if(request.method == 'GET'){        
    switch(request.url){
      case '/': 
        logger.debug('GET "/" ');
        response.end('Hello Startup Summer')
        break;

      case '/info': 
        logger.debug('GET "/info" ');
        response.end('Hello. My name is Artem'); 
        break;

      case '/index.html':
         logger.debug(' GET "/index.html" '); 
         fs.readFile(`./public/index.html`, function(error, data){
                 
            if(error){
              logger.error('error from GET "/index.html" ');        
            }   
            else{
                response.end(data);
            } 
        })
        break;
        case '/img':{

          logger.debug(' GET "/img" '); 

          const options = {
          url: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg',
          dest: 'img.jpg'
          }
          
          download.image(options)
            .then(({ filename, image }) => {
              console.log('File saved to', filename);
            }).then( () => {
              fs.createReadStream('img.jpg').pipe(response);
            }).catch((err) => {
              
              logger.error('error (download image) from GET "/img" ')

              throw err
            })
        } 
    }
}
  if(request.method == 'POST'){
     const send = (err, body) => response.end(`My name is ${body.firstName} ${body.lastName}`);
     formBody(request, {}, send);
  }
    
}).listen(port);