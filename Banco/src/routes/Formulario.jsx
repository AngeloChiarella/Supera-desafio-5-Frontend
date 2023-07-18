import contaFetch from '../axios/config'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Formulario.css'

const Formulario = () => {

  const navigate = useNavigate();

  const [nomeResponsavel, setNomeResponsavel] = useState()
  const [agencia, setAgencia] = useState()
  const [numero, setNumero] = useState()
  const [saldo, setSaldo] = useState()

  const criarConta = async (e) => {
    e.preventDefault();

    await contaFetch.post("/conta", {
      "nomeResponsavel": nomeResponsavel,
      "agencia": agencia,
      "numero": numero,
      "saldo": saldo
    })
    navigate("/")
    alert("Criado com sucesso!")
  };

  return <div className="new-conta">
    <h2>Criar conta</h2>
    <form onSubmit={(e) => criarConta(e)}>

      <div className="form-control">
        <label htmlFor="nomeResponsavel">Nome:</label>
        <input required type="text" name='nomeResponsavel' id='conta' placeholder='Digite o nome...'
          onChange={(e) => setNomeResponsavel(e.target.value)} />
      </div>

      <div className="form-control" >
        <label htmlFor="agencia">Agencia:</label>
        <input required type="number" name='agencia' id='conta' placeholder='Agencia (4 digitos) ...'
          maxLength={4}
          minLength={4}
          onChange={(e) => setAgencia(e.target.value)} />
      </div>

      <div className="form-control">
        <label htmlFor="numero">Numero:</label>
        <input required type="number" name='numero' id='conta' placeholder='Numero da conta (6 digitos)...'
          maxLength={6}
          minLength={6}
          onChange={(e) => setNumero(e.target.value)} />
      </div>

      <div className="form-control">
        <label htmlFor="saldo">Saldo:</label>
        <input required type="number" name='saldo' id='conta' placeholder='Saldo da conta (duas casas decimais)...'
          onChange={(e) => setSaldo(e.target.value)} />
      </div>

      <input required type="submit" value="Criar conta" className='btn' />
    </form>
  </div>
}

export default Formulario