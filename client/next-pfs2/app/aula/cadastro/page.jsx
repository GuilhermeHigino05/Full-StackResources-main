"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import FormCurso from "../../components/formCurso";
import CursoContext from "../../context/cursosContext";

export default function PaginaCadastro() {
    const [mensagem, setMensagem] = useState("");
    const { setCursos } = useContext(CursoContext);

    function cadastrar(nome, instrutor, duracao) {
        const curso = { id: Date.now(), nome, instrutor, duracao };
        setCursos((cursosAtuais) => [...cursosAtuais, curso]);
        setMensagem("Curso cadastrado com sucesso!");
    }

    return (
        <main>
        <FormCurso onCadastrar={cadastrar} />
        {mensagem && <p role="status">{mensagem}</p>}
        <Link href="/aula">Ver cursos cadastrados</Link>
        </main>
    );
}
