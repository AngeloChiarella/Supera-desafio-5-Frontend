import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import contaFetch from '../../axios/config.js';
import "./Home.css";

const Home = () => {
  const [contas, setContas] = useState([]);
  const [nomePesquisado, setNomePesquisado] = useState('');
  const [contaPesquisada, setContaPesquisada] = useState(null);

  const getContas = async () => {
    try {
      const response = await contaFetch.get("/conta");
      const data = response.data;
      setContas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteById = async (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja deletar essa conta?")
    if (confirmacao) {
      try {
        await contaFetch.delete(`/conta/${id}`);
        alert("Deletado com sucesso!");
        getContas();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getContaByNome = async () => {
    try {
      const response = await contaFetch.get(`/conta/buscarNome/${nomePesquisado}`);
      const conta = response.data;
      setContas(conta);
      console.log(nomePesquisado)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContas();
  }, []);

  return (
    <div className='home'>
      <h1> Contas </h1>
      {contas.length === 0 ? (<p>Carregando...</p>) : (
        <>
          <div className="input-local">
            <input className="input" type="text" value={nomePesquisado} onChange={(e) => setNomePesquisado(e.target.value)} placeholder="Nome do titular" />
            <button className="btn" onClick={getContaByNome}>Buscar</button>
            <button className="btn" onClick={getContas}>Desfazer</button>
          </div>
          {contaPesquisada ? (
            <div className="conta">
              <h2>Nome: {contaPesquisada.nomeResponsavel}</h2>
              <p>Agencia: {contaPesquisada.agencia}</p>
              <p>Numero da conta: {contaPesquisada.numero}</p>
              <p>Saldo: {contaPesquisada.saldo}</p>
            </div>
          ) : (
            contas.map((conta) => (
              <div className="conta" key={conta.id}>
                <h2>Nome: {conta.nomeResponsavel}</h2>
                <p>Agencia: {conta.agencia}</p>
                <p>Numero da conta: {conta.numero}</p>
                <p>Saldo: {conta.saldo}</p>
                <div>
                  <Link to={"/transferencias" + "/" + conta.id} className='btn'>
                    Transferencias
                  </Link>
                  <button className="btn-del" onClick={() => deleteById(conta.id)}>Deletar</button>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Home;
