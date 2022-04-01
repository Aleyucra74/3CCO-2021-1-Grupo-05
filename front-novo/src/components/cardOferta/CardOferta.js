import './cardOferta.css'
import '../cardProjeto/cardProjeto.css'

import logo from '../../assets/img/no-user.jpg'
import capa from '../../assets/img/perfil/b3-capa.jpg'

import { useState, useEffect } from 'react'

import api from '../../api';

export default function CardOferta(props){
    let [tecnologias, setTecnologias] = useState([]);
    let unchange = true;

    async function getTecnologias(tipo){
        await api.get(`/tecnologias/${tipo}/${props.id}`,  {
            headers: {
              Authorization: 'Bearer ' + props.token 
            }
        })
        .then(response => {
            if(response.status === 200){
                setTecnologias(response.data)
            }else if(response.status === 204) {
            }
        }).catch( error => {
            console.log(error.toJSON());
        })
    }

    useEffect(() => {
        if(props.tipo === "projeto"){
            getTecnologias("demandas")
        }else if(props.tipo === "freelancer"){
            getTecnologias("oferta")
        }
    }, [unchange])
    
    let data = props.data.split("T")
    let data2 = data[0].split("-")
    let dataFormatado = `${data2[2]}/${data2[1]}/${data2[0]}`

    function splitP(text) {
        var str = text,
            outStr = '';

        for (var i = 0; i < str.length; i++) {
            outStr += str[i];

            if ((i + 1) % 35 === 0) {
                return outStr + "..."
            }
        }
    }

    return <div className={`box-card-oferta ${props.width}`}>
        <div className="card-projeto">
            <div className="banner-card-projeto">
                <img src={logo} className="logo-card-projeto"/>
                <img src={capa} className="capa-card-projeto"/>
            </div>
            <div className="info-card-projeto">
                <div className="line-one-card-projeto">
                    <span className="titulo-card-projeto">{props.titulo}</span>
                    <p className="data-projeto">{dataFormatado}</p>
                </div>
                <p className={`informacoes-projeto 
                    ${
                        props.tipo === "freelancer" ? " descricao-freelancer" : ""
                    }`} style={{marginLeft: "16px"}}>
                        {props.tipo === "freelancer" ? splitP("Sou desenvolvedor backend há 10 anos na empresa C6Bank, trabalhei no time de cartões") : props.nome + " - " + props.cidade + " - " + props.uf}
                        {props.tipo === "freelancer" ? <a className="ler-mais-projeto" style={{float:'right', marginLeft: "8px"}}>Ler mais</a> : ""}
                    </p>
                <div className="line-three-projeto" style={{marginLeft: "8px"}}>
                    {
                        tecnologias.map( (tecnologia) => (
                        <span className={
                            props.tipo === "projeto" ? "projeto tecnologia-projetos" : "freelancer tecnologia-projetos"
                        }>{tecnologia.tecnologias.tecnologia}</span>
                        ))
                    }
                </div>
            </div>
        </div> 
    </div>
}