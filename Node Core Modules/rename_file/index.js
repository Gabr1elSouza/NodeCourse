const fs= require('fs')

const oldFile = 'arquivo.txt'
const newFile = 'novo.txt'

fs.rename(oldFile, newFile, function(err){
    if(err){
        console.log(err)
        return
    }
    console.log(`O arquivo ${oldFile} foi renomeado para ${newFile}!`)
})