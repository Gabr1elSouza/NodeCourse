const x= 10

//check if x is a number
if(!Number.isInteger(x)){
    throw new Error("O valor de x não é um numero inteiro")
}

console.log("Continuando o codigo...")