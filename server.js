import express from 'express';
import TarefaRouter from './Routes/TarefaRouter.js'
const server = express();
server.use(express.json())
server.use('/tarefa', TarefaRouter)

server.listen(5000, () => {
    console.log('Servidor rodando com sucesso')
})