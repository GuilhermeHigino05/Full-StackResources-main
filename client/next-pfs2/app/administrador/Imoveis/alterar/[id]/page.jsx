'use client'
import FormImovel from "@/app/components/formImovel";
import { ApiClient } from "@/utils/apiClient 1";
import {use, useState, useEffect} from 'react'

export default function AlterarImovel({params}){
    const [imovelAlt, setiImovelAlt] = useState(null)
    const {id} = use(params)
    async function carregarImoveis() {
        let r = await ApiClient.get('/imovel/' + id)
        if(r){
            //forçar renderização para enviar os dados do imóvel ao componente via props
            setiImovelAlt(r)
        }
    }

    useEffect(() => {
        carregarImoveis()
    }, [])
    return (
        <>
            <div>
                <h1>Alterar Imovel ({id})</h1>
                {
                    imovelAlt == null ? <p>Carregando</p> : <FormImovel imovel={imovelAlt}></FormImovel>
                }
                
            </div>
        </>
    )
}