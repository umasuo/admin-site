var path = require('path')
var express = require('express')
var compression = require('compression')
var app = express()

app.use(compression())
app.use(express.static('./'))

app.use('/', function ( req, res, next ) {
  res.sendfile(__dirname + '/index.html');
});

app.listen(3000, function () {
  console.log('web server started!')
})
