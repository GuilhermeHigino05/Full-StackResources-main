import express from "express";
import MatriculaController from "../controller/MatriculaController.js";
const ctrl = new MatriculaController()
const router = express.Router()

router.get('/', (req,res) => {
    // #swagger.tags = ['Matricula']
    // #swagger.summary = 'Lista todas as matrículas'
    ctrl.Read(req, res)
})

router.post('/', (req, res) => {
    // #swagger.tags = ['Matricula']
    // #swagger.summary = 'Criar uma matrícula'
    ctrl.Create(req,res);
})


router.put('/', (req, res) => {
    // #swagger.tags = ['Matricula']
    // #swagger.summary = 'Atualizar uma matrícula'
    ctrl.Update(req,res);
})


router.delete('/:id', (req, res) => {
    // #swagger.tags = ['Matricula']
    // #swagger.summary = 'Excluir uma matrícula'
    ctrl.Delete(req,res);
})


router.get('/:id', (req, res) => {
    // #swagger.tags = ['Matricula']
    // #swagger.summary = 'Encontrar uma matrícula'
    ctrl.GetById(req,res);
})

export default router;
