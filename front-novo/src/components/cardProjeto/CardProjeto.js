import './cardProjeto.css'
import '../../assets/styles/global.css'
import logo from '../../assets/img/no-user.jpg'

import { useState, useEffect } from 'react'

import api from '../../api';

export default function CardProjeto(props){
    let [tecnologias, setTecnologias] = useState([]);
    let unchange = true;
    let [isCache, setIsCache] = useState(false);

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
        if(props.tecnologias != undefined){
            setTecnologias(props.tecnologias);
            setIsCache(true);
        }else{
            if(props.tipo === "projeto"){
                getTecnologias("demandas")
            }else if(props.tipo === "freelancer"){
                getTecnologias("oferta")
            }
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

            if ((i + 1) % 66 === 0) {
                return outStr + "..."
            }
        }
    }

    return <div className={`container-card`}>
        <a href={`/${props.tipo === "projeto" ? "Projeto" : "Freelancer"}/${props.id}`}>
        <div className="card">
            <div className="w20">
                <img src={logo}/>
            </div>
            <div className="w80">
                <div className="line-one-projeto">
                    <p className="titulo-projeto">{props.titulo}</p>
                    <p className="data-projeto">{dataFormatado}</p>
                    <div className="clear"></div>
                </div>
                <div>
                    <p className={`informacoes-projeto 
                    ${
                        props.tipo === "freelancer" ? " descricao-freelancer" : ""
                    }`}>
                        {/* {props.tipo === "freelancer" ? props.descricao : props.nome + " - " + props.cidade + " - " + props.uf} */}
                        {props.descricao}
                    </p>
                </div>
                <div className="line-three-projeto">
                    {
                        tecnologias.map( (tecnologia) => (
                        <span className={
                            props.tipo === "projeto" ? "projeto tecnologia-projetos" : "freelancer tecnologia-projetos"
                        }>{isCache === true ? tecnologia : tecnologia.tecnologias.tecnologia}</span>
                        ))
                    }
                    <a href="#" className={
                        props.tipo === "projeto" ? "a-projeto" : "a-freelancer"
                    }>Ver mais</a>
                </div>
            </div>
            <div className="clear"></div>
        </div>
        </a>
    </div>
}