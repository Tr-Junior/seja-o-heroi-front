import React, {useState}from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from  'react-icons/fi';
import heroislogo from '../../assets/heroi5.png';
import api from '../../services/api';
import './styles.css';



export default function Novo(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId= localStorage.getItem('ongId');
    const history = useHistory();

   async function handleNovoIncidente(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };
        try{
            await api.post('incidents', data, {headers: {Authorization: ongId,}})
            history.push('/listagem');

        }catch(err){
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }

    return(
        <div className="incidente-conteiner">
            <div className="content">
                <section>
                <img src={heroislogo} alt="Seja o Herói"/>
                        <h1>Cadastrar novo caso</h1>
                        <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                        <Link className="back-link" to="/listagem">
                        <FiArrowLeft size={16} color="#3f48cc"/>Voltar para o início</Link>
                </section>
                <form action="" onSubmit={handleNovoIncidente}>
                        <input required placeholder="Título do caso" value={title} onChange={e => setTitle(e.target.value)}/>
                        <textarea required placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)}/>
                        <input required placeholder="Valor em reais" value={value} onChange={e => setValue(e.target.value)}/>
                        <button className="button" type="submit">Cadastrar</button>
                    </form>
            </div>
        </div>
    );
}