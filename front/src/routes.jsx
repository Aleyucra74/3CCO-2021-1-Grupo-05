import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import CriarProposta from './pages/CriarProposta';
import SearchProjects from './pages/SearchProjects';
import Projeto from './pages/Projeto';
import NosConheca from './pages/NosConheca';
import Freelancer from './pages/Freelancer';
import Cadastro from './pages/Cadastro';
import TestePersonalidade from './pages/TestePersonalidade';
import Empresas from './pages/Empresas';
import Perfil from './pages/Perfil';
import Nuvemword from './pages/Nuvemword';

import StoreProvider from './components/Store/Provider';
import RoutesPrivate from './components/Routes/Private/Private';
import Home from './pages/Home';
import CriarOferta from './pages/CriarOferta';
import SearchOffer from './pages/SearchOffer';

function Routes() {
    
    return (

        <Router>
            {/* <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/criar-proposta" component={CriarProposta}/>
                <Route exact path="/search-projects" component={SearchProjects}/>
                <Route exact path="/projeto" component={Projeto}/>
                <Route exact path="/NosConheca" component={NosConheca}/>
            </Switch> */}
            <StoreProvider>
                <Switch>
                    {/* ROTAS QUE NAO PRECISAM DE AUTENTICACAO */}
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/cadastro" component={Cadastro}/>
                    <Route exact path="/empresas" component={Empresas}/>
                    <Route exact path="/nosconheca" component={NosConheca}/>
                    <Route exact path="/freelancer" component={Freelancer}/>
                    <Route exact path="/Nuvemword" component={Nuvemword}/>

                    {/* ROTAS QUE PRECISAM DE AUTENTICACAO - FAZER LOGIN 
                        EMAIL: luan.brito@outlook.com
                        SENHA: asd
                    */}
                    <RoutesPrivate exact path="/teste-personalidade" component={TestePersonalidade}/>
                    <RoutesPrivate exact path="/criar-proposta" component={CriarProposta}/>
                    <RoutesPrivate exact path="/criar-oferta" component={CriarOferta}/>
                    <RoutesPrivate exact path="/search-projects" component={SearchProjects}/>
                    <RoutesPrivate exact path="/search-offer" component={SearchOffer}/>
                    <RoutesPrivate exact path={`/projeto/:id`} component={Projeto}/>
                    {/* <RoutesPrivate exact path="/cadastro" component={Cadastro}/> */}

                    <RoutesPrivate exact path="/perfil" component={Perfil}/>
                </Switch>
            </StoreProvider>
        </Router>

    )

}

export default Routes;