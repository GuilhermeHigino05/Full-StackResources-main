import Entity from "./Entity.js";


export default class PerfilEntity extends Entity{
    #per_id
    #per_descricao

    get id() {
        return this.#per_id;
    }
    set id(value) {
        this.#per_id = value;
    }
    get description() {
        return this.#per_descricao;
    }
    set description(value) {
        this.#per_descricao = value;
    }
    constructor(id, description) {
        super();
        this.#per_id = id;
        this.#per_descricao = description;
    }

    toMap(row){
        return new PerfilEntity(row.per_id, row.per_descricao);
    }
}