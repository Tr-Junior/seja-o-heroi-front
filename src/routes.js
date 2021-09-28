import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Registro from './pages/Registro';
import Listagem from './pages/Listagem';
import Novo from './pages/Novo';


export default function Routes(){
    return(
        <BrowserRouter> 
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/cadastro" component={Registro}/>
                <Route path="/listagem" component={Listagem}/>
                <Route path="/incidentes/novo" component={Novo}/>


            </Switch>
        </BrowserRouter>
    )
}