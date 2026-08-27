import express from 'express'
import ImovelController from '../controller/imovelController.js';

const Router = express.Router();
let ctrl = new ImovelController();

Router.get('', (req, res) => {
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = 'Lista todos os imóveis'
    ctrl.Read(req, res)
})

Router.post('', (req, res) => {
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = 'Cadastrar imóveis'
    ctrl.Create(req, res)
})

export default Router