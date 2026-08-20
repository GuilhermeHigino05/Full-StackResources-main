import express from 'express';
import TarefaRouter from './Routes/TarefaRouter.js';
import UsuarioRouter from './Routes/UsuarioRouter.js';
import swaggerUi from 'swagger-ui-express';
import {createRequire} from 'module'
const server = express();
const require = createRequire(import.meta.url)
const outputJson = require('./swagger-output.json')
server.use(express.json())
server.use('/tarefa', TarefaRouter)
server.use('/user', UsuarioRouter)
server.use('/docs', swaggerUi.serve, swaggerUi.setup(outputJson))
server.listen(5000, () => {
    console.log('Servidor rodando com sucesso')
})