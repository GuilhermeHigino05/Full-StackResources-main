'use client'
import { ApiClient } from '@/utils/apiClient 1';
import { useEffect, useState } from 'react'

export default function HomeUsuarios() {
    const [users, setUsers] = useState([])
    async function getUsers(){
        let r = await ApiClient.get('/usuario')
        if(r){
            setUsers(r)
        }
    }
    useEffect(() => {
        getUsers()
    }, [])
    return (
        <>
        <div>
            <h1>Home Usuários</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                        <th>E-MAIL</th>
                        <th>ATIVO</th>
                        <th>PERFIL</th>
                    </tr>
                </thead>
                <tbody>
                
                    {
                        users.map((value) => {
                            return <tr key={value.id}>
                                <td>{value.id}</td>
                                <td>{value.nome}</td>
                                <td>{value.email}</td>
                                <td>{value.ativo}</td>
                                <td>{value.perfil?.id}</td>
                            </tr>
                        })
                    }
                
                </tbody>
            </table>
        </div>
        </>
    );
}