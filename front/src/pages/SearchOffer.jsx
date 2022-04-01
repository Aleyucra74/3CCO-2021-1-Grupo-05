import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../components/NavBar';
import ComboBox from '../components/ComboBox';
import Button from '../components/Button';
import OfertaProjeto from '../components/OfertaProjeto';

import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import '../styles/search-offer.css';
import api from '../api';

function SearchOffer() {

    const [ofertas, setOfertas] = useState([]);
    const [tecnologias, setTecnologias] = useState([]);

    useEffect(() => {
        const getOfertas = async () => {
            const response = await api.get("/ofertas/");
            console.log(response);
            setOfertas(response.data);
        }
        const getTecnologias = async () => {
            const response = await api.get("/tecnologias/");
            console.log(response.data);
            setTecnologias(response.data);
            console.log(tecnologias);
        }
        getTecnologias();
        getOfertas();
    },[]);

    const [formData, setFormData] = useState({
        pesquisar: "",
        usuario: ""
    })

    function handleDataSimple(e) {
        const newForm = { ...formData }
        newForm[e.target.id] = e.target.value;
        setFormData(newForm);
        console.log(newForm);
    }

    function handleInputChange(event, value) {
        console.log(value);
    }

    function handle(e) {
        const newForm = {...formData};
        newForm[e.target.id] = e.target.value;
        setFormData(newForm);
        console.log(newForm);
    }

    const cargo = ['Front-end','Back-end','Full-stack','Design','UX','UI','Mobile']
    const localidade = ['São Paulo','Rio de Janeiro','Bahia','Salvador','Minas Gerais','Outros']
    const salario = ['0 - 99','100 - 299','300 - 499','500 - 799','800 - 1000+']
    const tempoExperiencia = ['0 - 1 anos','2 - 3 anos','4 - 5 anos','6 - 7 anos','8 - 9 anos','10+ anos']
    const data = ['Hoje','1 - 2 Dias','1 Semana','1 Mês','+ 2 Meses']

    return (
        <>
            <NavBar />

            <main className="container-search">
                <section className="section-oferta">
                    <h2>Procure o freelancer ideal</h2>
                    <div className="ofertas-input">
                        <TextField
                            id="pesquisar"
                            onChange={(e) => handleDataSimple(e)}
                            style={{ margin: 8 }}
                            placeholder="Procure por uma empresa ou oferta"
                            fullWidth
                            margin="normal"
                            color="primary"
                            className="textField"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment>
                                    <IconButton>
                                      <SearchIcon />
                                    </IconButton>
                                  </InputAdornment>
                                )
                              }}
                        />
                        <Link to="/criar-oferta">
                            <Button 
                                linkTo="/criar-oferta"
                                classname="button-oferta"
                                title="Criar oferta"
                            />
                        </Link>
                    </div>
                </section>
                <section className="section-combo-box">
                    <h2>Filtros</h2>
                    <div className="div-combo">

                        <h3 id="h2-textField">Usuário:
                        <TextField
                            id="usuario"
                            onChange={(e) => handleDataSimple(e)}
                            style={{ margin: 8 }}
                            placeholder="Usuário"
                            fullWidth
                            margin="normal"
                            color="primary"
                            className="textField"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment>
                                    <IconButton>
                                      <SearchIcon />
                                    </IconButton>
                                  </InputAdornment>
                                )
                            }} 
                        />
                        </h3>

                        <ComboBox 
                            divComboStyle="combo-style"
                            onInputChange={handleInputChange}
                            titleComboBox="Localidade:"
                            autoCompleteStyle="text-field-style"
                            options={localidade}
                        />
                        
                    </div>
                    <div className="div-combo2">
                        <ComboBox 
                            divComboStyle="combo-style"
                            onInputChange={handleInputChange}
                            titleComboBox="Tecnologias:"
                            autoCompleteStyle="text-field-style"
                            options={tecnologias}
                            opcoesLabel={(tecnologias) => tecnologias.tecnologia}
                        />
                        <ComboBox 
                            divComboStyle="combo-style"
                            onInputChange={handleInputChange}
                            titleComboBox="Tempo de experiência:"
                            autoCompleteStyle="text-field-style"
                            options={tempoExperiencia}
                        />
                        <ComboBox 
                            divComboStyle="combo-style"
                            onInputChange={handleInputChange}
                            titleComboBox="Data:"
                            autoCompleteStyle="text-field-style"
                            options={data}
                        />
                    </div>
                </section>
                {/* LISTANDO AS DEMANDAS DO BANCO */}
                <section className="section-ofertas">

                    {
                        ofertas.map( (oferta) => (
                            <OfertaProjeto
                            title={oferta.usuario.nome}
                            publicado={oferta.createdAt}
                            proposta="10"
                            descricao={oferta.descricao}
                            id={oferta.idOferta}
                        /> 
                        ))
                    }       
                                     
                </section>
            </main>
        </>
    )

}

export default SearchOffer;