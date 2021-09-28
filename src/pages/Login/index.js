import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import heroisimg from '../../assets/herois.png';
import heroislogo from '../../assets/heroi5.png';
import {FiLogIn} from 'react-icons/fi';
import api from '../../services/api';


export default function Login(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('sessions', {id});
            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/listagem');

        } catch (err){
            alert('Falha no login, tente novamente');
        }
    }

    return(
        <div className="login-container">
            <section className="form">
                <img src={heroislogo} alt="seja o heroi"/>
                <form action="" onSubmit={handleLogin}>
                    <h1>Faça seu Login</h1>
                    <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/cadastro">
                        <FiLogIn size={16} color="#3f48cc" />Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroisimg} alt="herois" sizes= "500px"/>
        </div>
    );
}