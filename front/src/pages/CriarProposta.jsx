import React, { useState, useEffect } from 'react';

import NavBar from '../components/NavBar';
import {useHistory} from 'react-router-dom';

import FormInput from '../components/FormInput';
import Button from '../components/Button';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

import api from '../api';
import '../styles/criar-proposta.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CriarProposta() {

        const notificaErro = (message) => toast.error(
            message, {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: "error-toast"
            }
        );

        const history = useHistory();

        const idUsuario = sessionStorage.getItem("@Hireit/idUsuario");
        const animatedComponents = makeAnimated();

        const [selectedHabilidades, setSelectedHabilidades] = useState({
                selectOptions: [],
                value: []
        });

        const [selectedSoftSkill, setSelectedSoftSkill] = useState({
                selectOptions: [],
                value: []
        });

        const [formData, setFormData] = useState({
                titulo: "",
                descricao: "",
                usuario: idUsuario,
                salario: 0,
                tecnologias: [],
                softskills: []
        })

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

        const getSoftskills = async () => {
                const response = await api.get("/softskills");

                const data = response.data;
                const optSoft = data.map(d => ({
                        "value": d.idSoftSkills,
                        "label": d.softSkill
                }));
                setSelectedSoftSkill(optSoft);
        }


        useEffect(() => {
                getTecnologias();
                getSoftskills();
        }, []);

        function handleDataSimple(e) {
                const newForm = { ...formData }
                newForm[e.target.id] = e.target.value;
                setFormData(newForm);
                console.log(newForm);
        }

        function handle(e, id) {
                const newForm = { ...formData };
                newForm[id] = e;
                setFormData(newForm);
                console.log(newForm);
        }

        function enviar(e) {
                e.preventDefault();

                api.post("/demandas/", {
                        titulo: formData.titulo,
                        descricao: formData.descricao,
                        salario: parseInt(formData.salario),
                        usuario: {
                                idUsuario
                        }
                }).then((resposta) => {
                        console.log("post ok", resposta)
                        alert("Projeto criado com sucesso!")
                        history.push("/search-projects")
                }).catch(e => {
                        if(e.response.status === 422){
                                var listaErros = e.response.data.split(",")
                                for(var i = 0; i < listaErros.length-1; i++){
                                        notificaErro(listaErros[i])
                                }
                        }
                        if(e.response.status !== 201){
                                notificaErro(e.response.data)
                        }
                })
                
        }

        return (
                <>
                <ToastContainer></ToastContainer>
                        <NavBar />
                        <div className="container">
                                <div className="add-proposal">
                                        <form onSubmit={(e) => enviar(e)}>
                                                <div>
                                                        <Button
                                                                classname="button-create-proposal"
                                                                title="Criar Projeto"
                                                        />
                                                </div>
                                                <section className="section-left">
                                                        <FormInput
                                                                formInput="input-label-left"
                                                                idInput="titulo"
                                                                changeFunction={(e) => handleDataSimple(e)}
                                                                title="Título:"
                                                                type="text"
                                                                placeholder="Título do projeto" />
                                                        <h2 className="descricao">Descrição:</h2>
                                                        <textarea
                                                                className="textarea-descricao"
                                                                id="descricao"
                                                                onChange={(e) => handleDataSimple(e)}
                                                                placeholder="Descrição do projeto"></textarea>
                                                </section>
                                                <section className="section-right">
                                                        <FormInput
                                                                formInput="input-label-right"
                                                                idInput="salario"
                                                                changeFunction={(e) => handleDataSimple(e)}
                                                                title="Valor Salarial:"
                                                                type="number"
                                                                placeholder="Valor pago pelo projeto" />

                                                        <h2 id="h2-select">Habilidades:</h2>
                                                        <Select
                                                                id="tecnologias"
                                                                closeMenuOnSelect={false}
                                                                components={animatedComponents}
                                                                options={selectedHabilidades}
                                                                isMulti
                                                                onChange={(e) => handle(e, "tecnologias")}
                                                                labelledBy="Selecione"
                                                        />

                                                        <h2 id="h2-select">Soft Skill:</h2>
                                                        <Select
                                                                id="softskills"
                                                                closeMenuOnSelect={false}
                                                                components={animatedComponents}
                                                                options={selectedSoftSkill}
                                                                onChange={(e) => handle(e, "softskills")}
                                                                isMulti
                                                                labelledBy="Selecione"
                                                        />
                                                </section>
                                        </form>
                                </div>
                        </div>
                </>
        )
}

export default CriarProposta;
