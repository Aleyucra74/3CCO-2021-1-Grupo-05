import CardProjeto from "components/cardProjeto/CardProjeto"
import CardOferta from "components/cardOferta/CardOferta";

import { useState, useEffect } from 'react'

import notFound from '../../assets/img/not_found.png'

import api from '../../api';

export default function Ofertas(props){
    let [projetos, setProjetos] = useState([]);
    let [freelancer, setFreelancer] = useState([]);
    let unchange = true;
    let freelancerEnable = true;
    let projetoEnable = true;

    async function getProjetos(){
        await api.get(`/demandas/usuario/${props.idUsuario}`,  {
            headers: {
              Authorization: 'Bearer ' + props.token 
            }
        })
        .then(response => {
            if(response.status === 200){
                setProjetos(response.data)
            }else if(response.status === 204) {
                
            }
        }).catch( error => {
            console.log(error.toJSON());
        })
    }

    async function getFreelancer(){
        await api.get(`/ofertas/usuario/${props.idUsuario}`,  {
            headers: {
              Authorization: 'Bearer ' + props.token 
            }
        })
        .then(response => {
            if(response.status === 200){
                setFreelancer(response.data)
            }else if(response.status === 204) {
                
            }
        }).catch( error => {
            console.log(error.toJSON());
        })
    }

    useEffect(() => {
        getProjetos()
        getFreelancer()

        if(projetos.length < 0 && freelancer < 0){
            document.getElementById("noData").style.display = "flex";
        }
    }, [unchange])

    function enableButton(tipo){
        if(tipo === "freelancer"){
            if(freelancerEnable){
                document.getElementById("divFreelancers").style.display = "none";
                document.getElementById("tagFreelancer").classList.replace("freelancer", "disable");
                freelancerEnable = false;
            }else{
                document.getElementById("divFreelancers").style.display = "block";
                document.getElementById("tagFreelancer").classList.replace("disable", "freelancer");
                freelancerEnable = true;
            }
        } else if(tipo === "projeto"){
            if(projetoEnable){
                document.getElementById("divProjetos").style.display = "none";
                document.getElementById("tagProjeto").classList.replace("projeto", "disable");
                projetoEnable = false;
            }else{
                document.getElementById("divProjetos").style.display = "block";
                document.getElementById("tagProjeto").classList.replace("disable", "projeto");
                projetoEnable = true;
            }
        }
    }
    
    return <div>
        <div className="container-perfil" style={{paddingBottom: "0px"}}>
            <p className="titulo-perfil" style={{fontSize: "24px"}}>Ofertas em aberto</p>
            <div className="frame-ofertas">
                <span id="tagFreelancer" className="freelancer tag" onClick={() => {enableButton("freelancer")}}>Freelancer</span>
                <span id="tagProjeto" className="projeto tag" onClick={() => {enableButton("projeto")}}>Projetos</span>
            </div>
        </div>
        <div id="divFreelancers">
            <div id="noData" className="no-data">
                <div>
                    <img src={notFound}/>
                    <p>
                        Nenhum projeto concluido.
                    </p>
                </div>
            </div>
            {
                freelancer.map( (freelancer) => (
                    <>
                        <CardProjeto 
                            tipo="freelancer"
                            id={freelancer.idOferta}
                            descricao={freelancer.descricao}
                            titulo={freelancer.usuario.nome}
                            data={freelancer.createdAt}
                            token={props.token}
                        />
                        <CardOferta 
                            tipo="freelancer"
                            id={freelancer.idOferta}
                            descricao={freelancer.descricao}
                            titulo={freelancer.usuario.nome}
                            data={freelancer.createdAt}
                            token={props.token}
                        />
                    </>
                ))
            }
        </div>
        <div id="divProjetos">
            {
                projetos.map( (projeto) => (
                    <>
                    <CardProjeto 
                        tipo="projeto"
                        id={projeto.idDemanda}
                        titulo={projeto.titulo}
                        nome={projeto.usuario.nome}
                        cidade={projeto.usuario.localizacao.cidade}
                        uf={projeto.usuario.localizacao.uf}
                        data={projeto.createdAt}
                        token={props.token}
                    />
                    <CardOferta 
                        tipo="projeto"
                        id={projeto.idDemanda}
                        titulo={projeto.titulo}
                        nome={projeto.usuario.nome}
                        cidade={projeto.usuario.localizacao.cidade}
                        uf={projeto.usuario.localizacao.uf}
                        data={projeto.createdAt}
                        token={props.token}
                    />
                    </>
                ))
            }
        </div>
    </div>
}