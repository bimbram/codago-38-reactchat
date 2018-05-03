const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
// const cors = require('cors')
const DATA_PATH = path.join(__dirname, "data.json");
// const server = require('http').Server(app);
// const io = require('socket.io')(server);
// io.set('origins', 'http://localhost:3000');

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


// app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors())

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

app.get('/', function(req, res) {
  fs.readFile(DATA_PATH, function(err, chatData) {
    if (err) {
      console.error(err);
    }

    res.send(JSON.parse(chatData))
  })
})

app.post("/chatdata", function(req, res) {
  fs.readFile(DATA_PATH, function(err, chatData) {
    if (err) {
      console.error(err);
    }
    let chatDataArray = JSON.parse(chatData);
    chatDataArray.push(
      {id: req.body.id,
        chatEntry: req.body.chatEntry,
        chatMessage: req.body.chatMessage}
      )
      fs.writeFile(DATA_PATH, JSON.stringify(chatDataArray, null, 3), function(err) {
        if(err){
          console.error(err);
        }

        res.json({})
      })
    });
  });


  app.listen(3000, function() {
    console.log("server is online");
  });
