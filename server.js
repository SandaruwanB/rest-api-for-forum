const express = require("express");
const cors = require('cors');
const http = require('http');
const dotenv = require('dotenv');
const app = express();
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

dotenv.config({path : './config.env'});

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({limit : '10mb'}));
app.use('/', require('./routes/routes'));

/*io.on('connection', (socket)=>{
    console.log("user connected");
})*/

server.listen(port, ()=>{
    console.log("App started on http://localhost:" + port);
});