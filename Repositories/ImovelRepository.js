import Database from '../database/database.js';
import ImovelEntity from '../Entities/ImovelEntity.js';

export default class ImovelRepository {

    #db;
    constructor() {
        this.#db = new Database();
    }

    async Create(imovelEntity) {
        const query = 'insert into tb_imovel (imv_id, imv_descricao, imv_cep, imv_endereco, imv_bairro, imv_cidade, imv_valor, imv_disponivel) values (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [imovelEntity.id, imovelEntity.description, imovelEntity.cep, imovelEntity.address, imovelEntity.neighborhood, imovelEntity.city, imovelEntity.price, imovelEntity.available];
        let id = await this.#db.ExecutaComandoLastInserted(query, values);
        if(id) {
            ImovelEntity.id = id;
            return true;
        }
        return false;

    }

    async Read(){
        const query = 'select * from tb_imovel';
        let rows = await this.#db.ExecutaComando(query);
        let list = [];
        if(rows.length > 0) {
            for(let row of rows) {
                list.push(ImovelEntity.toMap(row));
            }
        }
        return list;

    }

    async Update(imovelEntity){
        let query = 'update tb_imovel set imv_descricao = ?, imv_cep = ?, imv_endereco = ?, imv_bairro = ?, imv_cidade = ?, imv_valor = ?, imv_disponivel = ? where imv_id = ?';
        let values = [imovelEntity.description, imovelEntity.cep, imovelEntity.address, imovelEntity.neighborhood, imovelEntity.city, imovelEntity.price, imovelEntity.available, imovelEntity.id];
        let res = await this.#db.ExecutaComando(query, values);
        return res? true : false
    }
    async Delete(id){
        let query = 'delete from tb_imovel where imv_id = ?';
        let value = [id];
        let res = await this.#db.ExecutaComandoNonQuery(query, value);
        return res? true : false

    }
    async GetById(id){
        let query = 'select * from tb_imovel where imv_id = ?';
        let value = [id];
        let res = await this.#db.ExecutaComando(query, value);
        if(res.length > 0){
            return ImovelEntity.toMap(res[0]);
        }
        return null;
    }

    toJson(imovelEntity){
        return {
            id: imovelEntity.id,
            description: imovelEntity.description,
            cep: imovelEntity.cep,
            address: imovelEntity.address,
            neighborhood: imovelEntity.neighborhood,
            city: imovelEntity.city,
            price: imovelEntity.price,
            available: imovelEntity.available
        }
    }  

}