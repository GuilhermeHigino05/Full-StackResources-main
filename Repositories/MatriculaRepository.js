import Database from "../database/database.js";
import MatriculaEntity from "../Entities/MatriculaEntity.js";
export default class MatriculaRepository{
    #db
    constructor(){
        this.#db = new Database
    }

    async Create(entity){
        let query = 'insert into tb_matricula(mat_id, mat_nome, mat_data, mat_email, mat_cep, mat_endereco, mat_bairro, mat_cidade, mat_uf, mat_cursando, cur_id) values (?,?,?,?,?,?,?,?,?,?,?)';
        let values = [entity.id, entity.nome, entity.data, entity.email, entity.cep, entity.endereco, entity.bairro, entity.cidade, entity.uf, entity.cursando, entity.curso_id];
        return await this.#db.ExecutaComandoLastInserted(query, values);
    }

    async Read(){
        let query = 'select * from tb_matricula';
        let rows = await this.#db.ExecutaComando(query);
        let list = [];
        for(let row of rows){
            let entity = new MatriculaEntity(row.mat_id, row.mat_nome, row.mat_data, row.mat_email, row.mat_cep, row.mat_endereco, row.mat_bairro, row.mat_cidade, row.mat_uf, row.mat_cursando, row.cur_id);
            list.push(entity);
        }
        return list;
    }

    async Update(entity){
        let query = 'update tb_matricula set mat_nome = ?, mat_data = ?, mat_email = ?, mat_cep = ?, mat_endereco = ?, mat_bairro = ?, mat_cidade = ?, mat_uf = ?, mat_cursando = ?, cur_id = ? where mat_id = ?';
        let values = [entity.nome, entity.data, entity.email, entity.cep, entity.endereco, entity.bairro, entity.cidade, entity.uf, entity.cursando, entity.curso_id, entity.id];
        let res = await this.#db.ExecutaComandoNonQuery(query, values);
        return res
    }

    async Delete(id){
        let query = 'delete from tb_matricula where mat_id = ?';
        let values = [id];
        let res = await this.#db.ExecutaComandoNonQuery(query,values);
        return res;
    }

    async GetById(id){
        let query = 'select * from tb_matricula where mat_id = ?';
        let values = [id];
        let rows = await this.#db.ExecutaComando(query, values);

        if (rows.length === 0) {
            return null;
        }

        return MatriculaEntity.toMap(rows[0]);
    }

    
}