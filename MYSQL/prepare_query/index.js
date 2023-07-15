const express = require('express')
const exphbs = require('express-handlebars')
const conn = require("./db/conn")

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

app.get('/books', (req,res)=>{
    const sql = "SELECT * FROM books"

    pool.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
        const books = data
        console.log(books)
        res.render('books',{books})
    })
})

app.get("/", (req,res)=>{
    res.render('home')
})

app.listen(3000,function(err){
    if(err){
        console.log(err)
    }
    console.log("Server Working!")
})