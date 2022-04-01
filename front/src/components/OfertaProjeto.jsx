import React from 'react';

import Button from '../components/Button';
import '../styles/components/OfertaProjetos.css';
import {Link} from 'react-router-dom';

function PropostaProjetos(props){

    return (

        <div className="div-proposta">
            <div className="div-dados">
                <div className="div-title">
                    <h2>{props.title}</h2>
                    {/* <h3>R$ {props.valor}</h3> */}
                </div>
                <div className="div-data">
                    {/* <p>Empresa: {props.nome}</p> */}
                    <p>Publicado: {props.publicado}</p>
                    <p>Propostas: {props.proposta}</p>
                </div>
            </div>
            <div className="div-desc">
                <div>
                    <p>{props.descricao}</p>
                </div>
                {/* <Link to={`/projeto/${props.id}`}> */}
                    <Button 
                        classname="button-mais"
                        title="VER MAIS"
                    />
                {/* </Link> */}
            </div>
        </div>

    )

}

export default PropostaProjetos;