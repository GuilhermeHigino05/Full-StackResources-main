import express from 'express'
import UserController from '../controller/UserController.js'
import AuthMiddleware from '../middleware/AuthMiddleware.js'
let router = express.Router()
let ctrl = new UserController()

let auth = new AuthMiddleware()

router.get('/', auth.validar, (req, res) => {
    
    // #swagger.tags = ['User']
    // #swagger.summary = 'Listar todos os usuário cadastrados'
    
    ctrl.listar(req, res);
})

export default router