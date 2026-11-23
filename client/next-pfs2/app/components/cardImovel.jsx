import { toast } from "react-hot-toast";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import UsuarioContext from "../context/userContext";
import { ApiClient } from "@/utils/apiClient 1";

export default function CardImovel({ imovel }) {
  const { user } = useContext(UsuarioContext);
  const router = useRouter();

  async function locar() {
    if (user == null) {
      toast.error("Você precisa fazer login primeiro");
      return;
    }

    const r = await ApiClient.post("/locacao", { idImovel: imovel.id });
    if (r) {
      toast.success("Imóvel locado com sucesso");
      router.push("/locatario");
    }
  }

  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img src="img/user.png" className="card-img-top" alt="CELSON" />
        <div className="card-body">
          <h5 className="card-title">{imovel.descricao}</h5>
          <p className="card-text">R$ {imovel.valor}</p>
          <button type="button" onClick={() => {locar()}} className="btn btn-primary">
            Alugar
          </button>
        </div>
      </div>
    </div>
  );
}
