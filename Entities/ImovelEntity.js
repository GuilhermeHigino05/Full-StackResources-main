
export default class ImovelEntity {
    #id;
    #description;
    #cep;
    #address;
    #neighborhood;
    #city;
    #price;
    #available;
    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
    }
    get cep() {
        return this.#cep;
    }
    set cep(value) {
        this.#cep = value;
    }
    get address() {
        return this.#address;
    }

    set address(value) {
        this.#address = value;
    }

    get neighborhood() {
        return this.#neighborhood;
    }

    set neighborhood(value) {
        this.#neighborhood = value;
    }

    get city() {
        return this.#city;
    }

    set city(value) {
        this.#city = value;
    }

    get price() {
        return this.#price;
    }

    set price(value) {
        this.#price = value;
    }

    get available() {
        return this.#available;
    }

    set available(value) {
        this.#available = Number(value);
    }

    constructor(id, description, cep, address, neighborhood, city, price, available) {
        this.#id = id;
        this.#description = description;
        this.#cep = cep;
        this.#address = address;
        this.#neighborhood = neighborhood;
        this.#city = city;
        this.#price = price;
        this.available = available;
    }

    valid(){
        if(this.#description && this.#cep && this.#address && this.#neighborhood && this.#city && this.#price && [0, 1].includes(this.#available)){
            let endValid = this.address.split(",");
            if(endValid.length > 1 && !isNaN(endValid[1])){
                return true
            }
        }

        return false;
    }

    static toMap(row){
        return new ImovelEntity(row["imv_id"], row['imv_descricao'], row["imv_cep"], row["imv_endereco"], row["imv_bairro"], row["imv_cidade"], row["imv_valor"], row["imv_disponivel"]);
    }

    toJSON(){
        return {
            id: this.#id,
            description: this.#description,
            cep: this.#cep,
            address: this.#address,
            neighborhood: this.#neighborhood,
            city: this.#city,
            price: this.#price,
            available: this.#available
        }
    }  
}
