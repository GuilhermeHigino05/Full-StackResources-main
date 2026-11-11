import ImovelEntity from "../entities/imovelEntity.js";
import ImovelRepository from "../repositories/imovelRepository.js"


export default class ImovelController {

    #repo;

    constructor() {
        this.#repo = new ImovelRepository();
    }

    async listar(req, res) {

        try{
            
            let lista = await this.#repo.listar();
            if(lista.length == 0) 
                return res.status(204).json({msg: "Nenhum imóvel encontrado!"});

            return res.status(200).json(lista);
        }
        catch(ex) {
            console.log(ex);
            return res.status(500).json({msg: "Erro interno no servidor!"});
        }
    }

    async cadastrar(req, res) {
        try{
            let {descricao, cep, endereco, bairro, cidade, valor, disponivel} = req.body;
            let entidade = new ImovelEntity(0, descricao, cep, endereco, bairro, cidade, valor, disponivel);
            if(entidade.validar()) {
                let result = await this.#repo.cadastrar(entidade);
                if(result) {
                    return res.status(201).json(entidade);
                }

                throw new Error("Erro ao inserir imóvel no banco de dados");
            }
            else {
                return res.status(400).json({msg: "Parâmetros incorretos!"});
            }

        }
        catch(ex) {
            console.log(ex);
            return res.status(500).json({msg: "Erro interno no servidor!"});
        }
    }

    async atualizar(req, res) {
        try{
            let {id, descricao, cep, endereco, bairro, valor, cidade, disponivel} = req.body;
            let entidade = new ImovelEntity(id, descricao, cep, endereco, bairro, cidade, valor, disponivel);
            if(entidade.validar()) {
                if(await this.#repo.obterPorId(id)) {
                    //prossegue com a atualização
                    let result = this.#repo.atualizar(entidade);
                    if(result){
                        return res.status(200).json({msg: "Imóvel atualizado com sucesso!"});
                    }
                    else
                        throw new Error("Erro durante a atualização no banco de dados");
                }
                else {
                    return res.status(404).json({msg: "Imóvel não encontrado para atualização!"});
                }
            }
            else {
                return res.status(400).json({msg: "Parâmetros incorretos!"});
            }
        }
        catch(ex) {
            console.log(ex);
            return res.status(500).json({msg: "Erro interno no servidor!"});
        }
    }

    async obterPorId(req, res){
        let {id} = req.params;
        try{
            let entidade = await this.#repo.obterPorId(id);
            if(entidade) {
                return res.status(200).json(entidade);
            }
            else {
                return res.status(404).json({msg: "Imóvel não encontrado!"});
            }
        }
        catch(ex) {
            console.log(ex);
            return res.status(500).json({msg: "Erro interno no servidor!"});
        }
    }

    async deletar(req, res) {

        try{
            let {id} = req.params;
            if(await this.#repo.obterPorId(id)){
                let result = await this.#repo.deletar(id);
                if(result) {
                    return res.status(200).json({msg: "Imóvel deletado com sucesso!"});
                }
                else
                    throw new Error("Erro durante exclusão do imóvel no banco de dados!");
            }
            else {
                return res.status(404).json({msg: "Imóvel não encontrado para deleção!"});
            }
        }
        catch(ex) {
            console.log(ex);
            return res.status(500).json({msg: "Erro interno no servidor!"}); 
        }
    }
}