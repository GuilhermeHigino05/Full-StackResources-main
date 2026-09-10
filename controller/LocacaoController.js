import AluguelRepository from "../Repositories/aluguelRepository.js";
import ContratoRepository from "../Repositories/contratoRepository.js";
import ImovelRepository from '../Repositories/ImovelRepository.js'
import ContratoEntity from '../Entities/contratoEntity.js'
import AluguelEntity from '../Entities/aluguelEntity.js'
import UserEntity from '../Entities/UserEntity.js'

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
        try {
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

                    await this.#aluguelRepo.gravar(aluguel)
                }
                imovel.available = 0
                if(await this.#imovelRepo.Update(imovel)){
                    return res.status(200).json({msg: 'Imóvel alugado com sucesso'})
                }else{
                    throw new Error('Erro ao atualizar imóvel no banco de dados')
                }

            }else{
                throw new Error ('Erro ao gerar contrato')
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: "Internal Server Error"})
        }
    }
}
