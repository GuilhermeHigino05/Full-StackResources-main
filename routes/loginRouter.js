import express from 'express';
import LoginController from '../controllers/loginController.js';
import autenticacaoMiddleware from'../middlewares/autenticacaoMiddleware.js';

const auth = new autenticacaoMiddleware();
const router = express.Router();
let controladora = new LoginController();
router.get('/cookie', auth.validar, (req, res) => {
    // #swagger.tags = ['Login']
    // #swagger.summary = "Valida a autenticação via JWT na cookie do navegador"
    controladora.cookie(req, res);
})
router.post("/", (req, res) => {

    // #swagger.tags = ['Login']
    // #swagger.summary = "Gera a autenticação via JWT na cookie do navegador"
    controladora.validar(req, res);
})

export default router;