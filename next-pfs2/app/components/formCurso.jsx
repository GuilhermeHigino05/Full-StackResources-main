"use client";

import { useRef } from "react";
import Botao from "./botao";

export default function FormCurso({ onCadastrar }) {
  const nome = useRef(null);
  const instrutor = useRef(null);
  const duracao = useRef(null);

  function Cadastrar(event) {
    event.preventDefault();

    onCadastrar(
      nome.current.value.trim(),
      instrutor.current.value.trim(),
      Number(duracao.current.value),
    );

    event.currentTarget.reset();
    nome.current.focus();
  }

  return (
    <form onSubmit={Cadastrar}>
      <h1>Cadastro de Cursos</h1>
      <div>
        <label htmlFor="nome-curso">Nome do curso:</label>
        <input ref={nome} id="nome-curso" name="nome" type="text" required />
      </div>
      <div>
        <label htmlFor="duracao-curso">Duração do curso (horas):</label>
        <input
          ref={duracao}
          id="duracao-curso"
          name="duracao"
          type="number"
          min="1"
          required
        />
      </div>
      <div>
        <label htmlFor="instrutor-curso">Instrutor:</label>
        <input
          ref={instrutor}
          id="instrutor-curso"
          name="instrutor"
          type="text"
          required
        />
      </div>
      <Botao texto="Cadastrar" tipo="normal" type="submit" />
    </form>
  );
}
