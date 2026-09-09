import jwt from 'jsonwebtoken'
import UserRepository from '../Repositories/UserRepository.js';
const SECRET = 'RUBYONRAILS'
export default class AuthMiddleware{
    gerarJWT(id, nome, email, perfilId){
        let token = jwt.sign({id, nome, email, perfilId}, SECRET)
        return token
    }

    async validar(req, res, next) {
        let token = req.cookies['token-pfs2'];
        if (token){
            let payload = jwt.verify(token, SECRET);
            let id = payload.id;
            let repo = new UserRepository();
            if( await repo.GetById(id) ){
                req.user = payload.id
                next();
            }else{
                return res.status(404).json({msg: 'Usuario não encontrado'})
            }
        }else{
            return res.status(401).json({msg: 'Token inexistente'})
        }
    }
}

