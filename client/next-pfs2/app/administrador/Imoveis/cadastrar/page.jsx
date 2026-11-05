
'use client'
import Botao from '@/app/components/botao';
import FormImovel from '@/app/components/formImovel';
import { useState, useEffect } from 'react'


export default function HomeCadastrar(){

    return (
        <div>
            <h1>Cadastro de Imóveis</h1>
            <FormImovel></FormImovel>
        </div>
    )

}