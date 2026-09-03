import Database from "../database/database.js"
import UserEntity from "../Entities/UserEntity.js";


export default class UserRepository {
    #banco
    constructor(){
        this.#banco = new Database()
    }

    async obterPorEmailSenha(email, senha){
        let sql = "select * from tb_usuario where usu_email = ? and usu_senha = ?";
        let value = [email, senha]
        let rows = await this.#banco.ExecutaComando(sql, value);
        if(rows.length > 0){
            return UserEntity.toMap(rows[0])
        }
        return null;
    }
}