const { Sequelize} = require('sequelize')

const sequelize = new Sequelize('nodesequelize', 'root', 'Savitar18',{
    host: 'localhost',
    dialect: 'mysql'
})

// try{
//     sequelize.authenticate()
//     console.log('Conectado com sucesso com o Sequelize!')

// } catch(err){
//     console.log('Não foi possível conectar: ', err)
// }

module.exports = sequelize