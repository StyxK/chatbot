const config =  require('dotenv').config()
const {Wit,log ,interactive} =  require('node-wit')
module.exports = (message) =>{
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
    interactive(client)
    
    return client.message(message)
}
