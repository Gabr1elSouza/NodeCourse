const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req,res)=>{
    const items =['item a','item b', 'item c']
    res.render('dashboard',{items})
})

app.get('/post', (req,res)=>{
    const post={
        title: "Aprenda Node.js",
        category: "JavaScript",
        body: "Este artigo vai te ajudar a aprender Node.js ...",
        comments: 4,
    }
    res.render("blogpost", {post})
})

app.get('/', (req,res)=>{
    const user = {
        name: 'Gabriel',
        surname: 'Souza',
        age: '22'
    }

    const palavra= "teste"

    const auth = true

    const approved = true

    res.render('home',{user:user, palavra, auth, approved})
})

app.listen(3000, ()=>{
    console.log('app rolando')
})