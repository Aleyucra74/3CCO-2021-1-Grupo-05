import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Landing from 'pages/Landing';
import Profile from 'pages/Profile';
import Login2 from 'pages/Login2';
import Register from 'pages/Register';
import Freelancers from 'pages/Freelancers';
import ListaProjetos from 'pages/ListaProjetos';
import Projeto from 'pages/Projeto';
import Contrato from 'pages/Contrato';
import Cadastro from 'pages/Cadastro';
import Perfil from 'pages/Perfil';
import TestePersonalidade from 'pages/TestePersonalidade';
import Freelancer from 'pages/Freelancer';
import Results from 'pages/Results';
import Dashboard from 'pages/Dashboard';
import NotFound from 'pages/NotFound';

import StoreProvider from 'components/store/Provider';
import RoutesPrivate from 'components/routes/private/Private';

// Font Awesome Style Sheet
// import '@fortawesome/fontawesome-free/css/all.min.css';

// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';

function App() {
    return (
        <Router>
            <StoreProvider>
                <Switch>
                    <Route exact path="/" component={Landing} />                  
                    <Route exact path="/cadastro" component={Cadastro} />
                    <Route exact path="/login" component={Login2} />
                    <RoutesPrivate exact path="/freelancers" component={Freelancers} />
                    <RoutesPrivate exact path="/projetos" component={ListaProjetos} />
                    <RoutesPrivate exact path="/teste-personalidade" component={TestePersonalidade} />
                    <RoutesPrivate exact path="/results" component={Results} />
                    <RoutesPrivate exact path={`/freelancer/:id`} component={Freelancer} />
                    <RoutesPrivate exact path={`/projeto/:id`} component={Projeto} />
                    <RoutesPrivate exact path="/contrato/:id" component={Contrato} />
                    <RoutesPrivate exact path="/dashboard" component={Dashboard} />
                    {/* <Route exact path="*" component={NotFound}/> */}
                    <Route exact path="/perfil/sobre" render={(props) =>
                    <Perfil {...props} dono={true} />
                    }/>
                    <Route exact path="/perfil/personalidade" render={(props) =>
                    <Perfil {...props} dono={true} />
                    }/>
                    <Route exact path="/perfil/projetos" render={(props) =>
                    <Perfil {...props} dono={true} />
                    }/>
                    <Route exact path="/perfil/freelancers" render={(props) =>
                    <Perfil {...props} dono={true} />
                    }/>
                    <Route exact path="/perfil/ofertas" render={(props) =>
                    <Perfil {...props} dono={true} />
                    }/>
                    <Route exact path="/perfil/projetos-andamento" render={(props) =>
                    <Perfil {...props} dono={true} />
                    }/>
                    <Route exact path="/perfil/:userId/sobre" render={(props) =>
                    <Perfil {...props} dono={false} />
                    }/>
                    <Route exact path="/perfil/:userId/personalidade" render={(props) =>
                    <Perfil {...props} dono={false} />
                    }/>
                    <Route exact path="/perfil/:userId/projetos" render={(props) =>
                    <Perfil {...props} dono={false} />
                    }/>
                    <Route exact path="/perfil/:userId/freelancers" render={(props) =>
                    <Perfil {...props} dono={false} />
                    }/>
                    <Route exact path="/perfil/:userId/ofertas" render={(props) =>
                    <Perfil {...props} dono={false} />
                    }/>
                    <Redirect from="*" to="/login" />
                </Switch>
            </StoreProvider>
        </Router>
    );
}
export default App;
