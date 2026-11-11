'use client'
import {useRef, useState,useEffect} from 'react'
import Botao from './botao';
import Link from 'next/link';
import { ApiClient } from '@/utils/apiClient 1';
import toast from 'react-hot-toast'

import { useRouter } from 'next/navigation';
export default function FormImovel({ imovel }) {

    const router = useRouter()
    let descricao = useRef('')
    let endereco = useRef('')
    let bairro = useRef('')
    let cep = useRef('')
    let cidade = useRef('')
    let valor = useRef('')
    let disponivel = useRef('')
    const [alterar,setAlterar] = useState(false)
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
        let r = await ApiClient.post('/imovel', obj)
        if(r){
            toast.success('Imovel cadastrado com sucesso') 
            router.push('/administrador/Imoveis')
        }
    }

    async function alterar() {
        
    }

    useEffect(() => {
        setAlterar(true)
        // preencher as refs
    },[])
    return (<div>
        <h1>Formulário</h1>
        <div>
        <form>
        <div className="form-group">
            <label className="d-block" htmlFor="descricao">Descrição:</label>
            <input
                type="text"
                name="descricao"
                id="descricao"
                className="form-control"
                ref={descricao}
            />
        </div>

        <div className="form-group">
            <label className="d-block" htmlFor="endereco">Endereço:</label>
            <input
                type="text"
                name="endereco"
                id="endereco"
                className="form-control"
                ref={endereco}
            />
        </div>

        <div className="form-group">
            <label className="d-block" htmlFor="cidade">Cidade:</label>
            <input
                type="text"
                name="cidade"
                id="cidade"
                className="form-control"
                ref={cidade}
            />
        </div>

        <div className="form-group">
            <label className="d-block" htmlFor="CEP">CEP:</label>
            <input
                type="number"
                name="CEP"
                id="CEP"
                className="form-control"
                ref={cep}
            />
        </div>

        <div className="form-group">
        <label className="d-block" htmlFor="valor">Valor:</label>
        <input
            type="number"
            name="valor"
            id="valor"
            className="form-control"
            ref={valor}
        />
        </div>
        
        <div className="form-group">
            <label className="d-block" htmlFor="bairro">Bairro:</label>
            <input
                type="text"
                name="bairro"
                id="bairro"
                className="form-control"
                ref={bairro}
            />
        </div>

        <div className="form-group form-check">
            <input
                type="checkbox"
                name="disponivel"
                id="disponivel"
                className="form-check-input"
                ref={disponivel}
            />
            <label className="form-check-label" htmlFor="disponivel">Disponível</label>
        </div>
        <Botao texto='Gravar' funcao={alterar? alterar : Cadastrar}></Botao>
        <Link className="btn btn-secondary ml-2" href="/administrador/Imoveis">Voltar</Link>
        </form>
    </div>
    </div>
    )
}
