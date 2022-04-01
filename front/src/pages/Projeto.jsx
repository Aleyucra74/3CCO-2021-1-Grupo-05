import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core';
import Select from 'react-select'

import Modal from '@material-ui/core/Modal';

import Ellipse from '../images/Ellipse.png';

import NavBar from '../components/NavBar';
import Button from '../components/Button';
import '../styles/projeto.css';
import api from '../api';
import makeAnimated from 'react-select/animated';

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
		textAlign: 'center'
	},
	fontColor: {
		color: '#000',
	},
	porcentagemVerde: {
		color: 'green',
	},

	porcentagemVermelha: {
		color: 'red',
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


function Projeto() {
	const classes = useStyles();

	const idUsuario = sessionStorage.getItem("@Hireit/idUsuario");
	const [modalStyle] = useState(getModalStyle);
	const [open, setOpen] = useState(false);
	const [ofertas, setOfertas] = useState([]);

	const getOfertasById = async () => {
		const response = await api.get(`/ofertas/usuario/${idUsuario}`);
		setOfertas(response.data);
		console.log(ofertas);
	}


	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const body = (
		<div style={modalStyle} className={classes.paper}>
			{
				ofertas.map((oferta) => (
					<div className={classes.modalDados}>
						<p className={oferta.idOferta > 47 ? classes.porcentagemVermelha : classes.porcentagemVerde}>{oferta.idOferta > 47 ? "Compatibilidade: 25%" : "Compatibilidade: 79%"}</p>
						<h2 className={classes.fontColor} id="simple-modal-title">{oferta.usuario.nome}</h2>
						<p className={classes.fontColor} id="simple-modal-description">
							{oferta.descricao}
						</p>
						<button type="submit" onClick={(e) => fazerProposta(oferta.idOferta)} className={classes.button}>Enviar oferta</button>
					</div>
				))
			}
		</div>
	);

	const [demanda, setDemanda] = useState({});
	const [usuario, setUsuario] = useState({});

	const { id } = useParams();

	const pegaDadosDemandaById = async () => {
		const response = await api.get(`/demandas/${id}`);
		setDemanda(response.data);
		setUsuario(response.data.usuario);
	}

	const fazerProposta = async (idOferta) => {
		const response = await api.post("/propostas", {
			oferta: {
				idOferta
			},
			demanda: {
				idDemanda: id
			}
		})
		if (response.status === 201) {
			alert("proposta enviada")
		}
	}

	useEffect(() => {
		pegaDadosDemandaById();
		getOfertasById();
	}, []);

	const optionsHabilidades = [
		{ value: 'html', label: 'HTML' },
		{ value: 'react', label: 'React' },
		{ value: 'css', label: 'CSS' },
		{ value: 'bootstrap', label: 'Bootstrap' },
		{ value: 'chartjs', label: 'Chart.Js' },
		{ value: 'javascript', label: 'JavaScript' },
	];

	const optionsSoftSkill = [
		{ value: 'abertoParaExperiencias', label: 'Aberto para experiencias' },
		{ value: 'amabilidade', label: 'Amabilidade' },
		{ value: 'extroversao', label: 'Extroversão' },
		{ value: 'Comunicacao', label: 'Comunicação' }
	];

	const animatedComponents = makeAnimated();

	const [selectedHabilidades, setSelectedHabilidades] = useState([]);
	const [selectedSoftSkill, setSelectedSoftSkill] = useState([]);

	//ESTRUTURA BASE
	return (
		<>
			<NavBar />
			<div className="container">
				<div className="proj-info left">
					<h2 id="title" className="ctitle left">{demanda.titulo}</h2>
					<h3 className="payment right">R$ {demanda.salario}</h3>
					<div className="desc-proj">
						<div className="description text-basic">
							<h5>Descrição:</h5>
							<div className="text-basic fs-16">
								{demanda.descricao}
							</div>
						</div>
						<div className="habilidade text-basic">
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
						</div>
					</div>
				</div>
				<div className="prop-info right">
					<div className="prof-circle">
						<img id="PerfilEmpresa" src={Ellipse} alt="triangulo de continuidade de página" />
					</div>
					<h2 className="company">{usuario.nome}</h2>
					<Button
						clickFunction={handleOpen}
						style={{ textDecoration: 'inherit' }}
						classname="button-prop"
						title="Fazer proposta"
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
					<div class="proj-dados">
						<p> Propostas feitas: <b class="props-now">3</b> <br></br>
										Interessados: <b class="candidates-now">4</b></p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Projeto;
