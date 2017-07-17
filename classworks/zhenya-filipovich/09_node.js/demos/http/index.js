const http = require('http')  
const port = 3000

const postHandler = (request, response) => {
  let body = ''
  
  request.on('data', data => {
    body += data
  })

  request.on('end', () => {
    console.log(body)
  })
}

const getHandler = (require, response) => {
  response.end('Hello Node.js Server!')
}

const requestHandler = (request, response) => {  
  console.log(request.url)

  switch (request.method) {
    case 'GET':
      getHandler(request, response)
      break

    case 'POST':
      postHandler(request, response)
      break
  }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})