import e from "express";
import CourseRepository from "../Repositories/CourseRepository"


export default class CourseController {

    #curRepository

    constructor() {
        this.#curRepository = new CourseRepository
    }

    async Read(req,res){
        try{
            let list = await this.#curRepository.Read();
            if(list.length === 0){
                return res.status(204).json({msg: 'Nenhum Curso disponível'})
            }
            return res.status(200).json(list);
        }catch(error){
            console.log(error);
        }
    }

    async Create(req,res){
        
    }
}
