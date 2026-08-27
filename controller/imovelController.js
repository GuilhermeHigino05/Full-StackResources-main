import ImovelEntity from "../Entities/ImovelEntity.js";
import ImovelRepository from "../Repositories/ImovelRepository.js";

export default class ImovelController{

    #imvRepository

    constructor(){
        this.#imvRepository = new ImovelRepository()
    }

    async Read(req,res){
        try{
            let list = await this.#imvRepository.Read();
            if(list.length === 0)
                return res.status(204).json({msg: 'Nenhum imovel cadastrado'});
            return res.status(200).json(list)
        }
        catch(error){
            console.log(error)
            return res.status(500).json({msg: 'Internal Server Error'})
        }
    }
    async Create(req,res){
        try{
            let { description, cep, address, neighborhood, city, price, available } = req.body;
            let entity = new ImovelEntity(0,description,cep,address,neighborhood,city,price,available);
            if(entity.valid()){
                let result = await this.#imvRepository.Create(entity);
                if(result){
                    return res.status(201).json(entity);
                }
                throw new Error("Erro ao inserir imovel no banco de dados")
            }else{
                return res.status(400).json({msg:"Parâmetros Incorretos"})
            }
        }
        catch(error){
            console.log(error)
            return res.status(500).json({msg: 'Internal Server Error'})
        }
    }
    async Update(req,res){

    }
    async Delete(req,res){

    }
}