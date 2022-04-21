
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

let messages = [];

app.get("/messages",(req,res)=>{
    res.send(messages)
})

io.on("connection",()=>{console.log("a user connected")})

app.post("/messages",(req,res)=>{
    messages.push(req.body)
    io.emit("message",req.body)
    res.sendStatus(200)
})

let server = http.listen(3000,()=>{
    console.log(`listening on port ${ server.address().port}`)
})