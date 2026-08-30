import Database from "../database/database.js";
import CursoEntity from '../Entities/CourseEntity.js'
export default class CourseRepository{

    #db
    constructor(){
        this.#db = new Database()
    }

    async Create(entity){
        let query = 'insert into tb_curso(cur_id, cur_nome, cur_valor) values (?,?,?) ';
        let values = [entity.id, entity.nome, entity.valor];
        let res = this.#db.ExecutaComandoLastInserted(query, values);
        return res;
    }

    async Read(){
        let query = 'select * from tb_curso'
        let rows = await this.#db.ExecutaComando(query);
        let list = []
        if(rows.length > 0){
            for(let row of rows){
                list.push(CursoEntity.toMap(row));
            }
        }
        return list
    }

    async Update(entity){
        let query = 'update tb_curso set cur_nome = ?, cur_valor = ? where cur_id = ?';
        let values = [entity.nome, entity.valor, entity.id];
        let res = await this.#db.ExecutaComandoNonQuery(query, values)
        return res;
    }

    async Delete(id){
        let query = 'delete from tb_curso where cur_id = ?';
        let values = [id];
        let res = await this.#db.ExecutaComandoNonQuery(query,values);
        return res;
    }
    async GetById(id){
        let query = 'select * from tb_curso where cur_id = ?';
        let values = [id];
        let rows = await this.#db.ExecutaComando(query, values);

        if (rows.length === 0) {
            return null;
        }

        return CursoEntity.toMap(rows[0]);
    }

}