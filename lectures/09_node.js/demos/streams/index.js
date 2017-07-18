const fs = require('fs')
const server = require('http').createServer();

server.on('request', (req, res) => {
  fs.readFile('./big.file', (err, data) => {
    if (err) throw err;
  
    data.pipe((d) => {
      console.log(d)
    })

    res.end(data);
  });
});

server.listen(8000);
