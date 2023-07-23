const {Sequelize}= require('sequelize')

const sequelize = new Sequelize('tought', 'root', 'Savitar18',{
    host: 'localhost',
    dialect:'mysql'
})

try{
    sequelize.authenticate()
    console.log('Conectado ao MySQL!')
} catch(err){
    console.log(err)
}

module.exports = sequelize