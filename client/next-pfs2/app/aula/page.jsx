'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Botao from '../components/botao';
import CursoContext from '../context/cursosContext';

export default function PaginaAula() {
  const { cursos, setCursos } = useContext(CursoContext);

  function excluir(id) {
    setCursos((cursosAtuais) => cursosAtuais.filter((curso) => curso.id !== id));
  }

  return (
    <main>
      <h1>Cursos cadastrados</h1>
      <Link href="/aula/cadastro">Cadastrar curso</Link>
      <hr />
      {cursos.length === 0 ? (
        <p>Nenhum curso cadastrado.</p>
      ) : (
        <ul>
          {cursos.map((curso) => (
            <li key={curso.id}>
              {curso.nome} — {curso.instrutor} — Duração: {curso.duracao} horas{' '}
              <Botao
                texto="Excluir"
                tipo="erro"
                funcao={() => excluir(curso.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
