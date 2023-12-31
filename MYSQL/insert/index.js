const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

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

app.get("/", (req,res)=>{
    res.render('home')
})

app.post('/books/insertbook', (req,res)=>{
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sqli = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`

     conn.query(sqli, function(err){
         if(err){
             console.log(err)
         }
         res.redirect('/')
     })
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'Savitar18',
    database: 'nodemysql'
})

conn.connect(function(err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('conectado ao MYSQL!')

    app.listen(3000, () => {
        console.log('app rolando')
    })
})