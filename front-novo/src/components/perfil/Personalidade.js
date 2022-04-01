import { Bar } from 'react-chartjs-2'

import { useState, useEffect } from 'react'

import api from '../../api';

export default function Personalidade(props){
    let [notaSoftskill, setNotaSoftskill] = useState({
        experiencias: 0,
        conscienciosidade: 0,
        extroversao: 0,
        instabilidade: 0,
        amabilidade: 0,
        unchange: true
    });

    async function getSoftskills(){
        await api.get(`/softskills/usuario/${props.idUsuario}`,  {
            headers: {
              Authorization: 'Bearer ' + props.token 
            }
        })
        .then(response => {
            if(response.status === 200){
                let experiencia, conscienciosidade, extroversao, instabilidade, amabilidade;

                for(let i = 0; i < response.data.length; i++){
                    switch(response.data[i].softskill.idSoftSkills){
                        case 1:
                            experiencia = response.data[i].notaSoftskill
                            break;
                        case 2:
                            conscienciosidade = response.data[i].notaSoftskill
                            break;
                        case 3:
                            extroversao = response.data[i].notaSoftskill
                            break;
                        case 4:
                            instabilidade = response.data[i].notaSoftskill
                            break;
                        case 5:
                            amabilidade = response.data[i].notaSoftskill
                            break;
                    }
                }

                setNotaSoftskill({...notaSoftskill,
                    experiencias: experiencia,
                    conscienciosidade: conscienciosidade,
                    extroversao: extroversao,
                    instabilidade: instabilidade,
                    amabilidade: amabilidade,
                })

                document.getElementById("grafico").style.display = "block";
            }else if(response.status === 204) {
                document.getElementById("teste").style.display = "block";
            }
        }).catch( error => {
            console.log(error.toJSON());
        })
    }

    useEffect(() => {
        getSoftskills()
    }, [notaSoftskill.unchange])

    return <div className="container-perfil">
        <p className="titulo-perfil" style={{fontSize: "24px"}}>Resultado do teste de personalidade</p>
        <div id="teste" className="teste-personalidade">Usuário não respondeu os testes</div>
        <div id="grafico" className="grafico-personalidade">
            <Bar 
                height={100}
                width={150}
                data={{
                    labels: ['Abertura para a experiência', 'Conscienciosidade', 'Extroversão', 'Instabilidade emocional', 'Amabilidade'],
                    datasets: [
                        {
                            label: "Resultado no teste de personalidade",
                            data: [
                                notaSoftskill.experiencias, 
                                notaSoftskill.conscienciosidade,
                                notaSoftskill.extroversao,
                                notaSoftskill.instabilidade,
                                notaSoftskill.amabilidade],
                            backgroundColor:[
                                '#E95D7F',
                                '#90EBFF',
                                '#5DE9A6',
                                '#FAE392',
                                '#F5AEEA',
                            ]
                        },
                    ],
                }}
            />
        </div>
        <div>
            <p className="titulo-perfil">Neurocetismo</p>
            <p className="texto-perfil texto-longo">
                Neuroticismo é a tendência para experienciar emoções negativas, como raiva, ansiedade ou depressão. Por vezes é chamada de instabilidade emocional. Aqueles com um grau elevado de neuroticismo são emocionalmente reactivos e vulneráveis ao stress. Estes estão mais predispostos a interpretar situações normais como sendo ameaçadoras, e pequenas frustrações como dificuldades sem esperança. As suas reações emocionais negativas tendem a persistir por períodos invulgarmente longos, o que significa que eles estão usualmente com má disposição. Esses problemas na regulação emocional podem diminuir a capacidade dessas pessoas para pensar claramente, tomar decisões e lidar de forma apropriada com o stress.
            </p>
            <p className="texto-perfil texto-longo">
                No outro extremo da escala, indivíduos com baixo neuroticismo são mais difíceis de serem perturbados e são menos reativos emocionalmente. Eles tendem a ser calmos, emocionalmente estáveis, e livres de sentimentos negativos persistentes; no entanto, a escassez de sentimentos negativos não significa necessariamente que estes indivíduos experimentem muitos sentimentos positivos.
            </p>
        </div>
        <div>
            <p className="titulo-perfil">Extroversão</p>
            <p className="texto-perfil texto-longo">
                Extroversão é caracterizada por emoções positivas e pela tendência para procurar estimulação e a companhia dos outros. Este traço é marcado pelo profundo envolvimento com o mundo exterior. Os extrovertidos gostam de estar com pessoas, e são usualmente vistos como sendo cheios de energia. Eles tendem a ser indivíduos entusiastas e virados para a ação, que provavelmente dizem “Sim!” ou “Vamos a isso!” perante oportunidades de excitação. Em grupos eles tendem a ser faladores, assertivos e a chamar as atenções para si.
            </p>
            <p className="texto-perfil texto-longo">
                Os introvertidos não têm a exuberância social e os níveis de atividade dos extrovertidos. Eles tendem a parecer calmos, ponderados e menos envolvidos com o mundo social. A sua falta de envolvimento social não deve ser interpretada como timidez ou depressão. Os introvertidos simplesmente necessitam de menos estimulação e de mais tempo sozinhos do que os extrovertidos. Eles podem ser bastante ativos e enérgicos, mas não socialmente.    
            </p>
        </div>
        <div>
            <p className="titulo-perfil">Agradabilidade</p>
            <p className="texto-perfil texto-longo">
                Agradabilidade é a tendência para ser compassivo e cooperante em vez de suspeitoso e antagonista face aos outros. Este traço reflete diferenças individuais na preocupação com a harmonia social. Indivíduos “amáveis” valorizam a boa relação com os outros. Eles são geralmente respeitosos, amigáveis, generosos, prestáveis e dispostos a fazer compromissos. Pessoas “amigáveis” têm também uma visão otimista da natureza humana. Elas acreditam que as pessoas são basicamente honestas, decentes e dignas de confiança.
            </p>
            <p className="texto-perfil texto-longo">
                Indivíduos “não-amigáveis” põem o interesse próprio acima da boa relação com os outros. Eles normalmente não se preocupam com o bem-estar dos outros, e por vezes o seu ceticismo acerca dos motivos dos outros fá-los ser desconfiados e pouco cooperativos.
            </p>
        </div>
        <div>
            <p className="titulo-perfil">Conscienciosidade</p>
            <p className="texto-perfil texto-longo">
                Conscienciosidade é a tendência para mostrar autodisciplina, orientação para os deveres e para atingir os objetivos. Este traço mostra uma preferência pelo comportamento planejado em vez do espontâneo. Influencia a maneira como controlamos e dirigimos os nossos impulsos.
            </p>
        </div>
        <div>
            <p className="titulo-perfil">Abertura para a experiência</p>
            <p className="texto-perfil texto-longo">
                Abertura é o interesse pela arte, emoção, aventura, ideias fora do comum, imaginação, curiosidade, e variedade de experiências. Este traço distingue as pessoas imaginativas das “terra-a-terra” e convencionais. As pessoas com elevada abertura são intelectualmente curiosas, apreciadoras da arte, e sensíveis à beleza. Elas tendem a ser, comparadas com as pessoas “fechadas”, mais criativas, a prestar mais atenção aos seus sentimentos e a terem opiniões não convencionais.
            </p>
            <p className="texto-perfil texto-longo">
                As pessoas com baixo grau de abertura tendem a ter interesses mais convencionais e tradicionais. Elas preferem o simples, claro e óbvio ao complexo, ambíguo e subtil. Elas podem ver as artes e as ciências com suspeita ou achá-las desinteressantes.
            </p>
        </div>
    </div>
}