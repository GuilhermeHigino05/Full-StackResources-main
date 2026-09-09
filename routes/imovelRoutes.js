import express from 'express'
import ImovelController from '../controller/imovelController.js';
import authMiddleware from '../middleware/AuthMiddleware.js';
const Router = express.Router();
let ctrl = new ImovelController();
let auth = new authMiddleware();
Router.get('/', auth.validar, (req, res) => {
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = 'Lista todos os imóveis'
    ctrl.Read(req, res)
})

Router.post('/', auth.validar, (req, res) => {
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = 'Cadastrar imóveis'
    ctrl.Create(req, res)
});

Router.put('/', auth.validar, (req, res) => {
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = 'Atualizar imóveis'
    ctrl.Update(req, res)
})

Router.delete('/:id', auth.validar, (req, res) => {
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = 'Deletar imóveis'
    ctrl.Delete(req, res)
})

export default Router