import React, { useState } from 'react';

import NavBar from '../components/NavBar';
import '../styles/perfil.css';
import Ellipse from '../images/Ellipse 1.png';
import perfil from '../images/a21.png';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { Link } from 'react-router-dom';

function Perfil() {
        const optionsHabilidades = [
                { value: 'java', label: 'Java' },
                { value: 'react', label: 'React' }
        ];

        const optionsSoftSkill = [
                { value: 'abertoParaExperiencias', label: 'Aberto para experiencias' },
                { value: 'conscienciosidade', label: 'Conscienciosidade' },
                { value: 'empatia', label: 'Empatia' },
        ];

        const animatedComponents = makeAnimated();

        const [selectedHabilidades, setSelectedHabilidades] = useState([]);
        const [selectedSoftSkill, setSelectedSoftSkill] = useState([]);
        return (
                <>
                        <NavBar />
                        <div class="container">
                                <div class="pers-info left">
                                        <div class="pers-circle">
                                                <img id="PerfilUser" src={Ellipse} alt="triangulo de continuidade de página" />
                                        </div>
                                        <h2 class="name">Rafael Jesus</h2>
                                        <h5>Editar perfil</h5>
                                        <Link to="/teste-personalidade">
                                                <h5>Teste de personalidade</h5>
                                        </Link>
                                        <div class="pers-dados">
                                                <span>
                                                        <a id="prompt">Idade: </a><b class="age" contentEditable="true" lenght="10">28 anos</b> <br />
                                                        <a id="prompt">Localização: </a><b class="age" contentEditable="true">São Paulo - SP</b> <br />
                                                        <a id="prompt">Foco: </a><b class="age" contentEditable="true" >Desenvolvimento WEB</b> <br />
                                                </span>
                                        </div>
                                </div>
                                <div class="proj-info right">
                                        <div class="desc-proj">
                                                <div class="info-basic text-basic speech-bubble">
                                                        <div class="text-basic fs-17">
                                                                Meu nome é Rafael Jesus. Tenho mais de 5 anos de carreira desenvolvida na área de Web Design, com ampla experiência no desenvolvimento e manutenção de Sites. Atuando com foco no cumprimento de critérios de excelência estabelecidos.
                                                        </div>
                                                </div>
                                                <div class="info-habil text-basic">
                                                        <h2 id="select">Habilidades:</h2>
                                                        <Select
                                                        id="habilidades"
                                                        closeMenuOnSelect={false}
                                                        components={animatedComponents}
                                                        options={optionsHabilidades}
                                                        value={optionsHabilidades}
                                                        isMulti
                                                        onChange={setSelectedHabilidades}
                                                        labelledBy="Selecione"
                                                        />
                        
                                                        <h2 id="select">Soft Skill:</h2>
                                                        <Select
                                                        id="softSkill"
                                                        closeMenuOnSelect={false}
                                                        components={animatedComponents}
                                                        options={optionsSoftSkill}
                                                        value={optionsSoftSkill}
                                                        isMulti
                                                        onChange={setSelectedSoftSkill}
                                                        labelledBy="Selecione"
                                                        />
                                                        <div class="info-plus left">
                                                        <span>Projetos que participo: <b>0</b></span><br/>
                                                        <span>Projetos enviados: <b>0</b></span><br/>
                                                        <span>Ofertas ativas: <b>2</b></span><br/>
                                                        <span>Ofertas enviadas: <b>1</b></span><br/>
                                                        </div>
                                                        <div class="info-plus left">
                                                        <span>Projetos finalizados: <b>0</b></span><br/>
                                                        <span>Ofertas finalizadas: <b>0</b></span><br/>
                                                        </div>
                                                        <div class="info-img right">
                                                                Seu perfil: <br/>
                                                                <img src={perfil} alt="" alt="Conscienciosidade" title="Conscienciosidade"/>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </>
        )
}

export default Perfil;
