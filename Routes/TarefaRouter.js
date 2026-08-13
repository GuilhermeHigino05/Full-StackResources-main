import express from 'express'

import TarefaController from '../Controllers/TarefaController.js'

const Router = express.Router()
let controller = new TarefaController()
Router.get('/', controller.Read)
Router.post('/', controller.Create)
Router.put('/', controller.Update)
Router.delete('/:id', controller.Delete)
Router.get('/:id', controller.GetById)

export default Router