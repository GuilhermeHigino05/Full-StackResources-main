import Database from "../database/database";

export default class CourseRepository{

    #db
    constructor(){
        this.#db = new Database()
    }

    async Create(entity){

    }

    async Read(){
        let query = 'select * from tb_course'
    }

    async Update(entity){

    }

    async Delete(id){

    }
    async GetById(id){

    }

}