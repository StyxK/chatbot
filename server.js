const express = require('express')
const app = express()
const config =  require('dotenv').config()
const {Wit,log} =  require('node-wit')

const client = new Wit({
    accessToken : process.env.TOKEN,
    actions : {
        send(req,res){
            return new Promise((resolve,reject)=>{
                console.log(JSON.stringify(res))
                return resolve
            })
        },
        myAction({sessionId,context,text,entities}){
            console.log(`Session ${sessionId} recieved ${text}`)
            console.log(`The current context is ${JSON.stringify(context)}`)
            console.log(`Wit extracted ${JSON.stringify(entities)}`)
            return Promise.resolve(context)
        }
    },
    logger : new log.Logger(log.DEBUG)
})

console.log(client.message('I need a sausage pizza'))

const sessionId = 'my-user-session-42'
const context0 = {}

app.listen(process.env.PORT,()=>{
    console.log(`hello chatbot on port ${process.env.PORT}`)
})