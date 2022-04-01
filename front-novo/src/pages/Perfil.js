import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import 'boxicons'

import '../assets/styles/global.css'
import '../assets/styles/perfil.css'

import capa from '../assets/img/perfil/b3-capa.jpg'
import imagem from '../assets/img/no-user.jpg'

import ServicesNavbar from "components/ServicesNavbar"
import Button from "components/button/Button"
import CardAvaliacao from "components/cardAvaliacao/CardAvaliacao"

import Sobre from "components/perfil/Sobre"
import Projetos from "components/perfil/Projetos"
import Personalidade from 'components/perfil/Personalidade'
import Freelancers from 'components/perfil/Freelancers'
import Ofertas from 'components/perfil/Ofertas'
import ProjetosAndamento from 'components/perfil/ProjetosAndamento'

import api from '../api';

export default function Perfil(props) {
    let idUsuario;
    let token = sessionStorage.getItem('@Hireit/token');
    
    let basepath = "/perfil"
    let location = useLocation().pathname;
    let locationVet = location.split("/")
    location = locationVet[locationVet.length-1];
    
    let [usuario, setUsuario] = useState({
        nome: "Seu Nome",
        classificacao: 0.0,
        cidade: "Cidade",
        uf: "UF",
        descricao: "",
        unchange: true
    });
    let [contato, setContato] = useState({
        linkedin: ["",""],
        github: ["",""],
        site: ["",""],
        semContato: true
    });

    if(locationVet.length === 4){
        basepath = "/perfil/" + locationVet[2]
    }

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };

    if(props.dono){
        idUsuario = parseJwt(token).sub;
    }else{
        idUsuario = locationVet[2]
    }

    async function getUserData(){
        await api.get(`/usuarios/${idUsuario}`,  {
            headers: {
              Authorization: 'Bearer ' + token 
            }
        })
        .then(response => {
            if(response.status === 200){
                setUsuario({...usuario,
                    nome: response.data.nome,
                    classificacao: response.data.classificacao,
                    cidade: response.data.localizacao.cidade,
                    uf: response.data.localizacao.uf,
                    descricao: response.data.descricao
                })
                console.log(response.data);
            }
        }).catch( error => {
            console.log(error);
        })
    }

    async function getContatoData(){
        await api.get(`/contatos/${idUsuario}`,  {
            headers: {
              Authorization: 'Bearer ' + token 
            }
        })
        .then(response => {
            if(response.status === 200){
                let linkedin = []
                let github = []
                let site = []
                
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].plataformaTable.idPlataforma === 1){
                        github.push(response.data[i].link)
                        github.push(response.data[i].pathVariable)
                    } else if(response.data[i].plataformaTable.idPlataforma === 2){
                        linkedin.push(response.data[i].link)
                        linkedin.push(response.data[i].pathVariable)
                    } else if(response.data[i].plataformaTable.idPlataforma === 3){
                        site.push(response.data[i].link)
                        site.push(response.data[i].pathVariable)
                    }
                }

                setContato({...contato,
                    linkedin: linkedin,
                    github: github,
                    site: site,
                    semContato: false
                })
            }
        }).catch( error => {
            console.log(error);
        })
    }

    useEffect(() => {
        getUserData()
        getContatoData()
    }, [usuario.unchange])

    return <>
        <ServicesNavbar />
        <div className="container">
            <div className="w75 section-one">
                <div className="box-banner-perfil">
                    <div className="banner-perfil">
                        <div className="capa-perfil" style={{backgroundColor: "#B4F6FF"}}>
                            {/* <img src={capa} /> */}
                        </div>
                        {props.dono === true ?
                            <div className="edit-button">
                                <button>
                                    <box-icon type='solid' name='edit-alt' color='#FFF' size="28px"></box-icon>
                                </button>
                            </div> : ""
                        }
                        <div className="informacoes-perfil">
                            <div className="div-img w20">
                                <img src={imagem} />
                            </div>
                            <div className="texto-informacoes-perfil w30">
                                <p className="nome-perfil">{usuario.nome}</p>
                                <p className="classificacao-perfil"><span>{usuario.classificacao}<box-icon type='solid' name='star' color='#F4C344' size="14px"></box-icon></span> - Ver avaliações</p>
                            </div>
                            {props.dono === true ? 
                                <div className="div-botao-perfil w50">
                                    <Button text="Editar perfil" width="180"></Button>
                                </div> : ""
                            }
                            <div className="clear"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w25 section-one">
                <div className="box-localizacao-perfil">
                    <div className="localizacao-perfil">
                        <p className="titulo-perfil">Localização</p>
                        <p className="texto-perfil">{usuario.cidade} - {usuario.uf}</p>
                    </div>
                </div>
                <div className="box-contato-perfil">
                    <div className="contato-perfil">
                        <p className="titulo-perfil">Contato</p>
                        {
                            contato.linkedin[1] != "" ? <p className="texto-perfil"><box-icon name='linkedin-square' type='logo' color="#53575B"></box-icon>/{contato.linkedin[1]}</p> : ""
                        }
                        {
                            contato.github[1] != "" ? <p className="texto-perfil"><box-icon name='github' type='logo' color="#53575B"></box-icon>/{contato.github[1]}</p> : ""
                        }
                        {
                            contato.site[1] != "" ? <p className="texto-perfil"><box-icon name='world' color="#53575B"></box-icon>{contato.site[1]}</p> : ""
                        }  
                        {
                            contato.semContato ? <p className="texto-perfil" style={{paddingTop: "8px"}}>Usuário não possui contatos disponiveis</p> : ""
                        }              
                    </div>
                </div>
            </div>
            <div className="w75 section-two">
                <div className="box-pages-perfil">
                    <div className="pages-perfil">
                        <div className="header-pages-perfil">
                            <Link to={basepath + "/sobre"} className={
                                location === "sobre" ? "selected" : ""
                            }>
                                <span>Sobre</span>
                            </Link>
                            <Link to={basepath + "/personalidade"} className={
                                location === "personalidade" ? "selected" : ""
                            }>
                                <span>Personalidade</span>
                            </Link>
                            <Link to={basepath + "/projetos"} className={
                                location === "projetos" ? "selected" : ""
                            }>
                                <span>Projetos concluidos</span>
                            </Link>
                            <Link to={basepath + "/freelancers"} className={
                                location === "freelancers" ? "selected" : ""
                            }>
                                <span>Freelancers contratados</span>
                            </Link>
                            <Link to={basepath + "/ofertas"} className={
                                location === "ofertas" ? "selected" : ""
                            }>
                                <span>Ofertas</span>
                            </Link>
                            {
                                props.dono === true ? <Link to={basepath + "/projetos-andamento"} className={
                                location === "projetos-andamento" ? "selected" : ""
                            }>
                                <span>Projetos em andamento</span>
                            </Link> : ""
                            }
                            
                        </div>
                        {
                            (() => {
                                switch (location) {
                                    case "sobre":
                                        return (<Sobre descricao={usuario.descricao}/>);
                                    case "personalidade":
                                        return (<Personalidade idUsuario={idUsuario} token={token} />)
                                    case "projetos":
                                        return (<Projetos idUsuario={idUsuario} token={token} />)
                                    case "freelancers":
                                        return (<Freelancers idUsuario={idUsuario} token={token} />)
                                    case "ofertas":
                                        return (<Ofertas idUsuario={idUsuario} token={token}/>)
                                    case "projetos-andamento":
                                        return (<ProjetosAndamento idUsuario={idUsuario} token={token}/>)
                                }
                            })()
                        }
                    </div>
                </div>
            </div>
            <div className="w25 section-two">
                <div className="box-avaliacoes-perfil">
                    <div className="avaliacoes-perfil">
                        <div className="info-avalicoes-perfil">
                            <p className="avaliacao-titulo-perfil" style={{ float: "left" }}>Avaliações</p>
                            <a href="#">Ver mais</a>
                            <div className="clear"></div>
                        </div>
                        <div>
                            <CardAvaliacao />
                            <CardAvaliacao />
                            <CardAvaliacao />
                        </div>

                    </div>
                </div>
            </div>
            <div className="clear"></div>
        </div>
    </>
}