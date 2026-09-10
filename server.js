import express from 'express';
import imovelRouter from './routes/imovelRoutes.js';
import swaggerUi from 'swagger-ui-express';
import {createRequire} from 'module';
import LoginRouter from './routes/loginRoute.js'
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");
const cookieParser = require('cookie-parser');
import userRouter from './routes/UserRoutes.js';
import locacaoRouter from './routes/LocacaoRoutes.js';


const server = express();
server.use(cookieParser());
server.use(express.json());

server.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson));
server.use("/imovel", imovelRouter);
server.use("/login", LoginRouter);
server.use('/user', userRouter);
server.use('/locacao', locacaoRouter);
server.listen(5000, function() {
    console.log("servidor web em funcionamento!");
})