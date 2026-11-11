

export default function Botao({ texto, funcao, tipo = 'normal', type = 'button' }) {
    return (
        <button
            type={type}
            className={`btn ${tipo === 'erro' ? 'btn-danger' : 'btn-primary'}`}
            onClick={typeof funcao === 'function' ? funcao : undefined}
        >
            {texto}
        </button>
    );
}
