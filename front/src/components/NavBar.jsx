import {React, useContext} from 'react';
import StoreContext from '../components/Store/Context';

import LogoPrincipal from '../images/logo.png';
import { Twitter, Instagram, Facebook } from 'react-feather';

import {Link, useHistory} from 'react-router-dom';

import '../styles/components/NavBar.css';

function NavBar(props){
    const history = useHistory();
    const {token} = useContext(StoreContext);

    const botaoLogin = () =>{
        return (
          <>
            <Link to="/login">
                <a className="selected">Login/Cadastre-se</a>
            </Link>
          </>
        )
    }

    const botaoLogout = () =>{
        
        // AO SER CHAMADO RESETA  OS DADOS DA SESSION
        const Logout = () => {
            localStorage.removeItem("token");
            history.push("/login");
            sessionStorage.clear();
            // window.location.reload();
            history.go(0);
        }
       
        return (
          <>
            <Link to="/perfil">
                <a className="selected">Perfil</a>
            </Link>
            <button className="buttonLogout" onClick={Logout}>Logout</button>
          </>
        )
    }

    const Projetos = () => {
        return (
            <>
                <Link to="/search-projects">
                    <a className="">Projetos</a>
                </Link>
            </>
        )
    }

    const Empresas = () => {
        return (
            <>
                <Link to="/empresas">
                    <a className="">As Empresas</a>
                </Link>
            </>
        )
    }

    const Ofertas = () => {
        return (
            <>
                <li>
                    <Link to="/search-offer">
                        <a className="">Ofertas</a>
                    </Link>
                </li>
            </>
        )
    }

    return(
            <nav className="navbar-blurred container" >
                <img onClick={() => { history.push("/")}} src={LogoPrincipal} alt="logo do projeto hireit" />
                <div className="items">
                    <ul>
                        <li>
                            <Link to="/nosconheca">
                                <a>Nos conheça</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Nuvemword">
                                <a>Em alta</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/freelancer">
                                <a>Os Freelancers</a>
                            </Link>
                        </li>
                        <li>
                            {!token ?
                                Empresas() :
                                Projetos()
                            }
                        </li>
                        {token ? Ofertas() : null}
                        <li>
                            {/* SE O TOKEN NAO EXISTIR MOSTRA A FUNCAO BOTAOLOGIN() */}
                            {/* SE EXISTIR MOSTRA A FUNCAO BOTAOLOGOUT() */}
                            {!token ? 
                                botaoLogin() :
                                botaoLogout() 
                            }
                        </li>
                    </ul>
                </div>
            </nav>
    )

}

export default NavBar;