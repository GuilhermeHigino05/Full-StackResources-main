
export default class CourseEntity{
    #curId
    #curNome
    #curValor

    get id(){ return this.#curId }
    get nome(){ return this.#curNome }
    get valor(){ return this.#curValor }
    set id(value){ this.#curId = value }
    set nome(value){ this.#curNome = value }
    set valor(value){ this.#curValor = value }

    constructor(id, nome, valor){
        this.#curId = id
        this.#curNome = nome
        this.#curValor = valor
    }

    

    static toMap(row){
        return new CourseEntity(row.cur_id, row.cur_nome, row.cur_valor)
    }
    toJSON(){
        return {
            id: this.#curId,
            nome: this.#curNome,
            valor: this.#curValor
        }
    }
}