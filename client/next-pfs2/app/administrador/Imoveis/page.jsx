'use client'
import { ApiClient } from '@/utils/apiClient 1';
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
export default function HomeImoveis() {

    const [imovel, setImoveis] = useState([])

    async function carregarImoveis() {
        const resposta = await ApiClient.get('/imovel')
        if(resposta){
            setImoveis(resposta)
        }
    }

    async function exclude(id) {
        let r = await ApiClient.delete('/imovel/' + id)
        if(r){
            toast.success('Imovel excluido com sucesso')
            carregarImoveis()
        }
    }

    
    useEffect(() => {
        carregarImoveis()
    }, [])

    return (
        <>
        <div>
            <h1>Home Imóveis</h1>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Descrição</th>
                            <th>Bairro</th>
                            <th>CEP</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            imovel.map((value) => {
                                return <tr key={value.id}>
                                    <td>{value.id}</td>
                                    <td>{value.descricao}</td>
                                    <td>{value.bairro}</td>
                                    <td>{value.cep}</td>
                                    <td>{value.valor}</td>
                                    <td>
                                        <Link className='btn btn-primary' href={`/administrador/Imoveis/alterar/${value.id}`}><i className='fas fa-pen'></i></Link>
                                        <button onClick={() => exclude(value.id)} type="button" className='btn btn-danger'><i className='fas fa-trash'></i></button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <Link href="/administrador/Imoveis/cadastrar">Cadastrar</Link>
        </>
    )
}
