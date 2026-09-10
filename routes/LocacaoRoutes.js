import express from 'express'
import LocacaoController from '../controller/LocacaoController.js'
import AuthMiddleware from '../middleware/AuthMiddleware.js'

const router = express.Router();

let ctrl = new LocacaoController();
let auth = new AuthMiddleware();

router.post('/', auth.validar, (req, res) => {

    // #swagger.tags = ['locação']
    // #swagger.sumary = 'Realizar Locação'
    ctrl.locar(req, res);
})

export default router