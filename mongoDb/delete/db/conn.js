const {MongoClient} = require('mongodb')

const uri = 'mongodb://127.0.0.1:27017/mongodb1'

const client = new MongoClient(uri)

async function run(){

    try {
        await client.connect()
        console.log('Conectado ao MongoDB!')
    } catch (err) {
        console.log(err)
    }
}

run()

module.exports = client