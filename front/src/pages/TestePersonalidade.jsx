import { makeStyles, Modal } from '@material-ui/core';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/Button';

import NavBar from '../components/NavBar';
import DiscreteSlider from '../components/Slider';
import '../styles/teste-personalidade.css';

import personality from '../images/a21.png';


function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 5 + rand();
    const left = 5 + rand();

    return {
        margin: '10px',
        display: 'flex',
        flexWrap: 'wrap'
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: '#252424',
        border: '2px solid #000',
        borderRadius: '8px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modalDados: {
        width: '23%',
        margin: '10px',
        padding: '10px',
        height: '30%',
        border: '3px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#ccc',
    },
    fontColor: {
        color: '#000',
    },
    porcentagem: {
        color: 'green',
    },
    button: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: '18px',
        padding: '5px',
        backgroundColor: 'var(--color-primary)',
        border: '1px solid var(--color-primary)',
        borderRadius: '10px',
        width: '70%',
        marginTop: '20px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        textDecoration: 'none',
        cursor: 'pointer',
    },
}));

function TestePersonalidade() {

    const classes = useStyles();

    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [formData, setFormData] = useState({
        valor: {}
    })

    function handle(e, id) {
        const newForm = { ...formData }
        newForm[e.target.id] = e.target.value;
        setFormData(newForm);
        console.log(newForm);
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div className="text-modal left">
                <h2>Com base no seu teste de personalidade, seu perfil é de:</h2>
                <h3>CONSCIENCIOSIDADE!</h3>
                <h1>Pessoas com este perfil de inteligência são extremamente ativas e em geral causam uma grande admiração nos outros. São os líderes práticos, aqueles que chamam a responsabilidade para si. Eles são calmos, diretos e têm uma enorme capacidade para convencer o outro a fazer tudo o que acharem conveniente. São capazes também de identificar as qualidades das pessoas e extrair o melhor delas, organizando equipes e coordenando trabalho em conjunto.</h1>
            </div>
            <img className="pers-pic right" src={personality} alt="" />
            <footer className="left">
                <h1>- Aperte fora dessa tela para sair -</h1> 
            </footer>
        </div>
    );

    return (
        <>
            <NavBar
                login="Teste de Personalidade"
            />
            <div className="container-teste">
                <div className="teste-personalidade">
                    <section className="section-title">
                        <h2>FAÇA NOSSO TESTE DE <br />
                            <span id="personalidade">PERSONALIDADE</span></h2>
                        <h1>Posicione a barra de acordo com a sua preferência</h1>
                    </section>
                    <section className="test-slider">
                        <DiscreteSlider
                            titulo="Eu sou o centro das atenções."
                        />
                        <DiscreteSlider
                            titulo="Eu não falo muito."
                        />
                        <DiscreteSlider
                            titulo="Eu me sinto confortável perto de pessoas."
                        />
                        <DiscreteSlider
                            titulo="Eu gosto de ficar longe das pessoas."
                        />
                        <DiscreteSlider
                            titulo="Eu começo as conversas."
                        />
                        <DiscreteSlider
                            titulo="Eu tenho pouco a dizer."
                        />
                        <DiscreteSlider
                            titulo="Falo com muitas pessoas diferentes nas festas."
                        />
                        <DiscreteSlider
                            titulo="Não gosto de chamar atenção para mim."
                        />
                        <DiscreteSlider
                            titulo="Eu fico quieto(a) perto de estranhos"
                        />
                        <DiscreteSlider
                            titulo="Não me importo de ser o centro das atenções."
                        />
                        <div id="butoes">
                            <Button
                                clickFunction={handleOpen}
                                style={{ textDecoration: 'inherit' }}
                                classname="button-pro left"
                                title="Verificar resultado"
                                tipo="button"
                            />
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                            >
                                {body}
                            </Modal>

                            
                            <Link to="/perfil">
                            <Button
                                style={{ textDecoration: 'inherit' }}
                                classname="button-pro left"
                                title="Finalizar teste"
                                tipo="button"
                            />
                            </Link>
                        </div>
                    </section>

                </div>
            </div>
        </>
    )
}


export default TestePersonalidade;