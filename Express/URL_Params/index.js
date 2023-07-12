const express = require('express')
const app = express()
const port = 3000 //variavél ambiente
const path = require('path')

const basePath = path.join(__dirname, 'templates')

/*const checkAuth = function(req,res,next){
    req.authStatus = true
    if(req.authStatus){
        console.log('está logado, pode continuar')
        next()
    }else{
        console.log('Não está logado, faça o login para continuar')
        next()
    }
}

app.use(checkAuth)
*/

app.get('/users/:id', (req,res)=>{
    const id = req.params.id

    console.log(`Estamos buscando pelo usuário: ${id}`)
    
    res.sendFile(`${basePath}/users.html`)
})

app.get('/', (req,res)=>{
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, ()=>{
    console.log(`Serve working in port ${port}`)
})