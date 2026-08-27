import express from "express";
import CourseController from "../controller/CourseController.js";
const ctrl = new CourseController()
const router = express.Router()

router.get('/', (req,res) => {
    // #swagger.tags = ['Course]
    // #swagger.summary = 'Lista todos os cursos'
    ctrl.Read(req, res)
})

export default router
