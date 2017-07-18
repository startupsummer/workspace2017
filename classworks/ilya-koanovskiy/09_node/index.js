const http = require('http');
const fs = require('fs');
const logger = require('winston');
const formBody = require("body/form")

const port = 3000;
const username = "Ilya Kohanovskiy";

logger.configure({
    transports : [
        new (logger.transports.File)({ filename: 'logger.log' })
    ]
});



const getHandler = (req,res) => {   
    switch(req.url){

        case '/' :
            res.end('Hello Startup Summer');
            logger.info('Hello Startup Summer', {url : req.url});
            break;

        case '/info' :
            res.end(`Hello. My name is ${username} `);
            logger.info(`Hello. My name is ${username}`, {url : req.url});
            break;

        case '/index.html' :
            const filePath = './public/file.txt';
            logger.info(`file.txt`, {url : req.url});
            fs.readFile(filePath,(err,data) => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }) 
            break; 
            
        case "/data" :
            logger.info(`index.html`, {url : req.url});
            fs.readFile('./index.html',(err,data) => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data)   
            }) 
            break;

        case "/internet-file" :
            logger.info(`image file`, {url : req.url});
            http.get("http://politobzor.net/uploads/images/2017/372/org_jner529.jpg", (getResponse) => {
               getResponse.pipe(res);})           
        
    }       
}

const postHandler = (req,res) => {
    switch(req.url){
        case "/submit" :
            logger.info(`post req to form`, {url : req.url});
            const submit = (err, body) => res.end(`My name is ${body.fstName} ${body.sndName}`);
            formBody(req, {}, submit);
        }
    }

const requestHandler = (req,res) => {
    switch(req.method){
        case "GET" : 
            getHandler(req,res); 
            break;
        case "POST" : 
            postHandler(req,res); 
            break;
        }
} 

const server = http.createServer(requestHandler);

console.log(`Server is listend at port ${port}`)
server.listen(port);