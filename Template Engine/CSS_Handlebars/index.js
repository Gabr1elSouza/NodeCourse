const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const hbs= exphbs.create({
    partialDir:['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

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

app.get('/blog', (req,res)=>{
    const posts=[{
        title: "Aprenda Node.js",
        category: "JavaScript",
        body: "Este artigo vai te ajudar a aprender Node.js ...",
        comments: 4,
    },
    {
        title: "Aprenda PHP",
        category: "PHP",
        body: "TESTE",
        comments: 4,
    },
    {
        title: "Aprenda Phyton",
        category: "Phyton",
        body: "teste",
        comments: 4,
    }
]
    res.render('blog',{posts})
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