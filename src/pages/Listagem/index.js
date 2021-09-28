import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import heroislogo from '../../assets/heroi5.png';
import api from '../../services/api';
import './styles.css';




export default function Listagem(){
    const [incidentes, setIncidentes] = useState([]);
    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId= localStorage.getItem('ongId');
    

    

    if(ongId == null){
        localStorage.clear();
        history.push('/');

    }

    useEffect(()=>{
        api.get('profile', {headers: {Authorization: ongId,}
        }).then(response =>{setIncidentes(response.data)})
    }, [ongId]);

    async function handleDeletarIncidente(id){
        try{
            await api.delete(`incidents/${id}`,  {headers: {Authorization: ongId,}});
            setIncidentes(incidentes.filter(incidentes => incidentes.id !== id));
            alert('Caso deletado com sucesso.');
        }catch(err){
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    
    
    function handleSair(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="listagem-conteiner">
            <header>
                <img src={heroislogo} alt="Seja o Herói"/>
                <span>Bem Vindo, {ongName}</span>
                <Link className="button" to="incidentes/novo">Cadastrar novo caso</Link>
                <button type="butoon" onClick={handleSair}> <FiPower size={18} color="#3f48cc"/></button>
            </header>
            <h1>Casos cadastrados</h1>
            
            <ul>
                {incidentes.map(incidentes => (
                      <li key={incidentes.id}>
                      <strong>CASO:</strong>
                      <p>{incidentes.title}</p>
  
                      <strong>DESCRIÇÃO</strong>
                      <p>{incidentes.description}</p>
  
                      <strong>VALOR:</strong>
                      <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidentes.value)}</p>
                      <button onClick={() => handleDeletarIncidente(incidentes.id)} FiTrash2 size={20} color="#a8a8b3">< FiTrash2 size={20} color="#a8a8b3"/></button>
                  </li>
                ))}
            </ul>
        </div>
    );
}