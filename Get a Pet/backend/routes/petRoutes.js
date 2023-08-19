const router = require('express').Router()
const PetController = require('../controllers/PetController')

//middlewares
const verifyToken = require('../helpers/verify-Token')

router.post('/create',verifyToken, PetController.create)

module.exports = router