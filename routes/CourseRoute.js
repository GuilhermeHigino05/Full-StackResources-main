import express from "express";
import CourseController from "../controller/CourseController.js";
const ctrl = new CourseController()
const router = express.Router()

router.get('/', (req,res) => {
    // #swagger.tags = ['Course']
    // #swagger.summary = 'Lista todos os cursos'
    ctrl.Read(req, res)
})

router.post('/', (req, res) => {
    // #swagger.tags = ['Course']
    // #swagger.summary = 'Criar um curso'
    ctrl.Create(req,res);
})


router.put('/', (req, res) => {
    // #swagger.tags = ['Course']
    // #swagger.summary = 'Atualizar um curso'
    ctrl.Update(req,res);
})


router.delete('/:id', (req, res) => {
    // #swagger.tags = ['Course']
    // #swagger.summary = 'Excluir um curso'
    ctrl.Delete(req,res);
})


router.get('/:id', (req, res) => {
    // #swagger.tags = ['Course']
    // #swagger.summary = 'Encontrar um curso'
    ctrl.GetById(req,res);
})

export default router;
