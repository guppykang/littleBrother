
//read the config.yaml
const fs = require('fs');
const yaml = require('js-yaml');

let data = null;

try {
  let fileContents = fs.readFileSync('./../config.yaml', 'utf8');
  data = yaml.safeLoad(fileContents);
} catch (e) {
  console.log(e);
}

//set up mongodb
const mongoose = require('mongoose')
mongoose.connect(data.mongodbUri, { useNewUrlParser: true })

//just routing and express stuff
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");
const port = process.env.PORT || 5000;
const helmet = require("helmet");
const logger = require("morgan");


//cors bs
var cors = require('cors')
app.use(cors()) // Use this after the variable declaration
// if (!process.env.NODE_ENV) {
//   app.use(logger("dev"));
// }

app.use(helmet());
app.use(bodyParser.json());

//for routes
app.use("/", routes);

app.use((req, res, next) => {
  let err = new Error("File Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({ error: err.message, status: err.status });
});

const server = app.listen(port, () => {
  console.log(`Worker ${process.pid} listening at port: ${port}`);
});

//for socket i/o stuff
const io = require("socket.io")(server);

io.on('connection', (socket) => {
  socket.on('SEND_MESSAGE', (data) => {
    io.emit('MESSAGE', data)
  });
  socket.on('PLAYER_ADDED', (data) => {
    io.emit('RECEIVE_NEW_PLAYERS', data);
  });
  socket.on('END_GAME', (data) => {
    io.emit("END_GAME", data);
  });
  socket.on('START_GAME', (data) => {
    io.emit("START_GAME", data);
  });
  socket.on('TEAM_ADDED', (data) => {
    io.emit("TEAM_ADDED", data);
  });
  socket.on('SUBMITTED', (data) => {
    io.emit("SUBMITTED", data);
  });
  socket.on('NEXT_TURN', (data) => {
    io.emit("NEXT_TURN", data);
  });
  socket.on('END_GAME', (data) => {
    io.emit("END_GAME", data);
  });
  socket.on('HINTS', (data) => {
    io.emit("HINTS", data);
  });
  socket.on('GUESS_SUBMITTED', (data) => {
    io.emit("GUESS_SUBMITTED", data);
  });


});
module.exports = app;
