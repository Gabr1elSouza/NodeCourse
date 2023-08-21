const Pet = require('../models/Pet')

//helper
const getToken = require('../helpers/GetToken')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class PetController{

    //create a pet
    static async create (req,res){
        const {name, age, weight, color} = req.body
        const images = req.files
        const available = true

        //images upload

        //validations
        if(!name){
            res.status(422).json({message: "O nome é obrigatorio!"})
            return
        }
        if(!age){
            res.status(422).json({message: "A idade é obrigatoria!"})
            return
        }
        if(!weight){
            res.status(422).json({message: "O peso é obrigatorio!"})
            return
        }
        if(!color){
            res.status(422).json({message: "A cor é obrigatoria!"})
            return
        }
        if(images.length === 0){
            res.status(422).json({message: "A imagem é obrigatoria!"})
            return
        }
        //get pet owner
        const token = getToken(req)
        const user = await getUserByToken(token)

        //create a pet
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images:[],
            user:{
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })


        try {
            const newpet = await pet.save()
            res.status(201).json({message: "Pet cadastrado com sucesso!", newpet})

        } catch (err) {
            res.status(500).json({message: 'erro'})
            
        }
    }
    
    static async getAll(req,res){
        const pets = await Pet.find().sort('-createdAt')
        res.status(200).json({pets: pets})
    }
}