import express from 'express';
import imovelRouter from './routes/imovelRoutes.js';
import swaggerUi from 'swagger-ui-express';
import {createRequire} from 'module';
import LoginRouter from './routes/loginRoute.js'
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");

const server = express();

server.use(express.json());

server.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson));
server.use("/imovel", imovelRouter);
server.use("/User", LoginRouter);
server.listen(5000, function() {
    console.log("servidor web em funcionamento!");
})