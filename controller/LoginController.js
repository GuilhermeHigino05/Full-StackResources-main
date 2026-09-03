import AuthMiddleware from "../middleware/AuthMiddleware.js";
import UserRepository from "../Repositories/UserRepository.js"


export default class LoginController {
    #userRepository

    constructor(){
        this.#userRepository = new UserRepository()
    }

    async validar(req, res){
        try{
            let {email, senha} = req.body;
            if(email && senha){
                let user = await this.#userRepository.obterPorEmailSenha(email, senha);
                if(user){
                    let middleware = new AuthMiddleware()
                    let token = middleware.gerarJWT(user.id, user.nome, user.email, user.perfil.id);
                    res.cookie('token-pfs2', token, { httpOnly: true });
                    return res.status(200).json({token:token})
                }else{
                    return res.status(404).json({msg: 'Usuario não encontrado'})
                }
            }else{
                return res.status(400).json({msg:'Email e senha incorretos'})
            }
        }catch(err){
            console.log(err)
            return res.status(500).json({msg: 'Internal server error'})
        }
    }
}