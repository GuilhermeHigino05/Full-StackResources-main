import jwt from 'jsonwebtoken'
const SECRET = 'RUBYONRAILS'
export default class AuthMiddleware{
    gerarJWT(id, nome, email, perfilId){
        let token = jwt.sign({id, nome, email, perfilId}, SECRET)
        return token
    }

    async validar(req, res, next) {
        
    }
}