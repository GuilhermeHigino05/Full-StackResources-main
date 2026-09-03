import express from 'express'
import LoginController from '../controller/LoginController.js';


let ctrl = new LoginController()
const Router = express.Router();

Router.post('/', (req, res) => {
    ctrl.validar(req, res);
})

export default Router