'use client'
import { ApiClient } from '@/utils/apiClient 1';
import { useRouter } from 'next/navigation';
import {createContext, useState, useEffect} from 'react'

const UsuarioContext = createContext();

export const UsuarioProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    async function carregarUsuario() {
        try {
            const r = await ApiClient.get('/login/cookie');
            if (r) {
                setUser(r);
            }else{
                router.replace('/')
            }
            setLoading(false)
        } catch (error) {
            console.error('Erro ao restaurar sessão:', error);
        }
    }
    useEffect(() => {
        carregarUsuario();
    }, []);

    return <UsuarioContext.Provider value={{user, setUser}}>
        {
            loading? <h1>Carregando sessão...</h1> : children
        }
    </UsuarioContext.Provider>
}

export default UsuarioContext;
