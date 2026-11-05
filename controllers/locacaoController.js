import AluguelEntity from "../entities/aluguelEntity.js";
import ContratoEntity from "../entities/contratoEntity.js";
import AluguelRepository from "../repositories/aluguelRepository.js";
import ContratoRepository from "../repositories/contratoRepository.js";
import ImovelRepository from "../repositories/imovelRepository.js";




export default class LocacaoController {

    #contratoRepo;
    #aluguelRepo;
    #imovelRepo;

    constructor() {
        this.#aluguelRepo = new AluguelRepository();
        this.#contratoRepo = new ContratoRepository();
        this.#imovelRepo = new ImovelRepository();
    }

    async locar(req, res) {
        try{
            let {idImovel} = req.body;
            //iniciar transacao
            //validar o imóvel
            let imovel = await this.#imovelRepo.obterPorId(idImovel);
            if(imovel == null || imovel.disponivel == 'N') {
                return res.status(400).json({msg: "Este imóvel não está disponível para locação!"});
            }

            //gerar contrato
            let contrato = new ContratoEntity();
            contrato.imovel = imovel;
            contrato.usuario = req.usuario;
            if(await this.#contratoRepo.gravar(contrato)) {
                //contrato gerado
                // inserir alugueis
                //como regra de negocio nosso sistema considera todos os contratos com duração de 1 ano (12 meses)
                let aluguel = new AluguelEntity();
                let dataHoje = new Date();
                aluguel.contrato = contrato;
                aluguel.valor = imovel.valor;
                aluguel.pago = "N";
                for(let i = 1; i <= 12; i++) {
                    //começamos o mes com o mes seguinte ao mes atual
                    dataHoje.setMonth(dataHoje.getMonth() + i);
                    aluguel.mes = dataHoje.getMonth() + 1;
                    aluguel.vencimento = dataHoje;

                    await this.#aluguelRepo.gravar(aluguel);
                }

                //marca o imovel como indisponivel
                imovel.disponivel = "N";
                if(await this.#imovelRepo.atualizar(imovel)) {
                    //encerrar a transacao com COMMIT
                    return res.status(200).json({msg: "Imóvel alugado com sucesso!"})                
                }
                else
                    throw new Error("Erro ao atualizar imóvel no banco de dados");
            }
            else
                throw new Error("Erro ao inserir contrato no banco de dados!");
        }
        catch(ex) {
            //encerra a transacao com ROLLBACK
            console.log(ex);
            return res.status(500).json({msg: "Erro interno de servidor!"})
        }
    }
}