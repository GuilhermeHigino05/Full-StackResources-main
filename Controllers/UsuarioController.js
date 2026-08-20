    let usuarios = [
        {
            id:1,
            nome:"Guilherme",
            email:"guilherme@email.com",
            nivelAcesso:"adm",
            UrlFotoPerfil:"Foto",
            celular:"18991919991"
        }
    ]

export default class UsuarioController{
    Create(req,res){
        try{
            let {nome, email, nivelAcesso, UrlFotoPerfil, celular} = req.body
            if(nome && email && nivelAcesso && UrlFotoPerfil && celular){
                let novoUser = {id: Date.now(), nome: nome, email: email, nivelAcesso: nivelAcesso, UrlFotoPerfil: UrlFotoPerfil, celular:celular}
                usuarios.push(novoUser);
                return res.status(201).json({msg: 'Usuario criado com sucesso'});

            }else{
                return res.status(400).json({msg:'Inputs invalídos'});
            }
        }catch(error){
            res.status(500).json({msg: 'Internal server error'})
        }

    }

    Read(req,res){
        try{
            return res.status(200).json(usuarios)
        }catch(error){
            res.status(500).json({msg: 'Internal server error'})
        }
    }
    Update(req,res){
        try{
            let {id, nome, email, nivelAcesso, UrlFotoPerfil, celular} = req.body
            if(nome && email && nivelAcesso && UrlFotoPerfil && celular){
                let user = usuarios.find(x => x.id == id);
                if(user){
                    user.nome = nome
                    user.email = email
                    user.nivelAcesso = nivelAcesso
                    user.UrlFotoPerfil = UrlFotoPerfil
                    user.celular = celular
                     return res.status(200).json(user);
                }else{
                    return res.status(204).json({msg: 'Usuario nao encontrado'})
                }
            }else{
                return res.status(400).json({msg: 'Infromações invalidas'})
            }
        }catch(error){
            res.status(500).json({msg: 'Internal server error'})
        }
    }
    Delete(req,res){
        try{
            let id = req.params.id
            if(id){
                let user = usuarios.find(x => x.id == id);
                usuarios = usuarios.filter(x => x.id != id);
                return res.status(200).json(usuarios)
            }else{
                return res.status(204).json({msg: 'Usuario nao encontrado'})
            }
        }catch(error){
            res.status(500).json({msg: 'Internal server error'})
        }
    }
}