const express = require('express')
const cors = require('cors')

const app = express()

//config JSON response
app.use(express.json())

//solve CORS
app.use(cors({credentials: true, origin:'http://localhost:3000'}))

// Public folder for images
app.use(express.static('public'))

//routes
const UserRoutes = require('./routes/userRoutes')
const PetRoutes = require('./routes/petRoutes')

app.use('/users',UserRoutes)
app.use('/pets',PetRoutes)


app.listen(5000)