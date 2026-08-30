import CourseEntity from "../Entities/CourseEntity.js";
import CourseRepository from "../Repositories/CourseRepository.js"


export default class CourseController {

    #curRepository

    constructor() {
        this.#curRepository = new CourseRepository
    }

    async Read(req,res){
        try{
            let list = await this.#curRepository.Read();
            if(list.length == 0){
                return res.status(204).json({msg: 'Nenhum Curso disponível'})
            }
            return res.status(200).json(list);
        }catch(error){
            console.log(error);
            return res.status(500).json({msg: 'Internal server error'});
        }
    }

    async Create(req,res){
        try{
            let {id, nome, valor} = req.body
            if(id, nome, valor){
                let entity = new CourseEntity(id, nome, valor);
                if( entity ){
                    let result = await this.#curRepository.Create(entity);
                    if(result){
                        return res.status(201).json({id: result});
                    }
                    throw new Error('Erro ao cadastrar curso no servidor');
                }
                throw new Error('Erro na leitura');
            }else{
                return res.status(400).json({msg: 'Parametros incorretos'})
            }
        }catch(error){
            console.log(error);
            return res.status(500).json({msg: 'Internal server error'});
        }
    }

    async Update(req, res){
        try{
            let{id, nome, valor} = req.body
            if(id, nome, valor){
                let entity = new CourseEntity(id, nome, valor);
                if( entity ){
                    let result = await this.#curRepository.Update(entity);
                    if(result){
                        return res.status(200).json({entity});
                    }
                    throw new Error('Erro ao atualizar curso no servidor');
                }
                throw new Error('Erro na leitura');
            }else{
                return res.status(400).json({msg: 'Parâmetros incorretos'})
            }
        }catch(error){
            console.log(error);
            return res.status(500).json({msg: 'Internal server error'});
        }
    }

    async Delete(req,res){
        try{
            let {id} = req.params
            if(id){
                let result = await this.#curRepository.Delete(id);
                if(result){
                    return res.status(200).json(result);
                }
                throw new Error('Erro ao deletar curso')
            }else{
                return res.status(400).json({msg: 'Parâmetros incorretos'})
            }
        }catch(error){
            console.log(error);
            return res.status(500).json({msg: 'Internal server error'});
        }
    }

    async GetById(req, res){
        try{
            let { id } = req.params;
            if(id){
                let result = await this.#curRepository.GetById(id)
                if(result){
                    return res.status(200).json({Curso: result});
                }
                return res.status(404).json({msg: 'Curso não encontrado'});
            }else{
                return res.status(400).json({msg: 'Parâmetros incorretos'})
            }
        }catch(error){
            console.log(error);
            return res.status(500).json({msg: 'Internal server error'});
        }
    }
}
