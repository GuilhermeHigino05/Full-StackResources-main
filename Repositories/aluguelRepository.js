
import AluguelEntity from "../Entities/aluguelEntity.js";
import Database from "../database/database.js";



export default class AluguelRepository {

    #banco;
    constructor() {
        this.#banco = new Database();
    }

    async gravar(aluguel) {

        const sql = "insert into tb_aluguel (alu_mes, alu_vencimento, alu_valor, alu_pago, ctr_id) values (?, ?, ?, ?, ?)";

        const valores = [aluguel.mes, aluguel.vencimento, aluguel.valor, aluguel.pago, aluguel.contrato.id];

        const result = await this.#banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async listarPorUsuario(idUsuario) {

        const sql = "select * from tb_aluguel a inner join tb_contrato c on a.ctr_id = c.ctr_id where c.ctr_id = ?";

        const valores = [idUsuario];

        const rows = await this.#banco.ExecutaComando(sql, valores);
        let lista = [];

        for(let i =0; i< rows.length; i++) {
            lista.push(AluguelEntity.toMap(rows[i]));
        }

        return lista;
    }

    async marcarComoPago(idAluguel) {

        const sql = "update tb_aluguel set alu_pago = 1 where alu_id = ?";
        const valores = [idAluguel];

        const result = await this.#banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}
