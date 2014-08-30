var dns = require('native-dns');

var server = dns.createServer();

server.on('request', function (request, response) {
  console.log('request',request)
  response.answer.push(dns.A({
    name: request.question[0].name,
    address: '127.0.0.1',
    ttl: 600,
  }));
  response.send();
});

server.on('error', function (err, buff, req, res) {
  console.log('error',err.stack);
});

server.serve(15353, function(err){
  if(err) return console.log('server failed',err);
  console.log('server running');
});