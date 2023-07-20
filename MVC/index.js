const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

const Task = require('./model/Tasks')

const tasksroutes= require('./router/taskRoutes')

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')



app.use( 
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use(express.static('public'))

app.use('/tasks', tasksroutes)

conn
.sync()
.then(
    app.listen(3000)
).catch((err)=> console.log(err))