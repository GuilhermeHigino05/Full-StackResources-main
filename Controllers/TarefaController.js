let tarefas = [
    {
        id: 1,
        nome: 'Vai Corinthians'
    },
    {
        id:2,
        nome: 'Jogar Bola'
    }
]

export default class TarefaController {
 
    Create(req,res){
        let {nome} = req.body

        if(nome){
            //Grava o nome 
            let novaTarefa = {id: Date.now(), nome: nome}
            tarefas.push(novaTarefa);
            return res.status(201).json(novaTarefa)
        }else{
            return res.status(400).json({msg: 'O parâmetro nome não foi enviado na requisição!'})
        }
    }

    Read(req,res){
        return res.status(200).json(tarefas)
    }

    Update(req,res){   
        let {id, nome} = req.body
        if(id && nome){
            let task = tarefas.find(update => update.id === id)
            if(task){
                task.nome = nome
                return res.status(200).json(task);
            }else{
                return res.status(404).json({msg: 'Tarefa não encontrada!'})
            }
        }else{
            return res.status(400).json({msg: 'Os parâmetros id e nome não foram enviados na requisição!'})
        }

    }

    Delete(req,res){
        const id = req.params.id
        const taskExists = tarefas.find(x => x.id == id)

        if(!taskExists){
            return res.status(404).json({ msg: 'Tarefa não encontrada!' })
        }

        tarefas = tarefas.filter(x => x.id != id)
        return res.status(200).json(tarefas)
    }

    GetById(req, res){
        try{
            let id = req.params.id
            let task = tarefas.filter(x => x.id == id);
            if(task.length == 0){
                return res.status(404).json({ msg: 'Tarefa não encontrada!' })
            }   
            return res.status(200).json(task);
        } catch(error){
            return res.status(500).json({msg: 'Erro interno no servidor'})
        }
    }
}