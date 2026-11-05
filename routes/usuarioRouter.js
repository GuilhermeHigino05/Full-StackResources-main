import express from 'express';
import UsuarioController from '../controllers/usuarioController.js';
import AutenticacaoMiddleware from '../middlewares/autenticacaoMiddleware.js';

const router = express.Router();

let ctrl = new UsuarioController();
let auth = new AutenticacaoMiddleware();
router.get("/", auth.validar, (req, res) => {

    // #swagger.tags = ['Usuário']
    // #swager.summary = "Lista todo os usuário cadastrados no banco de dados"
    ctrl.listar(req, res);
});

export default router;