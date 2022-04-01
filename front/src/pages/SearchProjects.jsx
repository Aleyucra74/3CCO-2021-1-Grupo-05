import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../components/NavBar';
import ComboBox from '../components/ComboBox';
import Button from '../components/Button';
import PropostaProjeto from '../components/PropostaProjeto';

import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import '../styles/search-projects.css';
import api from '../api';

function SearchProject() {

    const [demandas, setDemandas] = useState([]);
    const [tecnologias, setTecnologias] = useState([]);
    const [formData, setFormData] = useState({
        titulo: ""
    })

    const filtroSimples = async () => {
        const response = await api.get("/demandas/filtro-simples", {
            params: { titulo : formData.titulo}
        })
        setDemandas(response.data);
    }

    useEffect(() => {
        const getDemandas = async () => {
            const response = await api.get("/demandas/");
            console.log(response);
            setDemandas(response.data);
        }
        const getTecnologias = async () => {
            const response = await api.get("/tecnologias/");
            console.log(response.data);
            setTecnologias(response.data);
            console.log(tecnologias);
        }
        getTecnologias();
        getDemandas();
    },[]);

    function handle(e, id) {
        const newForm = {...formData};
        newForm[id] = e;
        setFormData(newForm);
        console.log(newForm);
    }

    function handleInputChange(event, value) {
        console.log(value);
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
                <section className="section-pesquisa">
                    <h2>Procure sua proposta ideal</h2>
                    <div className="pesquisar-input">
                        <TextField
                            id="titulo"
                            onChange={(e) => handle(e)}
                            style={{ margin: 8 }}
                            placeholder="Procure por um projeto, empresa ou proposta"
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
                                      <SearchIcon  onClick={(e) => filtroSimples()}/>
                                    </IconButton>
                                  </InputAdornment>
                                )
                              }}
                        />
                        <Link to="/criar-proposta">
                            <Button 
                                linkTo="/criar-proposta"
                                classname="button-proposta"
                                title="Criar proposta"
                            />
                        </Link>
                    </div>
                </section>
                <section className="section-combo-box">
                    <h2>Filtros</h2>
                    <div className="div-combo">

                        <h2 id="h2-textField">Usuário/Empresa:
                        <TextField
                            id="usuario"
                            style={{ margin: 8 }}
                            placeholder="Usuário/Empresa"
                            onChange={(e) => handle(e)}
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
                        </h2>
                        <h2 id="h2-textField">Salário mín:
                        <TextField
                            id="salarioMin"
                            style={{ margin: 8 }}
                            onChange={(e) => handle(e)}
                            placeholder="Salário mín:"
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
                        </h2>
                        <h2 id="h2-textField">Salário máx:
                        <TextField
                            id="salarioMax"
                            onChange={(e) => handle(e)}
                            style={{ margin: 8 }}
                            placeholder="Salário máx:"
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
                        </h2>
                    </div>
                    <div className="div-combo2">
                        <ComboBox 
                            id="localidade"
                            divComboStyle="combo-style"
                            onInputChange={handleInputChange}
                            titleComboBox="Localidade:"
                            autoCompleteStyle="text-field-style"
                            options={localidade}
                        />
                        <ComboBox 
                            id="tecnologia"
                            divComboStyle="combo-style"
                            titleComboBox="Tecnologias:"
                            autoCompleteStyle="text-field-style"
                            options={tecnologias}
                            onInputChange={(e) => handle(e,"tecnologias")}
                            opcoesLabel={(tecnologias) => tecnologias.tecnologia}
                        />
                        <ComboBox 
                            id="experiencia"
                            divComboStyle="combo-style"
                            onInputChange={handleInputChange}
                            titleComboBox="Tempo de experiência:"
                            autoCompleteStyle="text-field-style"
                            options={tempoExperiencia}
                        />
                        <ComboBox 
                            id="data"
                            divComboStyle="combo-style"
                            onInputChange={handleInputChange}
                            titleComboBox="Data:"
                            autoCompleteStyle="text-field-style"
                            options={data}
                        />
                    </div>
                </section>
                {/* LISTANDO AS DEMANDAS DO BANCO */}
                <section className="section-propostas">

                    {
                        demandas.map((demanda) => (
                            <PropostaProjeto
                            title={demanda.titulo}
                            valor={demanda.salario}
                            nome={demanda.usuario.nome}
                            publicado={demanda.createdAt}
                            proposta="10"
                            descricao={demanda.descricao}
                            id={demanda.idDemanda}
                        /> 
                        ))
                    }                        


                    <PropostaProjeto
                        title="projeto 1"
                        valor="500"
                        nome="Bandtec"
                        publicado="2 dias"
                        proposta="10"
                        descricao="Lorem ipsum dolor sit amet, consectetur 
                        adipiscing elit. Nunc etiam nulla consectetur
                        iaculis velit tempor, quam rhoncus. Ultricies
                        at diam eget elementum. "
                    />
                   
                </section>
            </main>
        </>
    )

}

export default SearchProject;