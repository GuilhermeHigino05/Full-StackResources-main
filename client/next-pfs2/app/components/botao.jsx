

export default function Botao({ texto, funcao, tipo = 'normal', type = 'button' }) {
    return (
        <button
            type={type}
            style={{ color: tipo === 'erro' ? 'red' : 'green', backgroundColor: 'white' }}
            onClick={typeof funcao === 'function' ? funcao : undefined}
        >
            {texto}
        </button>
    );
}
