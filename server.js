import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
import CourseRoutes from './routes/CourseRoute.js';
const require = createRequire(import.meta.url)
const outputJson = require('./swagger-output.json')

const app = express();
app.use(express.json());
app.use('/Course', CourseRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(outputJson))

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});