

export default class MatriculaEntity{
    #id
    #nome
    #data
    #email
    #cep
    #endereco
    #bairro
    #cidade
    #uf
    #cursando
    #curso_id

    constructor(id, nome, data, email, cep, endereco, bairro, cidade, uf, cursando, curso_id){
        this.#id = id
        this.#nome = nome
        this.#data = data
        this.#email = email
        this.#cep = cep
        this.#endereco = endereco
        this.#bairro = bairro
        this.#cidade = cidade
        this.#uf = uf
        this.#cursando = cursando
        this.#curso_id = curso_id
    }
    
    get id(){
        return this.#id;
    }
    set id(value){
        this.#id = value;
    }

    get nome(){
        return this.#nome;
    }
    set nome(value){
        this.#nome = value;
    }

    get data(){
        return this.#data;
    }
    set data(value){
        this.#data = value;
    }

    get email(){
        return this.#email;
    }
    set email(value){
        this.#email = value;
    }

    get cep(){
        return this.#cep;
    }
    set cep(value){
        this.#cep = value;
    }

    get endereco(){
        return this.#endereco;
    }
    set endereco(value){
        this.#endereco = value;
    }

    get bairro(){
        return this.#bairro;
    }
    set bairro(value){
        this.#bairro = value;
    }

    get cidade(){
        return this.#cidade;
    }
    set cidade(value){
        this.#cidade = value;
    }

    get uf(){
        return this.#uf;
    }
    set uf(value){
        this.#uf = value;
    }

    get cursando(){
        return this.#cursando;
    }
    set cursando(value){
        this.#cursando = value;
    }

    get curso_id(){
        return this.#curso_id;
    }
    set curso_id(value){
        this.#curso_id = value;
    }

    static toMap(row){
        return new MatriculaEntity(row.mat_id, row.mat_nome, row.mat_data, row.mat_email, row.mat_cep, row.mat_endereco, row.mat_bairro, row.mat_cidade, row.mat_uf, row.mat_cursando, row.cur_id)
    }
    
    toJSON(){
        return {
            id: this.#id,
            nome: this.#nome,
            data: this.#data,
            email: this.#email,
            cep: this.#cep,
            endereco: this.#endereco,
            bairro: this.#bairro,
            cidade: this.#cidade,
            uf: this.#uf,
            cursando: this.#cursando,
            curso_id: this.#curso_id
        }
    }
}