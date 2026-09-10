import express from 'express'
import LoginController from '../controller/LoginController.js';


let ctrl = new LoginController()
const Router = express.Router();

Router.post('/', (req, res) => {
    // #swagger.tags = ['Login']
    // #swagger.summary = 'Valida credenciais de login'
    ctrl.validar(req, res);
});



export default Router