import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
import imovelRoutes from './routes/imovelRoutes.js';
const require = createRequire(import.meta.url)
const outputJson = require('./swagger-output.json')

const app = express();
app.use(express.json());
app.use('/imoveis', imovelRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(outputJson))

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});