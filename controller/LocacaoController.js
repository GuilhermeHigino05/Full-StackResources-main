import AluguelRepository from "../Repositories/aluguelRepository.js";
import ContratoRepository from "../Repositories/contratoRepository.js";
import ImovelRepository from '../Repositories/ImovelRepository.js'
import ContratoEntity from '../Entities/contratoEntity.js'
import AluguelEntity from '../Entities/aluguelEntity.js'
import UserEntity from '../Entities/UserEntity.js'
import Database from '../database/database.js'
export default class LocacaoController {
    #contratoRepo;
    #aluguelRepo;
    #imovelRepo;
    
    constructor(){
        this.#aluguelRepo = new AluguelRepository()
        this.#contratoRepo = new ContratoRepository()
        this.#imovelRepo = new ImovelRepository()
    }

    async locar(req, res){
        let banco = new Database()
        try {
            await banco.StartTansaction();
            this.#aluguelRepo.banco = banco;
            this.#contratoRepo.banco = banco;
            this.#imovelRepo.banco = banco;
            let {idImovel} = req.body;
            let imovel = await this.#imovelRepo.GetById(idImovel);
            if(imovel == null || imovel.available === 0){
                return res.status(400).json({msg: 'Este imóvel está indisponível para locação'});
            }

            //Gera contrato

            let contrato = new ContratoEntity();
            let hoje = new Date();
            contrato.imovel = imovel;
            contrato.usuario = new UserEntity(req.user);
            if( await this.#contratoRepo.gravar(contrato) ){
                let aluguel = new AluguelEntity()
                aluguel.contrato = contrato
                aluguel.valor = imovel.price
                aluguel.pago = 0
                for(let i = 1; i <= 12; i++){
                    hoje.setMonth(hoje.getMonth()+ i)
                    aluguel.mes = hoje.getMonth() +1;
                    aluguel.vencimento = hoje;

                    if(await this.#aluguelRepo.gravar(aluguel) == false){
                        throw new Error('Erro ao gravar aluguel');
                    }
                }
                imovel.available = 0
                if(await this.#imovelRepo.Update(imovel)){
                    await banco.Commit();
                    return res.status(200).json({msg: 'Imóvel alugado com sucesso'})
                }else{
                    throw new Error('Erro ao atualizar imóvel no banco de dados')
                }

            }else{
                throw new Error ('Erro ao gerar contrato')
            }
        } catch (error) {
            await banco.Rollback()
            console.log(error);
            return res.status(500).json({msg: "Internal Server Error"})
        }
    }
}
