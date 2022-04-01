import CardProjeto from "components/cardProjeto/CardProjeto";
import CardOferta from "components/cardOferta/CardOferta";

import { useState, useEffect } from 'react'

import notFound from '../../assets/img/not_found.png'

import api from '../../api';

export default function Projetos(props){
    let [projetos, setProjetos] = useState([]);
    let unchange = true;

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
                document.getElementById("noData").style.display = "flex";
            }
        }).catch( error => {
            console.log(error.toJSON());
        })
    }

    useEffect(() => {
        getProjetos()
    }, [unchange])

    return <div>
        <div id="noData" className="no-data">
            <div>
                <img src={notFound}/>
                <p>
                    Nenhum projeto concluido.
                </p>
            </div>
        </div>
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
}