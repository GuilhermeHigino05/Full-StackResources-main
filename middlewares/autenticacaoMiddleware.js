import jwt from 'jsonwebtoken';
import UsuarioRepository from '../repositories/usuarioRepository.js';
const SEGREDO = "RUBYONRAILS"
export default class AutenticacaoMiddleware {


    gerarJWT(id, nome, email, perfilId) {
        let token = jwt.sign({id, nome, email, perfilId}, SEGREDO);
        return token;
    }

    async validar(req, res, next) {
        // let token = req.cookies['token-pfs2'];
        // //token precisa existir nas cookies da requisição!
        // if(token) {
        //     //verifica e decodifica o token com o nosso segredo
        //     let payload = jwt.verify(token, SEGREDO);
        //     let idUsuario = payload.id;
        //     let repo = new UsuarioRepository();
        //     //utiliza o id do payload para encontrar o usuário no banco
        //     let usuarioEncontrado = await repo.obterPorId(idUsuario);
        //     if(usuarioEncontrado){
        //         req.usuario = usuarioEncontrado;
                 next();
        //     }
        //     else{
        //         return res.status(404).json({msg: "Usuário não encontrado!"});
        //     }
        // }
        // else {
        //     return res.status(401).json({msg: "Token inexistente!"});
        // }
    }
}