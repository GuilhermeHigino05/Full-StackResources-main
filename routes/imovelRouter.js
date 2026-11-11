import express from 'express';
import ImovelController from '../controllers/imovelController.js';
import AutenticacaoMiddleware from '../middlewares/autenticacaoMiddleware.js';

const router = express.Router();

let controladora = new ImovelController();
let auth = new AutenticacaoMiddleware();
router.get("/", auth.validar, (req, res) => {

    // #swagger.tags = ['Imóvel']
    // #swagger.summary = "Lista todos os imóveis cadastrados"
    controladora.listar(req, res);
})
router.post("/", auth.validar, (req, res) => {

    // #swagger.tags = ['Imóvel']
    // #swagger.summary = "Cadastrar novo imóvel"

    controladora.cadastrar(req, res);
})
router.put("/", auth.validar, (req, res) => {
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = "Atualizar um imóvel existente"
    controladora.atualizar(req, res);
 })
 router.delete("/:id", auth.validar, (req, res) => {
    //#swagger.tags = ['Imóvel']
    // #swagger.summary = "Excluir um imóvel existente"
    controladora.deletar(req, res);
 })
 router.get("/:id", auth.validar, (req, res) => {
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = "Obter um imóvel pelo ID"
    controladora.obterPorId(req, res);
 })

export default router;