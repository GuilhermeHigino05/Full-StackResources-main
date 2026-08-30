import MatriculaEntity from "../Entities/MatriculaEntity.js";
import MatriculaRepository from "../Repositories/MatriculaRepository.js"
export default class MatriculaController{
    #matRepository

    constructor(){
        this.#matRepository = new MatriculaRepository
    }

    async Read(req,res){
        try{
            let list = await this.#matRepository.Read();
            if(list.length == 0){
                return res.status(204).json({msg: 'Nenhuma Matricula disponível'})
            }
            return res.status(200).json(list);
        }catch(error){
            console.log(error);
            return res.status(500).json({msg: 'Internal server error'});
        }
    }

    async Create(req,res){
        try{
            let {id,nome,email,cep, endereco, bairro, cidade, uf, cursando, cur_id} = req.body;
            if(!nome || !email || !cep || !endereco || !bairro || !cidade || !uf || !cursando || !cur_id){
                return res.status(400).json({msg: 'Campos obrigatórios não preenchidos'})
            }
            let data = new Date();
            let entity = new MatriculaEntity(id, nome, data, email, cep, endereco, bairro, cidade, uf, cursando, cur_id);
            let resp = await this.#matRepository.Create(entity);
            if(resp){
                return res.status(201).json({id: resp});
            }
            throw new Error('Error ao cadastrar o curso');
        }
        catch(error){
            console.log(error);
            return res.status(500).json({msg: 'Internal server error'});
        }       
    }
    async Update(req,res){
        try{
            let {id,nome,email,cep, endereco, bairro, cidade, uf, cursando, cur_id} = req.body;
            if(!id || !nome || !email || !cep || !endereco || !bairro || !cidade || !uf || !cursando || !cur_id){
                return res.status(400).json({msg: 'Campos obrigatórios não preenchidos'})
            }
            let data = new Date();
            let entity = new MatriculaEntity(id, nome, data, email, cep, endereco, bairro, cidade, uf, cursando, cur_id);
            let resp = await this.#matRepository.Update(entity);
            if(resp){
                return res.status(200).json({msg: 'Matricula atualizada com sucesso'});
            }
            throw new Error('Error ao atualizar a matricula');
        }
        catch(error){
            console.log(error);
            return res.status(500).json({msg: 'Internal server error'});
        }
    }
    async Delete(req, res){
        try{
            let { id } = req.params
            if(!id){
                return res.status(400).json({msg: 'Parametros incorretos'});
            }
            let resp = await this.#matRepository.Delete(id);
            if(resp){
                return res.status(200).json({msg: 'Matricula excluida com sucesso'});
            }
            throw new Error('Internal server error');
        }
        catch(error){
            console.log(error);
            return res.status(500).json({msg: 'Internal server error'});
        }
    }

    async GetById(req, res){
        try{
            let {id} = req.params
            if(id){
                let list = await this.#matRepository.GetById(id);
                if(list.length == 0){
                    return res.status(204).json({msg: 'Nenhuma Matricula disponível'})
                }
                return res.status(200).json(list);
            }else{
                return res.status(400).json({msg: 'Parâmetros invalidos'})
            }
            
        }catch(error){
            console.log(error);
            return res.status(500).json({msg: 'Internal server error'});
        }
    }

}