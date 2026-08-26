import express from 'express';
import swaggerUi from 'swagger-ui-express';

const app = express();
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});