const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('nodemvc', 'root', 'Savitar18',{
    host:'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log('Conectado ao MySQL')
}catch(err){
    console.log(err)

}

exports.default = sequelize