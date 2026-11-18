'use client'
import { ApiClient } from '@/utils/apiClient 1';
import {createContext, useState, useEffect} from 'react'

const UsuarioContext = createContext();

export const UsuarioProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregarUsuario() {
            try {
                const r = await ApiClient.get('/login/cookie');
                if (r) {
                    setUser(r);
                }
            } catch (error) {
                console.error('Erro ao restaurar sessão:', error);
            } finally {
                setCarregando(false);
            }
        }

        carregarUsuario();
    }, []);

    return <UsuarioContext.Provider value={{user, setUser}}>
        {
            carregando ? <h1>Carregando sessão...</h1> : children
        }
    </UsuarioContext.Provider>
}

export default UsuarioContext;
