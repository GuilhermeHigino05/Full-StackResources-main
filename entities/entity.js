

export default class Entity {

    constructor() {

    }

    toJSON() {
        let props = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
        let json = {};
        //popular objeto com as propriedades do objeto que herda a entity
        for(let prop of props) {
            json[prop] = this[prop]
        }
        return json;
    }
}