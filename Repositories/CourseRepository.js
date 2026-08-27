import Database from "../database/database.js";

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
        let res = await this.#db.ExecutaComando(query);
        return res
    }

    async Update(entity){

    }

    async Delete(id){

    }
    async GetById(id){

    }

}