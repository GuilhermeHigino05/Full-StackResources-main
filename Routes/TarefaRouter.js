import express from 'express'

import TarefaController from '../Controllers/TarefaController.js'

const Router = express.Router()
let controller = new TarefaController()
Router.get('/', (req, res) => {
    // #swagger.tags = ['Tarefas']
    // #swagger.description = 'Endpoint para listar todas as tarefas'
    controller.Read(req, res);
});
Router.post('/', (req, res) => {
    // #swagger.tags = ['Tarefas']
    // #swagger.description = 'Endpoint para criar uma nova tarefa'
    controller.Create(req, res);
});
Router.put('/', (req, res) => {
    // #swagger.tags = ['Tarefas']
    // #swagger.description = 'Endpoint para atualizar uma tarefa existente'
    controller.Update(req, res);
});
Router.delete('/:id', (req, res) => {
    // #swagger.tags = ['Tarefas']
    // #swagger.description = 'Endpoint para excluir uma tarefa'
    controller.Delete(req, res);
});
Router.get('/:id', (req, res) => {
    // #swagger.tags = ['Tarefas']
    // #swagger.description = 'Endpoint para obter uma tarefa pelo ID'
    controller.GetById(req, res);
});

export default Router;