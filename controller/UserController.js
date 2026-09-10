import UserRepository from "../Repositories/UserRepository.js";


export default class UserController{
    #repo 
    constructor(){
        this.#repo = new UserRepository();
    }

    async listar(req,res){
        try {
            let lista = await this.#repo.listar();
            if(lista.length == 0){
                return res.status(204).json();
            }
            return res.status(200).json({lista})
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: 'Internal server error'})
        }
    }
}