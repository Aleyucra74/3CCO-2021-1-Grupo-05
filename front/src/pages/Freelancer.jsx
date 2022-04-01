import React from 'react';

import NavBar from '../components/NavBar';
import jessica from '../images/freelajessica.png';
import carlos from '../images/freelacarlos.png';
import carla from '../images/freelacarla.png';
import vector from '../images/vector-barra.png';
import '../styles/freelancer.css';


function Freelancer() {
    return (
        <>
                <NavBar />
                <div class="container">
                    <div class= "blocao" >
                        <h3 tabIndex={0}>conheça nossos<br/><h2>freelancers</h2></h3>
                        <grid>
                        <div class ="blocoleft1">
                        <img id="grande" src={jessica} alt="Mulher mexendo no notebook" tabIndex={0}/> 
                        <p tabIndex={0}>
                        <span id="nomej">Jéssica
                        </span>
                        <br /> 
                        Formada em Ciência da Computação;
                        26 anos, mora em São Paulo/SP;  
                        <br /><br />
                        5 anos de experiência em React e JavaScript; <br />
                        <br />
                        "Tenho o objetivo de
                        melhorar minhas aptidões
                        sendo útil para a companhia,
                        evoluindo profissionalmente".
                        </p>
                        </div>
                        </grid>
                        <grid>        
                        <img className="empresas-barra" src={vector} alt=""/>
                        </grid>
                        <grid>
                        <div class ="blocoright1">
                        <img id="pequena" src={carlos} alt="Homen mexendo no notebook" tabIndex={0}/> 
                        <p tabIndex={0}>
                        <span id="nomec">Carlos
                        </span>
                        <br /> <br />
                        Formado em Analise de sistemas;
                        24 anos, mora em Salvador/BH;
                        <br />
                        2 anos de experiência em Java e C#...
                        </p>
                        </div>
                        <div class ="blocoright2">
                        <img id="pequena" src={carla} alt="Mulher sorrindo" tabIndex={0}/> 
                        <p tabIndex={0}>
                        <span id="nomec">Carla
                        </span>
                        <br /> <br /> 
                        Formada em Engenharia de Software;
                        <br />
                        28 anos, mora em Florianópolis/SC;
                        <br />
                        6 anos de experiência em Squads...
                        </p>
                        </div>
                        </grid>
                    </div>
                </div>
        </>
        )
}

export default Freelancer;