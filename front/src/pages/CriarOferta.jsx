import React, { useState, Component, useEffect } from 'react';

import NavBar from '../components/NavBar';

import FormInput from '../components/FormInput';
import Button from '../components/Button';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

import api from '../api';
import vector from '../images/vector-barra.png';
import '../styles/criar-oferta.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CriarOferta(){

        const notificaErro = () => toast.error(
            'Erro ao criar oferta', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: "error-toast"
            }
        );

        const animatedComponents = makeAnimated();

        const [selectedHabilidades, setSelectedHabilidades] = useState({
                selectOptions : [],
                value:[]
        });

        const [formData, setFormData] = useState({
                descricao: "",
                experiencia: 0,
                salario: 0
        })

        function handle(e, id) {
                const newForm = {...formData};
                newForm[id] = e;
                setFormData(newForm);
                console.log(newForm);
        }

        function handleDataSimple(e) {
                const newForm = { ...formData }
                newForm[e.target.id] = e.target.value;
                setFormData(newForm);
                console.log(newForm);
        }

        const getTecnologias = async () => {
                const response = await api.get("/tecnologias");

                const data = response.data;

                const optTec = data.map(d => ({
                        "value": d.idTecnologia,
                        "label": d.tecnologia,
                }));
                setSelectedHabilidades(optTec);
                console.log(selectedHabilidades)
        }

        useEffect(() => {
                getTecnologias();
        }, []);

        function enviar(e) {
                e.preventDefault();
                api.post("/", {
                    titulo: formData.titulo,
                    descricao: formData.descricao,
                    empresa: formData.empresa,
                    salario: formData.salario,
                    habilidades: selectedHabilidades
                }).then((resposta) => {
                    console.log("post ok", resposta)
                }).catch(e => {
                        if(e.response.status !== 201){
                                notificaErro()
                        }
                }) 
                
        }

        return (
        <>
                <ToastContainer></ToastContainer>
                <NavBar/>
                <div className="container">
                        <div className="add-offer">
                        <form onSubmit={(e) => enviar(e)}>
                        <div>
                        <Button 
                                classname="button-create-offer" 
                                title="Criar Oferta" 
                                linkTo="/search-projects"
                        />
                        </div>
                        <section className="section-left">
                        
                        <h2 className="descricao">Descrição:</h2>
                        <textarea formInput="input-descricao"
                                className="textarea-descricao"   
                                id="descricao"
                                onChange={(e) => handleDataSimple(e)}
                                name="comment" 
                                form="usrform"
                                placeholder="Descrição do projeto"></textarea>
                        </section>
                        {/* <div className="section-barra">
                                <img src={vector} alt=""/>
                        </div> */}
                        <section className="section-right">
                        <FormInput 
                                formInput="input-label-right"
                                idInput="salario"
                                changeFunction={(e) => handleDataSimple(e)}
                                title="Valor por Hora:" 
                                type="number" 
                                placeholder="Valor pago pelo projeto"/>

                            <FormInput 
                                formInput="input-label-right"
                                idInput="experiencia"
                                changeFunction={(e) => handleDataSimple(e)}
                                title="Tempo de experiência:" 
                                type="number" 
                                placeholder="Tempo de experiência na área"/>

                        <h2 id="h2-select">Habilidades:</h2>
                        <Select
                                id="habilidades"
                                idInput="habilidades"
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                options={selectedHabilidades}
                                isMulti
                                onChange={(e) => handle(e,"habilidades")}
                                labelledBy="Selecione"
                        />
                        
                        </section>
                        </form>
                        </div>
                </div>
        </>
        )
}

export default CriarOferta;
