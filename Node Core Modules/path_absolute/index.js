const path = require('path')

//patch absolute
console.log(path.resolve('text.txt'))

//form path
const midFolder = 'relatorios'
const fileName = 'gabriel.txt'

const finalPath = path.join( "/","arquivos", midFolder, fileName)

console.log(finalPath)