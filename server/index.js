const keys = require('./keys')


//express 
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())


//postgres db setup 
const {Pool} = require('pg')
const pgClient = new Pool({
    user:keys.pgUser,
    host:keys.pgHost,
    database:keys.pgDatabase,
    password:keys.pgPassword,
    port:keys.pgPort
})


pgClient.on("connect", (client) => {
    client
      .query("CREATE TABLE IF NOT EXISTS values (number INT)")
      .catch((err) => console.error(err));
  });



//redis client setup
const redis = require('redis')

const redisClient = redis.createClient({
    host:keys.redisHost,
    port:keys.redisPort,
    retry_strategy:()=>1000
})

const redisPublisher = redisClient.duplicate()


//express route handler

app.get('/',(req,res)=>{
    res.send('Hi ur connected')
})

app.get('/api/values/all',async(req,res)=>{
    const values = await pgClient.query('SELECT * from values')
    res.send(values.rows)
})


app.get('/api/values/current',async(req,res)=>{
    redisClient.hgetall('values',(err,values)=>{
        res.send(values)
    })
})

app.post('/api/values',async(req,res)=>{
    const index = req.body.index

    if(parseInt(index)>40){
     return res.status(422).send("Index too high")
    }


    redisClient.hset('values',index,'Nothing yet!')
    redisPublisher.publish('insert',index)
    pgClient.query('INSERT INTO values(number) VALUES($1)',[index])

    res.send({working:true})

})



//listening to port

app.listen(5000,()=>{
    console.log('listening on port 5000')
})