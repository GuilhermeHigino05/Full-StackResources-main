import express from 'express'
import UsuarioController from '../Controllers/UsuarioController.js'


const Router = express.Router()
let controller = new UsuarioController()
Router.get('/', (req, res) => {
    // #swagger.tags = ['Usuario']
    // #swagger.summary = 'Endpoint para listar todas as usuario'
    controller.Read(req, res);
});
Router.post('/', (req, res) => {
    // #swagger.tags = ['Usuario']
    // #swagger.summary = 'Endpoint para criar uma nova usuario'
    controller.Create(req, res);
});
Router.put('/', (req, res) => {
    // #swagger.tags = ['Usuario']
    // #swagger.summary = 'Endpoint para atualizar uma usuario existente'
    controller.Update(req, res);
});
Router.delete('/:id', (req, res) => {
    // #swagger.tags = ['Usuario']
    // #swagger.summary = 'Endpoint para excluir uma usuario'
    controller.Delete(req, res);
});


export default Router;