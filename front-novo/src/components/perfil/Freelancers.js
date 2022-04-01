import CardProjeto from "components/cardProjeto/CardProjeto";
import CardOferta from "components/cardOferta/CardOferta";

import { useState, useEffect } from 'react'

import notFound from '../../assets/img/not_found.png'

import api from '../../api';

export default function Freelancers(props){
    let [freelancer, setFreelancer] = useState([]);
    let unchange = true;

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
                document.getElementById("noData").style.display = "flex";
            }
        }).catch( error => {
            console.log(error.toJSON());
        })
    }

    useEffect(() => {
        getFreelancer()
    }, [unchange])

    return <>
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
    </>
}