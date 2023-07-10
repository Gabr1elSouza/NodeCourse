const express = require('express')
const app = express()
const port = 3000 //variavél ambiente

app.get('/', (req,res)=>{
    res.send("Olá mundo")
})

app.listen(port, ()=>{
    console.log(`Serve working in port ${port}`)
})