
import AluguelEntity from "../Entities/aluguelEntity.js";
import ContratoEntity from "../Entities/contratoEntity.js";
import ImovelEntity from "../Entities/ImovelEntity.js";
import UserEntity from "../Entities/UserEntity.js";
import Database from "../database/database.js";


export default class ContratoRepository {

    #banco;
    constructor() {
        this.#banco = new Database();
    }

    async listarPorUsuario(usuarioId) {


        const sql = `select * from tb_contrato c
                        inner join tb_imovel i on c.imv_id = i.imv_id
                        inner join tb_aluguel a on c.ctr_id = a.ctr_id
                    where c.usu_id = ?`;

        let rows = await this.#banco.ExecutaComando(sql, [usuarioId]);

        let lista = [];

        for(let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let idContrato = row["ctr_id"];
            let listaAlugueis = [];
            for(let j = 0; j < rows.length; j++) {
                //buscar os alugueis do contrato que está sendo mapeado
                if(idContrato == rows[j]["ctr_id"]) {
                    i++;
                    listaAlugueis.push(new AluguelEntity(rows[j]["alu_id"], 
                        rows[j]["alu_mes"], rows[j]["alu_vencimento"], 
                        rows[j]["alu_valor"], rows[j]["alu_pago"]));
                }
            }

            lista.push(new ContratoEntity(row["ctr_id"], 
                new ImovelEntity(row["imv_id"], row["imv_descricao"], 
                    row["imv_endereco"]), 
                new UserEntity(row["usu_id"]), listaAlugueis))
        }

        return lista;
    }

    async gravar(contrato) {

        const sql = "insert into tb_contrato (imv_id, usu_id) values (?, ?)";

        const valores = [contrato.imovel.id, contrato.usuario.id];

        const result = await this.#banco.ExecutaComandoLastInserted(sql, valores);

        if(result) {
            contrato.id = result;

            return true;
        }

        return false;
    }

}
