const express = require('express')
const exphbs = require('express-handlebars')
const conn = require("./db/conn")

const User = require('./models/user')

const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.post('/users/create', async(req,res)=>{
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }
    console.log(req.body)
    await User.create({name, occupation, newsletter})
    res.redirect('/')
})

app.get('/users/create', (req,res)=>{
    res.render('adduser')
})

app.get("/", async(req,res)=>{
    const Users= await User.findAll({raw:true})
    console.log(Users)
    res.render('home', {Users:Users})
})

conn.sync().then(()=>{
    app.listen(3000)
}).catch((err)=>{
    console.log(err)
})