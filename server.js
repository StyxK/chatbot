const express = require('express')
const config =  require('dotenv').config()
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const client = require('./wit.ai')
const bodyParser = require('body-parser')

app.use(bodyParser.json());
bodyParser.urlencoded({extended:true})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

io.on('connection',(socket)=>{
    socket.emit('message',{hello : 'hello'})
    socket.on('event',async (data)=>{
        const message = await client(data)
        await console.log("BOT ====> "+message._text)
        const entities = await JSON.stringify(message.entities)
        await console.log("BOT intent ====>"+entities )
        await socket.emit('message',{hello : entities})
    })
})


server.listen(process.env.PORT,()=>{
    console.log(`hello chatbot on port ${process.env.PORT}`)
})