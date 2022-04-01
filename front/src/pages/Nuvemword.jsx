import React from 'react';

import NavBar from '../components/NavBar';
import '../styles/projeto.css';
import noferta from '../images/nuvemOferta.png';
import ndemanda from '../images/nuvemDemanda.png';
import vector from '../images/vector-barra.png';


function Nuvemword() {
    return (
        <>
                <NavBar />
                <div class="container">
                    <div class= "bloco" >
                        <h3 tabIndex={0}>Tecnologias mais utilizadas</h3>
                        <h5>
                        A seguir você confere a nuvem de palavras de uma pesquisa, 
                        que identificou as linguagens 
                        de maior interesse e aplicação comercial.
                        Não precisa dizer que profissionais com essa qualificação 
                        no perfil têm uma maior chance de serem contratados,
                        e apesar do conforto de trabalhar com Pearl pelos últimos 20 anos, 
                        não custa nada conhecer maneiras mais eficientes 
                        de desenvolver sua empresa ou seu sistema, não é mesmo?</h5>
                        <grid>
                        <div class ="blocoleft">
                        </div>
                        <div id="divdemanda">
                        <h5>MAIS BUSCADAS EM DEMANDA</h5>
                        <img id="Toferdeman" src={ndemanda} alt="Nuvem de palavras demandas" tabIndex={0}/>
                        </div>
                        <img className="nuvem-barra" src={vector} alt=""/>
                        <div id="divoferta">
                        <h5>MAIS BUSCADAS EM OFERTA</h5>
                        <img id="Toferdeman" src={noferta} alt="Nuvem de palavras ofertas" tabIndex={0}/> 
                        </div>
                        </grid>
                    </div>
                </div>
        </>
        )
}

export default Nuvemword;