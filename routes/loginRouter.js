import express from 'express';
import LoginController from '../controllers/loginController.js';

const router = express.Router();
let controladora = new LoginController();
router.post("/", (req, res) => {

    // #swagger.tags = ['Login']
    // #swagger.summary = "Gera a autenticação via JWT na cookie do navegador"
    controladora.validar(req, res);
})

export default router;