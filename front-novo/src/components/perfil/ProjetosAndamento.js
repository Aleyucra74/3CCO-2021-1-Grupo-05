import CardProjetoAndamento from "components/cardProjetoAndamento/CardProjetoAndamento"

import { useState, useEffect } from 'react'

import api from '../../api';

export default function ProjetosAndamento(props){
    let [contratosOferta, setContratosOferta] = useState([]);
    let [contratosDemanda, setContratosDemanda] = useState([]);
    let unchange = true;

    async function getContratosOferta(){
        await api.get(`/contratos/usuario-oferta/${props.idUsuario}`,  {
            headers: {
              Authorization: 'Bearer ' + props.token 
            }
        })
        .then(response => {
            if(response.status === 200){
                console.log(response.data);
                setContratosOferta(response.data)
            }else if(response.status === 204) {
                alert("Usuário não respondeu os testes")
            }
        }).catch( error => {
            console.log(error.toJSON());
        })
    }

    async function getContratosDemanda(){
        await api.get(`/contratos/usuario-demanda/${props.idUsuario}`,  {
            headers: {
              Authorization: 'Bearer ' + props.token 
            }
        })
        .then(response => {
            if(response.status === 200){
                console.log(response.data);
                setContratosDemanda(response.data)
            }else if(response.status === 204) {
                alert("Usuário não respondeu os testes")
            }
        }).catch( error => {
            console.log(error.toJSON());
        })
    }

    useEffect(() => {
        getContratosOferta()
        getContratosDemanda()
    }, [unchange])

    return <div>
    <div className="container-perfil">
        <p className="titulo-perfil" style={{fontSize: "24px"}}>Projetos em andamento</p>
    </div>
    <div className="cards-projeto-andamento">          
        {
            contratosOferta.map( (contrato) => (
                <CardProjetoAndamento
                    id={contrato.idContrato}
                    dataInicio={contrato.dataInicio}
                    dataFim={contrato.dataFim}
                    salario={contrato.valorHora}
                    titulo={contrato.demandas.titulo}
                    tipo="freelancer"
                    width="w33"
                />
            ))
        }
        {
            contratosDemanda.map( (contrato) => (
                <CardProjetoAndamento
                    id={contrato.idContrato}
                    dataInicio={contrato.dataInicio}
                    dataFim={contrato.dataFim}
                    salario={contrato.valorHora}
                    titulo={contrato.demandas.titulo}
                    tipo="projeto"
                    width="w33"
                />
            ))
        }
    <div className="clear"></div>
    </div>
    </div>
}