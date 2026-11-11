import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import imovelRouter from './routes/imovelRouter.js';
import loginRouter from './routes/loginRouter.js';
import usuarioRouter from './routes/usuarioRouter.js';
import locacaoRouter from './routes/locacaoRouter.js';
//importa o swagger-ui
import swaggerUi from 'swagger-ui-express';
//gambiarra para usarmos o require e importar o output
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");

const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(cors({origin: 'http://localhost:3000', credentials: true}))

//definição da rota que irá expor a página de documentação
server.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson));
//Nossas rotas
server.use("/imovel", imovelRouter);
server.use("/login", loginRouter);
server.use("/usuario", usuarioRouter);
server.use("/locacao", locacaoRouter);

server.listen(5000, function() {
    console.log("servidor web em funcionamento!");
})