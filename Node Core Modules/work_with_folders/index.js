const fs = require('fs')

if(!fs.existsSync('./minhapasta')){
    console.log('Não existe esse diretorio')
    fs.mkdirSync('minhapasta')
} else if(fs.existsSync('./minhapasta')){
    console.log('Existe esse diretorio')
}