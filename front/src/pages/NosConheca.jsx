// import React, { useState } from 'react';

import NavBar from '../components/NavBar';
import '../styles/projeto.css';
import handpc from '../images/hand.png';
import handtogether from '../images/handstogether.png';
import menwoman from '../images/menwoman.png';
import menstalk from '../images/menstalk.png';

function NosConheca(){
//ESTRUTURA BASE
        return (
        <>
                <NavBar />
                <div class="container">
                    <div class= "bloco" >
                        <h3 tabIndex={0}>conheça o hire-it</h3>
                        <grid>
                        <div class ="bleft1">
                        <p tabIndex={0}>
                        Nosso objetivo é mudar a forma 
                        de recrutamento atual, visando 
                        a melhora e a rapidez do mesmo.
                        Jutando a empresa ao
                        profissional,
                        todo o resto será
                        possível.
                        </p>
                        <img id="Pthandpc" src={handpc} alt="Mexendo no notebook" tabIndex={0}/> 
                        </div>
                        <div class ="bleft2">
                        <p tabIndex={0}>
                        Acreditamos fortemente no
                        bem-estar de nossos usuários, e
                        por isso queremos unir o útil ao  
                        agradável. Uma plataforma que
                        une os melhores profissionais às
                        melhores empresas.
                        </p>
                        <img id="Pthandpc" src={handtogether} alt="Mãos dadas" tabIndex={0}/> 
                        </div>
                        </grid>
                        <grid>
                        <div class ="bright1">
                        <img id="Pthandpc" src={menwoman} alt="Homen e mulher fazer aperto de mãos" tabIndex={0}/> 
                        <p tabIndex={0}>
                        Somos uma plataforma que une  
                        a empresa ao freelancer,  
                        possibilitando os encontros  
                        mais perfeitos entre as duas  
                        pontas.  
                        </p>
                        </div>
                        <div class ="bright2">
                        <img id="Pthandpc" src={menstalk} alt="Homens conversando" tabIndex={0}/> 
                        <p tabIndex={0}>
                        Nosso mundo passa por   
                        mudanças repentinas, e  
                        queremos estar preparados para 
                        todos esses imprevistos,  por  
                        isso acreditamos que há formas 
                        de flexibilização importantes 
                        para se trabalhar.
                        </p>
                        </div>
                        </grid>
                    </div>
                </div>
        </>
        )
}

export default NosConheca;
