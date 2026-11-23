
import Database from "../database/database.js";
import AluguelEntity from "../entities/aluguelEntity.js";
import ContratoEntity from "../entities/contratoEntity.js";
import ImovelEntity from "../entities/imovelEntity.js";
import UsuarioEntity from "../entities/usuarioEntity.js";


export default class ContratoRepository {

    #banco;
    constructor() {
        this.#banco = new Database();
    }

    async listarPorUsuario(usuarioId) {
        const sql = `SELECT c.ctr_id, c.usu_id,
                            i.imv_id, i.imv_descricao, i.imv_cep, i.imv_endereco,
                            i.imv_bairro, i.imv_cidade, i.imv_valor, i.imv_disponivel,
                            a.alu_id, a.alu_mes, a.alu_vencimento, a.alu_valor, a.alu_pago
                     FROM tb_contrato c
                     INNER JOIN tb_imovel i ON c.imv_id = i.imv_id
                     LEFT JOIN tb_aluguel a ON c.ctr_id = a.ctr_id
                     WHERE c.usu_id = ?
                     ORDER BY c.ctr_id, a.alu_vencimento`;

        const rows = await this.#banco.ExecutaComando(sql, [usuarioId]);
        const contratosPorId = new Map();

        for (const row of rows) {
            let contrato = contratosPorId.get(row.ctr_id);

            if (!contrato) {
                contrato = new ContratoEntity(
                    row.ctr_id,
                    new ImovelEntity(
                        row.imv_id,
                        row.imv_descricao,
                        row.imv_cep,
                        row.imv_endereco,
                        row.imv_bairro,
                        row.imv_cidade,
                        row.imv_valor,
                        row.imv_disponivel
                    ),
                    new UsuarioEntity(row.usu_id),
                    []
                );
                contratosPorId.set(row.ctr_id, contrato);
            }

            if (row.alu_id != null) {
                contrato.alugueis.push(new AluguelEntity(
                    row.alu_id,
                    row.alu_mes,
                    row.alu_vencimento,
                    row.alu_valor,
                    row.alu_pago
                ));
            }
        }

        return [...contratosPorId.values()];
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
