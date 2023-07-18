import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import contaFetch from '../axios/config.js';
import "./Transferencias.css";

const Transferencias = () => {
  const { id } = useParams();
  const [transferencias, setTransferencias] = useState([])

  useEffect(() => {

    const fetchData = getByContaId(id, setTransferencias);
    fetchData();
  }, [id]);

  return (
    <div className='transferencias'>
       <ul>
          <li>
            <Link to={`/newTransferencia/${id}`} className="new-btn-t">Nova Transferencia</Link>
          </li>
        </ul>
      <h1> Transferencias </h1>
      {transferencias.length === 0 ? <p>Sem transferencias para essa conta...</p> : (
        transferencias.map((transferencia) => (
          <div className="transferencia" key={transferencia.id}>
            <h2>Operador: {transferencia.nomeOperadorTransacao}</h2>
            <p>Tipo: {transferencia.tipo}</p>
            <p>Quantia: {transferencia.valor}</p>
            <p>Data: {transferencia.dataTransferencia}</p>
            <p>Saldo: {transferencia?.saldo}</p>
          </div>
        ))
      )}
    </div>
  );

}

export default Transferencias

function getByContaId(id, setTransferencias) {
  return async () => {
    try {
      const response = await contaFetch.get(`/transferencias/buscarContaId/${id}`);
      const data = response.data;
      console.log(data);
      setTransferencias(data);
    } catch (error) {
      console.log(error);
    }
  };
}
