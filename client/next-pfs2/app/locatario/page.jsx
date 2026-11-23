'use client';

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { ApiClient } from "@/utils/apiClient 1";
import UsuarioContext from "../context/userContext";

function formatarData(data) {
  if (!data) return "—";

  const dataConvertida = new Date(data);
  if (Number.isNaN(dataConvertida.getTime())) return data;

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeZone: "UTC",
  }).format(dataConvertida);
}

function formatarValor(valor) {
  const valorNumerico = Number(valor);
  if (!Number.isFinite(valorNumerico)) return valor;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valorNumerico);
}

export default function PageLocatario() {
  const [contratos, setContratos] = useState([]);
  const [contratoAberto, setContratoAberto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const { user } = useContext(UsuarioContext);

  useEffect(() => {
    let ativo = true;

    async function carregarContratos() {
      try {
        const resposta = await ApiClient.get("/locacao");
        if (ativo && Array.isArray(resposta)) {
          setContratos(resposta);
        }
      }
      catch (erro) {
        console.error("Erro ao carregar contratos:", erro);
      }
      finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarContratos();
    return () => {
      ativo = false;
    };
  }, []);

  function alternarContrato(id) {
    setContratoAberto((aberto) => (aberto === id ? null : id));
  }

  return (
    <main className="container-fluid py-4">
      <nav className="navbar navbar-expand navbar-light bg-primary topbar mb-4 static-top shadow">
        <div className="ml-auto text-white">
          Olá, {user?.nome ?? "locatário"}
        </div>
      </nav>

      <h1 className="text-center mb-4">Área do Locatário</h1>

      {carregando ? (
        <p className="text-center">Carregando suas locações...</p>
      ) : contratos.length > 0 ? (
        <section className="mx-auto" style={{ maxWidth: "1100px" }}>
          {contratos.map((contrato) => {
            const aberto = contratoAberto === contrato.id;

            return (
              <article className="card shadow-sm mb-3" key={contrato.id}>
                <h2 className="card-header m-0 p-0">
                  <button
                    type="button"
                    className="btn btn-link text-left text-decoration-none w-100 p-3"
                    onClick={() => alternarContrato(contrato.id)}
                    aria-expanded={aberto}
                  >
                    Contrato #{contrato.id}
                    {contrato.imovel?.descricao && ` — ${contrato.imovel.descricao}`}
                  </button>
                </h2>

                {aberto && (
                  <div className="card-body">
                    {contrato.imovel?.endereco && (
                      <p className="mb-3">{contrato.imovel.endereco}</p>
                    )}

                    <div className="table-responsive">
                      <table className="table table-striped table-bordered mb-0">
                        <thead>
                          <tr>
                            <th scope="col">Mês</th>
                            <th scope="col">Vencimento</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Pago</th>
                            <th scope="col">Pagamento</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(contrato.alugueis ?? []).map((aluguel) => (
                            <tr key={aluguel.id}>
                              <td>{aluguel.mes}</td>
                              <td>{formatarData(aluguel.vencimento)}</td>
                              <td>{formatarValor(aluguel.valor)}</td>
                              <td>{aluguel.pago === "S" ? "Sim" : "Não"}</td>
                              <td>
                                {aluguel.pago === "N" ? (
                                  <Link
                                    href={`http://localhost:5000/aluguel/pagar/${aluguel.id}`}
                                    className="btn btn-outline-primary btn-sm"
                                  >
                                    Pagar
                                  </Link>
                                ) : (
                                  <span>Pagamento já realizado!</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </section>
      ) : (
        <p className="text-center">Nenhuma locação realizada.</p>
      )}
    </main>
  );
}
