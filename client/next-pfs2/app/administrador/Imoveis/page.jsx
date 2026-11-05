'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react'
export default function HomeImoveis() {

    const [imovel, setImoveis] = useState([])

    async function carregarImoveis() {
        let r = await fetch("http://localhost:5000/imovel", {
            method: 'GET'
        })
        let body = await r.json()
        console.log(body)
        setImoveis(body)
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