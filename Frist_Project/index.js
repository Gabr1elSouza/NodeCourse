//modulos externos
const inquirer = require('inquirer')
const chalk = require("chalk")

//modulos internos
const fs = require("fs")
const { default: Choices } = require('inquirer/lib/objects/choices')

console.log("inciando o Accounts")

operation()

function operation(){
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices:[
            'Criar Conta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
            'Transferência',
            'Sair'
        ],
    },
]).then((answer)=>{
    const action = answer['action']
    if(action === 'Criar Conta'){
        createAccount()
        buildAccount()
    } else if(action === 'Consultar Saldo'){
        getAccountBalance()
    }else if(action === 'Depositar'){
        deposit()
    }else if(action === 'Sacar'){
        widtdraw()
    }else if(action === 'Sair'){
        console.log(chalk.black.bgBlue("Obrigado por usar o Accounts!"))
        process.exit()
    }else if(action === 'Transferência'){
        transfer()
    }
}).catch((err) => console.log(err))
}

//create an account
function createAccount(){
    console.log(chalk.bgGreen.black('Parabens por escolher o nosso banco!'))
    console.log(chalk.green("Defina as opções da sua conta a seguir"))
}

function buildAccount(){
    inquirer.prompt([
        {
            name: 'AccountName',
            message: 'Digite o nome para a sua conta: '
        }
    ]).then((answer) =>{
        const accountName= answer['AccountName']

        console.info(accountName)

        if(!fs.existsSync("accounts")){
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black("Esta conta já existe, escolha outro nome!"))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, `{"balance": 0}`, function(err){
            console.log(err)
        },
    )
        console.log(chalk.bgGreen('Parabéns, a sua conta foi criada!'))
        operation()

    }).catch((err)=> console.log(err))
}

// add an amount to user account

function deposit(){
    inquirer.prompt([{
        name: 'AccountName',
        message: 'Qual o nome da sua conta?'
    }]).then((answer)=>{

        const AccountName = answer['AccountName']
        
        //verify if account exists
        if(!checkAccount(AccountName)){
            return deposit()
        }
        inquirer.prompt([{
            name: 'amount',
            message: 'Quanto você deseja depositar'
        }]).then((answer)=>{
            const amount = answer['amount']
            //add an amount
            addAmount(AccountName, amount)
            operation()
        }).catch((err)=> console.log(err))

    }).catch((err)=> console.log(err))
}

function checkAccount(AccountName){
    if(!fs.existsSync(`accounts/${AccountName}.json`)){
        console.log(chalk.bgRed.black("Está conta não existe, escolha outro nome!"))
        return false
    }else{
        return true
    }
}

function addAmount(accountName,amount){
    const accountData = getAccount(accountName)
    
    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde'))
        return deposit()
    }
        accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

        fs.writeFileSync(`accounts/${accountName}.json`, 
        JSON.stringify(accountData),
        function(err){
            console.log(err)
        },
        )
    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`))
    
}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`,{
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}

//show account balance
function getAccountBalance(){
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }]).then((answer)=>{
        const accountName = answer['accountName']
        if(!checkAccount(accountName)){
            return getAccountBalance ()
        }
        const accountData = getAccount(accountName)

        console.log(chalk.bgBlue.black(`Olá o saldo da sua conta é de R$${accountData.balance}`))
        operation()
    }).catch((err)=> console.log(err))
}

//withdraw an amount from user
function widtdraw(){
    inquirer.prompt([{
        name: 'accountName',
        message:"Qual o nome da sua conta?"
    }]).then((answer)=>{
        const accountName = answer['accountName']
        if(!checkAccount(accountName)){
            return widtdraw()
        }
        inquirer.prompt([{
            name: 'amount',
            message: 'Quanto você deseja sacar?'
        }]).then((answer)=>{
            const amount = answer['amount']
            removeAmount(accountName,amount)
        }).catch((err)=> console.log(err))
    }).catch((err)=> console.log(err))
}

function removeAmount(accountName, amount){
    const accountData = getAccount(accountName)
    if(!amount){
        console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente mas tarde!"))
        return widtdraw()
    }
    if(accountData.balance <amount){
        console.log(chalk.bgRed.black('Valor indisponivél!'))
        return widtdraw()
    }
    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(`accounts/${accountName}.json`, 
        JSON.stringify(accountData),
        function(err){
            console.log(err)
        },
        )
        console.log(chalk.green(`Foi realizado um saque de R$${amount} da sua conta!`))
        operation()
}

function transition(accountName,accountName2,amount){
    const accountData = getAccount(accountName)
    const accountData2 = getAccount(accountName2)

    if(!amount){
        console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente mas tarde!"))
        return transfer()
    }
    if(accountData.balance <amount){
        console.log(chalk.bgRed.black('Valor indisponivél!'))
        return transfer()
    }
    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)
    accountData2.balance = parseFloat(accountData2.balance) + parseFloat(amount)


    fs.writeFileSync(`accounts/${accountName}.json`, 
        JSON.stringify(accountData),
        function(err){
            console.log(err)
        },
        )
    fs.writeFileSync(`accounts/${accountName2}.json`, 
        JSON.stringify(accountData2),
        function(err){
            console.log(err)
        },
        )
    console.log(chalk.green(`Transferencia realizada de R$${amount} da conta ${accountName} para ${accountName2}`))
    operation()
    
}

function transfer(){
    inquirer.prompt([{
        name: 'accountName',
        message:'Qual é a sua conta?'
    }]).then((answer)=>{
        const accountName = answer['accountName']
        if(!checkAccount(accountName)){
            return transfer()
        }
        inquirer.prompt([{
            name: 'accountName2',
            message:'Qual é a conta que você deseja realizar transferência?'
    }]).then((answer)=>{
        const accountName2 = answer['accountName2']
        if(!checkAccount(accountName2)){
            return transfer()
        }
        inquirer.prompt([{
            name: 'amount',
            message:'Qual é o valor dessa transferência?'
    }]).then((answer)=>{
        const amount = answer['amount']
        transition(accountName,accountName2,amount)
    
    })
    }).catch((err)=> console.log(err))
    
}).catch((err)=> console.log(err))

}