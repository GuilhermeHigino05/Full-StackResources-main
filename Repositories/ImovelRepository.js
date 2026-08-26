import Database from '../database/database.js';
import ImovelEntity from '../Entities/ImovelEntity.js';

export default class ImovelRepository {

    #db;
    constructor() {
        this.#db = new Database();
    }

    async Create(imovelEntity) {
        try {
            const query = 'insert into tb_imovel (id, description, cep, address, neighborhood, city, price, available) values (?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [imovelEntity.id, imovelEntity.description, imovelEntity.cep, imovelEntity.address, imovelEntity.neighborhood, imovelEntity.city, imovelEntity.price, imovelEntity.available];
            let id = await this.#db.ExecutaComandoLastInserted(query, values);
            if(id) {
                ImovelEntity.id = id;
                return true;
            }
            return false;
        } catch (error) {
            return 'Internal Server Error';
        }
    }

    async Read(){
        const query = 'select * from tb_imovel';
        let rows = await this.#db.ExecutaComando(query);
        if(rows.length > 0) {
            rows.forEach(element => {
                element = new ImovelEntity(element.id, element.description,
                        element.cep, element.address, element.neighborhood, 
                        element.city, element.price, element.available);
            });
        }
        return rows ? rows : [];
    }

    Update(imovelEntity){

    }
    Delete(id){

    }

}