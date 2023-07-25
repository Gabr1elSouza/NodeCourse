const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login(req,res){
        res.render('Auth/login')
    }

    static register(req,res){
        res.render('Auth/register')
    }

    static async registerPost(req,res){
        const {name, email, password, confirmpassword} = req.body

        //Password match validation
        if(password != confirmpassword){
            //mensagens
            req.flash('message', 'As senhas não conferem, tente novamente')
            res.render('auth/register')

            return
        }

        //Check if user exists
        const checkIfUserExist = await User.findOne({where: {email:email}})

        if(checkIfUserExist){
            req.flash('message', 'O email já está em uso')
            res.render('auth/register')

            return
        }

        //create a password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword,
        }

        try {
            const createUser = await User.create(user)

            //initialize session
            req.session.userid = createUser.id

            req.flash('message', 'Cadastro realizado com sucesso!')
            
            req.session.save(()=>{
                res.redirect('/')
            })
            

        } catch (error) {
            console.log(error)
        }
    }

    static logout(req,res){
        req.session.destroy()
        res.redirect('/login')
    }
}