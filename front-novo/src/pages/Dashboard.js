import React, { useEffect, useState } from "react";

import '../assets/styles/components/cardcontent-dashboard.css';

import '../assets/styles/dashboard.css';

import ServicesNavbar from 'components/ServicesNavbar';

import { Bar, Line } from 'react-chartjs-2';
import Heading2 from "@material-tailwind/react/Heading2";

import api from '../api';

import FreelancerChart from "../components/FreelancerChart";
import useGoogleCharts from '../hook/useGoogleCharts';

import Header from "components/dashboard/Header";
import wordCloud from 'assets/img/wordcloud.png'
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Dashboard() {
    const google = useGoogleCharts();

    let [dataSoftskill, setDataSoftskill] = useState([])
    let [dataOfertas, setDataOfertas] = useState([])
    let [dataProjetos, setDataProjetos] = useState([])
    let [dataFreelancers, setDataFreelancers] = useState([])
    let [dataCidades, setDataCidades] = useState([['City',   'Freelancers']])
    let [dataAvaliacoes, setDataAvaliacoes] = useState("")
    let [imgBoneco, setImgBoneco] = useState(require("../assets/img/boneco/estabilidade.png").default)
    const [data, setData] = useState([{}]);
    const [df, setDF] = useState([]);
    const techData = [
        {
            x_media: [65, 59, 80, 81, 56],
            y_softskill: ['Aberto para experiências', 'Conscienciosidade', 'Extroversão', 'Instabilidade Emocional', 'Amabilidade'],
            tecnologia: "Java -> Android",
        },
        {
            x_media: [65, 59, 80, 81, 56],
            y_softskill: ['Aberto para experiências', 'Conscienciosidade', 'Extroversão', 'Instabilidade Emocional', 'Amabilidade'],
            tecnologia: "Java -> Backend",
        },
        {
            x_media: [35, 49, 50, 11, 53],
            y_softskill: ['Aberto para experiências', 'Conscienciosidade', 'Extroversão', 'Instabilidade Emocional', 'Amabilidade'],
            tecnologia: "Swift",
        },
        {
            x_media: [35, 49, 50, 11, 53],
            y_softskill: ['Aberto para experiências', 'Conscienciosidade', 'Extroversão', 'Instabilidade Emocional', 'Amabilidade'],
            tecnologia: "React.JS",
        },
        {
            x_media: [35, 49, 50, 11, 53],
            y_softskill: ['Aberto para experiências', 'Conscienciosidade', 'Extroversão', 'Instabilidade Emocional', 'Amabilidade'],
            tecnologia: "Python -> Dados",
        },
        {
            x_media: [35, 49, 50, 11, 53],
            y_softskill: ['Aberto para experiências', 'Conscienciosidade', 'Extroversão', 'Instabilidade Emocional', 'Amabilidade'],
            tecnologia: "Python -> Backend",
        },
        {
            x_media: [35, 49, 50, 11, 53],
            y_softskill: ['Aberto para experiências', 'Conscienciosidade', 'Extroversão', 'Instabilidade Emocional', 'Amabilidade'],
            tecnologia: "HTML",
        },
        {
            x_media: [35, 49, 50, 11, 53],
            y_softskill: ['Aberto para experiências', 'Conscienciosidade', 'Extroversão', 'Instabilidade Emocional', 'Amabilidade'],
            tecnologia: "Node",
        },
        {
            x_media: [35, 49, 50, 11, 53],
            y_softskill: ['Aberto para experiências', 'Conscienciosidade', 'Extroversão', 'Instabilidade Emocional', 'Amabilidade'],
            tecnologia: "R -> Dados",
        },
        {
            x_media: [35, 49, 50, 11, 53],
            y_softskill: ['Aberto para experiências', 'Conscienciosidade', 'Extroversão', 'Instabilidade Emocional', 'Amabilidade'],
            tecnologia: "C# -> Jogos",
        },
        {
            x_media: [35, 49, 50, 11, 53],
            y_softskill: ['Aberto para experiências', 'Conscienciosidade', 'Extroversão', 'Instabilidade Emocional', 'Amabilidade'],
            tecnologia: "Vue JS",
        },
    ];

    const tecnologiasData = ["Java -> Android", "Java -> Backend", "Swift", "React.JS", "Python -> Dados", "Python -> Backend", "HTML", "Node", "R -> Dados", "C# -> Jogos", "Vue.JS"];

    const selectSoftskill = (e) => {
        getSoftskills(e.target.value)
    }

    const selectOfertas = (e) => {
        getOfertas(e.target.value)
    }

    const selectProjetos = (e) => {
        getProjetos(e.target.value)
    }

    const selectFreelancers = (e) => {
        getFreelancers(e.target.value)
    }

    const selectAvaliacoes = (e) => {
        getAvaliacoes(e.target.value)
    }

    const selectCidades = (e) => {
        getCidades(e.target.value)
    }

    async function getSoftskills(tecnologia){
        await api.get(`/dashboard/softskills/${tecnologia}`,  {
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('@Hireit/token') 
            }
        })
        .then(response => {
            if(response.status === 200){
                let vetorNotas = []
                for(let i = 0; i < response.data.length; i++){
                    vetorNotas.push(response.data[i].notaSoftskill)
                }
                setDataSoftskill(vetorNotas)
            }
        }).catch( error => {
            console.log(error);
        })
    }

    async function getOfertas(tecnologia){
        await api.get(`/dashboard/ofertas/${tecnologia}`,  {
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('@Hireit/token') 
            }
        })
        .then(response => {
            if(response.status === 200){
                let vetor2019 = []
                let vetor2020 = []
                let vetor2021 = []
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].ano == "2019"){
                        vetor2019.push(response.data[i].quantidade)
                    }else if(response.data[i].ano == "2020"){
                        vetor2020.push(response.data[i].quantidade)
                    }else if(response.data[i].ano == "2021"){
                        vetor2021.push(response.data[i].quantidade)
                    }
                }
                setDataOfertas([vetor2019, vetor2020, vetor2021])
            }
        }).catch( error => {
            console.log(error);
        })
    }

    async function getAvaliacoes(tecnologia){
        await api.get(`/dashboard/avaliacoes/${tecnologia}`,  {
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('@Hireit/token') 
            }
        })
        .then(response => {
            if(response.status === 200){
                setDataAvaliacoes(response.data[0])

                switch(response.data[0].softskill){
                    case "Amabilidade":
                        setImgBoneco(require("../assets/img/boneco/amabilidade.png").default)
                        break;
                    case "Conscienciosidade":
                        setImgBoneco(require("../assets/img/boneco/conscienciosidade.png").default)
                        break;
                    case "Extroversão":
                        setImgBoneco(require("../assets/img/boneco/extroversao.png").default)
                        break;
                    case "Aberto para experiências":
                        setImgBoneco(require("../assets/img/boneco/experiencia.png").default)
                        break;
                    case "Instabilidade Emocional":
                        setImgBoneco(require("../assets/img/boneco/estabilidade.png").default)
                        break;
                }
            }
        }).catch( error => {
            console.log(error);
        })
    }

    async function getProjetos(tecnologia){
        await api.get(`/dashboard/projetos/${tecnologia}`,  {
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('@Hireit/token') 
            }
        })
        .then(response => {
            if(response.status === 200){
                let vetor2019 = []
                let vetor2020 = []
                let vetor2021 = []
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].ano == "2019"){
                        vetor2019.push(response.data[i].quantidade)
                    }else if(response.data[i].ano == "2020"){
                        vetor2020.push(response.data[i].quantidade)
                    }else if(response.data[i].ano == "2021"){
                        vetor2021.push(response.data[i].quantidade)
                    }
                }
                setDataProjetos([vetor2019, vetor2020, vetor2021])
            }
        }).catch( error => {
            console.log(error);
        })
    }

    async function getFreelancers(tecnologia){
        await api.get(`/dashboard/ofertas/${tecnologia}`,  {
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('@Hireit/token') 
            }
        })
        .then(response => {
            if(response.status === 200){
                let vetor2019 = []
                let vetor2020 = []
                let vetor2021 = []
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].ano == "2019"){
                        vetor2019.push(response.data[i].quantidade)
                    }else if(response.data[i].ano == "2020"){
                        vetor2020.push(response.data[i].quantidade)
                    }else if(response.data[i].ano == "2021"){
                        vetor2021.push(response.data[i].quantidade)
                    }
                }
                setDataFreelancers([vetor2019, vetor2020, vetor2021])
            }
        }).catch( error => {
            console.log(error);
        })
    }

    async function getCidades(tecnologia){
        await api.get(`/dashboard/cidades/${tecnologia}`,  {
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('@Hireit/token') 
            }
        })
        .then(response => {
            if(response.status === 200){
                let vetorCidade = [['City',   'Freelancers']]
                for(let i = 0; i < response.data.length; i++){
                    vetorCidade.push([response.data[i].cidade, response.data[i].quantidade])
                }
                setDataCidades(vetorCidade)
            }
        }).catch( error => {
            console.log(error);
        })
    }

    let Softskill = {
        labels: ['Aberto para experiências', 'Amabilidade', 'Consienciosidade', 'Extroversão', 'Instabilidade Emocional'],
        datasets: [{
            label: 'Porcentagem',
            data: dataSoftskill,
            backgroundColor: [
                '#FC85A8',
                '#D4F5BF',
                '#FEE3B8',
                '#A5E2F0',
                '#B5A5F6',
            ],
        }],
    }

    const graficoOfertas = {
        labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        datasets: [{
            label: '2019',
            data: dataOfertas[0],
            borderColor: '#57D4FF',
            backgroundColor: [
                '#57D4FF',
            ],
        },{
            label: '2020',
            data: dataOfertas[1],
            borderColor: '#F4D35B',
            backgroundColor: [
                '#F4D35B',
            ],
        },{
            label: '2021',
            data: dataOfertas[2],
            borderColor: '#FD7777',
            backgroundColor: [
                '#FD7777',
            ],
        }],
    };

    const graficoFreelancers = {
        labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        datasets: [{
            label: '2019',
            data: dataFreelancers[0],
            borderColor: '#57D4FF',
            backgroundColor: [
                '#57D4FF',
            ],
        },{
            label: '2020',
            data: dataFreelancers[1],
            borderColor: '#F4D35B',
            backgroundColor: [
                '#F4D35B',
            ],
        },{
            label: '2021',
            data: dataFreelancers[2],
            borderColor: '#FD7777',
            backgroundColor: [
                '#FD7777',
            ],
        }],
    };

    const graficoProjetos = {
        labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        datasets: [{
            label: '2019',
            data: dataProjetos[0],
            borderColor: '#57D4FF',
            backgroundColor: [
                '#57D4FF',
            ],
        },{
            label: '2020',
            data: dataProjetos[1],
            borderColor: '#F4D35B',
            backgroundColor: [
                '#F4D35B',
            ],
        },{
            label: '2021',
            data: dataProjetos[2],
            borderColor: '#FD7777',
            backgroundColor: [
                '#FD7777',
            ],
        }],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    useEffect(() => {
        getSoftskills("Java -> Android")
        getOfertas("Java -> Android")
        getProjetos("Java -> Android")
        getFreelancers("Java -> Android")
        getAvaliacoes("Java -> Android")
        getCidades("Java -> Android")
        setData(techData);
    }, []);

    return (
        <>
            <div className="bg-gray-100" >
                <ServicesNavbar />

                <div className="mb-8">
                    <Header/>
                </div>

                <div className="container">

                    <div className="big-numbers">
                        <div className="card-big-number">
                            <div className="w70">
                                <p className="titulo-big-number">Novos usuários</p>
                                <p className="numero-big-number">358</p>
                                <div className="line-big-number"></div>
                                <p className="desempenho-big-number">+12% na última semana</p>
                            </div>
                            <div className="w30">
                                <div className="icon-big-number">
                                <box-icon name='user' type='solid' color='#FFF' size="75px"></box-icon>
                                </div>
                            </div>
                            <div className="clear"></div>
                        </div>
                        <div className="card-big-number">
                            <div className="w70">
                                <p className="titulo-big-number">Contratos fechados</p>
                                <p className="numero-big-number">492</p>
                                <div className="line-big-number"></div>
                                <p className="desempenho-big-number">+3% na última semana</p>
                            </div>
                            <div className="w30">
                                <div className="icon-big-number">
                                <box-icon name='briefcase' type='solid' color='#FFF' size="75px"></box-icon>
                                </div>
                            </div>
                            <div className="clear"></div>
                        </div>
                        <div className="card-big-number">
                            <div className="w70">
                                <p className="titulo-big-number">Criando projetos outra vez</p>
                                <p className="numero-big-number">763</p>
                                <div className="line-big-number"></div>
                                <p className="desempenho-big-number ruim">-2% na última semana</p>
                            </div>
                            <div className="w30">
                                <div className="icon-big-number">
                                    <box-icon name='sync' color='#FFF' size="75px"></box-icon>
                                </div>
                            </div>
                            <div className="clear"></div>
                        </div>
                        <div className="card-big-number">
                            <div className="w70">
                                <p className="titulo-big-number">Oferecendo serviço outra vez</p>
                                <p className="numero-big-number">412</p>
                                <div className="line-big-number"></div>
                                <p className="desempenho-big-number">+1% na última semana</p>
                            </div>
                            <div className="w30">
                                <div className="icon-big-number">
                                    <box-icon name='sync' color='#FFF' size="75px"></box-icon>
                                </div>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>

                    {/* 1 */}
                    <div className="card-dashboard">
                        <div className="div-titulo-dashboard">
                            <div className="texto-dashboard">
                                <span className="titulo-dashboard">Ofertas Criadas</span>
                                <span className="subtitulo-dashboard">Quantidade de ofertas criadas nos últimos 3 anos</span>
                            </div>
                            <select
                                id="techList"
                                name="techList"
                                className="border mx-4 select-tecnologia"
                                onChange={(e) => { selectOfertas(e) }}
                            >
                                {tecnologiasData.map((item, index) => (
                                        <option
                                            value={item}
                                            key={index}
                                        >
                                            {item}
                                        </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <div className="grafico-dashboard">
                                <Line 
                                    id="myChart" 
                                    data={graficoOfertas} 
                                    options={options} 
                                    width={650} 
                                    height={175} 
                                />
                            </div>
                        </div>
                    </div>

                    {/* 2 */}
                    <div className="flex flex-row justify-between mb-5">
                        <div className="card-dashboard" style={{ width: "60%" }}>
                            <div className="div-titulo-dashboard">
                                <div className="texto-dashboard">
                                    <span className="titulo-dashboard">Softskill predominante</span>
                                    <span className="subtitulo-dashboard">Softskills predominantes nos usuários</span>
                                </div>
                                <select
                                    id="techList"
                                    name="techList"
                                    className="mx-4 select-tecnologia"
                                    onChange={(e) => { selectSoftskill(e) }}
                                >
                                    {tecnologiasData.map((item, index) => (
                                        <option
                                            value={item}
                                            key={index}
                                        >
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <div className="grafico-dashboard">
                                    <Bar id="myChart" data={Softskill} options={options} width={550} height={275} />
                                </div>
                            </div>
                        </div>

                        {/* bonequinho */}
                        <div className="card-dashboard" style={{width:"37%"}} >
                            <div className="div-titulo-dashboard" style={{height: "70px"}}>
                                <div className="texto-dashboard">
                                    <span className="titulo-dashboard">Melhores avaliados</span>
                                </div>
                                <select
                                    id="techList"
                                    name="techList"
                                    className="mx-4 select-tecnologia"
                                    style={{marginTop: "0px"}}
                                    onChange={(e) => { selectAvaliacoes(e) }}
                                    >
                                        {tecnologiasData.map((item, index) => (
                                            <option
                                                value={item}
                                                key={index}
                                            >
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                            </div>

                            <div className="flex flex-col justify-center mt-4">
                                <p className="text-md">
                                    Usuários são melhores avaliados quando possuem esse perfil predominante:
                                </p>
                                <p className="text-xl font-semibold">{dataAvaliacoes.softskill}</p>
                                <div className="div-boneco-mbti">
                                    <img 
                                        className="boneco-mbti"
                                        src={imgBoneco} 
                                        alt="Profile picture"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3 */}
                    <div className="flex flex-row justify-between mb-5">
                        <div className="card-dashboard" style={{width: "48%"}}>
                            <div className="div-titulo-dashboard">
                                <div className="texto-dashboard">
                                    <span className="titulo-dashboard">Freelancers buscados</span>
                                    <span className="subtitulo-dashboard">Quantidade de freelancers buscados nos últimos 3 anos</span>
                                </div>
                                <select
                                    id="techList"
                                    name="techList"
                                    className="border mx-4 select-tecnologia"
                                    onChange={(e) => { selectFreelancers(e) }}
                                >
                                    {tecnologiasData.map((item, index) => (
                                            <option
                                                value={item}
                                                key={index}
                                            >
                                                {item}
                                            </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <div className="grafico-dashboard" style={{width: "75%"}}>
                                    <Line 
                                        id="myChart" 
                                        data={graficoFreelancers} 
                                        options={options} 
                                        width={650} 
                                        height={350}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="card-dashboard" style={{width: "48%"}}>
                            <div className="div-titulo-dashboard">
                                <div className="texto-dashboard">
                                    <span className="titulo-dashboard">Projetos buscados</span>
                                    <span className="subtitulo-dashboard">Quantidade de projetos buscados nos últimos 3 anos</span>
                                </div>
                                <select
                                    id="techList"
                                    name="techList"
                                    className="border mx-4 select-tecnologia"
                                    onChange={(e) => { selectProjetos(e) }}
                                >
                                    {tecnologiasData.map((item, index) => (
                                        <option
                                            value={item}
                                            key={index}
                                        >
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <div className="grafico-dashboard" style={{width: "75%"}}>
                                    <Line 
                                        id="myChart" 
                                        data={graficoProjetos} 
                                        options={options} 
                                        width={650} 
                                        height={350} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row justify-between mb-5">
                        <div className="card-dashboard" style={{width: "48%", backgroundColor: "#81d4fa"}}>
                            <div className="div-titulo-dashboard">
                                <div className="texto-dashboard">
                                    <span className="titulo-dashboard">Mapa de freelancers</span>
                                    <span className="subtitulo-dashboard">Quantidade de freelancers nas capitais dos estados</span>
                                </div>
                                <select
                                    id="techList"
                                    name="techList"
                                    className="border mx-4 select-tecnologia"
                                    onChange={(e) => { selectCidades(e) }}
                                >
                                    {tecnologiasData.map((item, index) => (
                                            <option
                                                value={item}
                                                key={index}
                                            >
                                                {item}
                                            </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mapa-dashboard"><FreelancerChart google={google} arrayFreelancers={dataCidades} /></div>
                        </div>
                        <div className="card-dashboard" style={{width: "48%", backgroundColor: "#262626"}}>
                            <div className="div-titulo-dashboard">
                                <div className="texto-dashboard">
                                    <span className="titulo-dashboard">Wordcloud de buscas</span>
                                    <span className="subtitulo-dashboard">Wordcloud de buscas de freelancers no último mês</span>
                                </div>       
                            </div>
                            <div className="div-wordcloud">
                                <img className="img-dashboard" src={wordCloud}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}