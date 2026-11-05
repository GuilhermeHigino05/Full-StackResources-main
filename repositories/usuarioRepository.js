import Database from "../database/database.js";
import UsuarioEntity from "../entities/usuarioEntity.js";



export default class UsuarioRepository {

    #banco;

    constructor() {
        this.#banco = new Database();
    }

    async obterPorEmailSenha(email, senha) {
        let sql = "select * from tb_usuario where usu_email = ? and usu_senha = ?";

        let valores = [email, senha];

        let rows = await this.#banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            //faz o mapeamento
            return UsuarioEntity.toMap(rows[0]);
        }

        return null;
    }

    async listar() {
        let sql = "select * from tb_usuario";
        let rows = await this.#banco.ExecutaComando(sql);
        let lista = [];
        if(rows.length > 0) {
            //faz o mapeamento
            for(let row of rows) {
                lista.push(UsuarioEntity.toMap(row));
            }
        }

        return lista;
    }

    async obterPorId(id) {
        let sql = "select * from tb_usuario where usu_id = ? and usu_ativo = 1";

        let valores = [id];

        let rows = await this.#banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            //faz o mapeamento
            return UsuarioEntity.toMap(rows[0]);
        }

        return null;
    }
}