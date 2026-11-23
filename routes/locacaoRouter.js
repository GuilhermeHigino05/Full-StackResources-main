import express from 'express';
import LocacaoController from '../controllers/locacaoController.js';
import AutenticacaoMiddleware from '../middlewares/autenticacaoMiddleware.js';

const router = express.Router();

let ctrl = new LocacaoController();
let auth = new AutenticacaoMiddleware();

router.get("/", auth.validar, (req, res) => {

    // #swagger.tags = ['Locação']
    // #swagger.summary = "Lista os contratos e aluguéis do usuário autenticado"
    ctrl.listar(req, res);
});

router.post("/", auth.validar, (req, res) => {

    // #swagger.tags = ['Locação']
    // #swagger.summary = "Realiza o processo de locação de um imóvel"
    ctrl.locar(req, res);
});

export default router;
