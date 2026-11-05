'use client'
import {useRef} from 'react'
import Botao from './botao';
import Link from 'next/link';
export default function FormImovel() {


    let descricao = useRef('')
    let endereco = useRef('')
    let bairro = useRef('')
    let cep = useRef('')
    let cidade = useRef('')
    let valor = useRef('')
    let disponivel = useRef('')
    async function Cadastrar()
    {
        let obj = {
            descricao: descricao.current.value,
            endereco: endereco.current.value,
            bairro: bairro.current.value,
            cep: cep.current.value,
            cidade: cidade.current.value,
            valor: valor.current.value,
            disponivel: disponivel.current.checked ? 'S' : 'N'
        }
        if(!obj.descricao || !obj.endereco || !obj.bairro || !obj.cep || !obj.cidade || !obj.valor)
        {
            alert("Preencha todos os campos obrigatórios!")
            return
        }
        let r = await fetch('http://localhost:5000/imovel', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj)
        })
    }

    return (<div>
        <h1>Fomulario</h1>
        <div className="form-control">
        <form>
        <div className="form-group">
            <label htmlFor="descricao">Descricao:</label>
            <input
                type="text"
                name="descricao"
                id="descricao"
                ref={descricao}
            />
        </div>

        <div className="form-group">
            <label htmlFor="endereco">endereco:</label>
            <input
                type="text"
                name="endereco"
                id="endereco"
                ref={endereco}
            />
        </div>

        <div className="form-group">
            <label htmlFor="cidade">cidade:</label>
            <input
                type="text"
                name="cidade"
                id="cidade"
                ref={cidade}
            />
        </div>

        <div className="form-group">
            <label htmlFor="CEP">CEP:</label>
            <input
                type="number"
                name="CEP"
                id="CEP"
                ref={cep}
            />
        </div>

        <div className="form-group">
        <label htmlFor="valor">valor:</label>
        <input
            type="number"
            name="valor"
            id="valor"
            ref={valor}
        />
        </div>
        
        <div className="form-group">
            <label htmlFor="bairro">Bairro:</label>
            <input
                type="text"
                name="bairro"
                id="bairro"
                ref={bairro}
            />
        </div>

        <div className="form-group">
            <label htmlFor="disponivel">Disponível:</label>
            <input
                type="checkbox"
                name="disponivel"
                id="disponivel"
                ref={disponivel}
            />
        </div>
        <Botao texto='Gravar' funcao={Cadastrar}></Botao>
        <Link href="/administrador/Imoveis">Voltar</Link>
        </form>
    </div>
    </div>
    )
}
