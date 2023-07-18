import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import contaFetch from '../axios/config.js';
import "./FormTransferencia.css"

const FormuTransferencia = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [dataTransferencia, setDataTransferencia] = useState('');
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('');
    const [nomeOperadorTransacao, setNomeOperadorTransacao] = useState('');

    const tipos = ['SAQUE', 'TRANSFERENCIA', 'DEPOSITO'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const transferencia = {
            "dataTransferencia": dataTransferencia,
            "valor": valor,
            "tipo": tipo,
            "nomeOperadorTransacao": nomeOperadorTransacao,
            "contaId": id,
        };

        try {
            await contaFetch.post('/transferencias', transferencia);
            navigate("/")

            alert('Transferência adicionada com sucesso!');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="new-conta">
            <h2>Adicionar Transferência</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label>Data:</label>
                    <input
                        required
                        type="text"
                        value={dataTransferencia}
                        onChange={(e) => setDataTransferencia(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label>Valor:</label>
                    <input
                        required
                        type="text"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label>Nome do Operador:</label>
                    <input
                        required
                        type="text"
                        value={nomeOperadorTransacao}
                        onChange={(e) => setNomeOperadorTransacao(e.target.value)}
                    />
                </div>
                <div>
                    <label>Tipo:   </label>
                    <select className="box" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        {tipos.map((tipoValor) => (
                            <option key={tipoValor} value={tipoValor}>
                                {tipoValor}
                            </option>
                        ))}
                    </select>
                    <button className='btn-add' type="submit">Adicionar</button>
                </div>
            </form>
        </div>
    );
};

export default FormuTransferencia;

