'use client'
import { ApiClient } from "@/utils/apiClient 1";
import { useRouter } from "next/navigation";
import { useContext, useRef } from 'react'
import { toast } from "react-hot-toast";
import UsuarioContext from "../context/userContext";


export default function HomeLogin() {
    const router = useRouter();
    const email = useRef(null);
    const senha = useRef(null);
    const {user, setUser} = useContext(UsuarioContext)
    async function Login() {
        if(email.current.value && senha.current.value){
            let obj = {
                email: email.current.value,
                senha: senha.current.value
            }
            let r = await ApiClient.post('/login', obj)
            if(r?.user){
                setUser(r.user);
                router.replace(r.user.perfil?.id ? '/administrador' : '/locatario');
            }
        }else{
            toast.error('Preencha todos os campos corretamente')
        }
    }
    return (
        <>
        <div>
            <h1>Home Login</h1>
            <div>
                <div className="form-group">
                    <label className="d-block" htmlFor="email">Email:</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="form-control"
                        ref={email}
                    />
                </div>
                <div className="form-group">
                    <label className="d-block" htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        name="senha"
                        id="senha"
                        className="form-control"
                        ref={senha}
                    />
                    <button type="button" className="btn btn-primary" onClick={Login}>Entrar</button>
                </div>
            </div>
        </div>
        </>
    )
}
