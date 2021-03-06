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
        <div id="teste" className="teste-personalidade">Usu??rio n??o respondeu os testes</div>
        <div id="grafico" className="grafico-personalidade">
            <Bar 
                height={100}
                width={150}
                data={{
                    labels: ['Abertura para a experi??ncia', 'Conscienciosidade', 'Extrovers??o', 'Instabilidade emocional', 'Amabilidade'],
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
                Neuroticismo ?? a tend??ncia para experienciar emo????es negativas, como raiva, ansiedade ou depress??o. Por vezes ?? chamada de instabilidade emocional. Aqueles com um grau elevado de neuroticismo s??o emocionalmente reactivos e vulner??veis ao stress. Estes est??o mais predispostos a interpretar situa????es normais como sendo amea??adoras, e pequenas frustra????es como dificuldades sem esperan??a. As suas rea????es emocionais negativas tendem a persistir por per??odos invulgarmente longos, o que significa que eles est??o usualmente com m?? disposi????o. Esses problemas na regula????o emocional podem diminuir a capacidade dessas pessoas para pensar claramente, tomar decis??es e lidar de forma apropriada com o stress.
            </p>
            <p className="texto-perfil texto-longo">
                No outro extremo da escala, indiv??duos com baixo neuroticismo s??o mais dif??ceis de serem perturbados e s??o menos reativos emocionalmente. Eles tendem a ser calmos, emocionalmente est??veis, e livres de sentimentos negativos persistentes; no entanto, a escassez de sentimentos negativos n??o significa necessariamente que estes indiv??duos experimentem muitos sentimentos positivos.
            </p>
        </div>
        <div>
            <p className="titulo-perfil">Extrovers??o</p>
            <p className="texto-perfil texto-longo">
                Extrovers??o ?? caracterizada por emo????es positivas e pela tend??ncia para procurar estimula????o e a companhia dos outros. Este tra??o ?? marcado pelo profundo envolvimento com o mundo exterior. Os extrovertidos gostam de estar com pessoas, e s??o usualmente vistos como sendo cheios de energia. Eles tendem a ser indiv??duos entusiastas e virados para a a????o, que provavelmente dizem ???Sim!??? ou ???Vamos a isso!??? perante oportunidades de excita????o. Em grupos eles tendem a ser faladores, assertivos e a chamar as aten????es para si.
            </p>
            <p className="texto-perfil texto-longo">
                Os introvertidos n??o t??m a exuber??ncia social e os n??veis de atividade dos extrovertidos. Eles tendem a parecer calmos, ponderados e menos envolvidos com o mundo social. A sua falta de envolvimento social n??o deve ser interpretada como timidez ou depress??o. Os introvertidos simplesmente necessitam de menos estimula????o e de mais tempo sozinhos do que os extrovertidos. Eles podem ser bastante ativos e en??rgicos, mas n??o socialmente.    
            </p>
        </div>
        <div>
            <p className="titulo-perfil">Agradabilidade</p>
            <p className="texto-perfil texto-longo">
                Agradabilidade ?? a tend??ncia para ser compassivo e cooperante em vez de suspeitoso e antagonista face aos outros. Este tra??o reflete diferen??as individuais na preocupa????o com a harmonia social. Indiv??duos ???am??veis??? valorizam a boa rela????o com os outros. Eles s??o geralmente respeitosos, amig??veis, generosos, prest??veis e dispostos a fazer compromissos. Pessoas ???amig??veis??? t??m tamb??m uma vis??o otimista da natureza humana. Elas acreditam que as pessoas s??o basicamente honestas, decentes e dignas de confian??a.
            </p>
            <p className="texto-perfil texto-longo">
                Indiv??duos ???n??o-amig??veis??? p??em o interesse pr??prio acima da boa rela????o com os outros. Eles normalmente n??o se preocupam com o bem-estar dos outros, e por vezes o seu ceticismo acerca dos motivos dos outros f??-los ser desconfiados e pouco cooperativos.
            </p>
        </div>
        <div>
            <p className="titulo-perfil">Conscienciosidade</p>
            <p className="texto-perfil texto-longo">
                Conscienciosidade ?? a tend??ncia para mostrar autodisciplina, orienta????o para os deveres e para atingir os objetivos. Este tra??o mostra uma prefer??ncia pelo comportamento planejado em vez do espont??neo. Influencia a maneira como controlamos e dirigimos os nossos impulsos.
            </p>
        </div>
        <div>
            <p className="titulo-perfil">Abertura para a experi??ncia</p>
            <p className="texto-perfil texto-longo">
                Abertura ?? o interesse pela arte, emo????o, aventura, ideias fora do comum, imagina????o, curiosidade, e variedade de experi??ncias. Este tra??o distingue as pessoas imaginativas das ???terra-a-terra??? e convencionais. As pessoas com elevada abertura s??o intelectualmente curiosas, apreciadoras da arte, e sens??veis ?? beleza. Elas tendem a ser, comparadas com as pessoas ???fechadas???, mais criativas, a prestar mais aten????o aos seus sentimentos e a terem opini??es n??o convencionais.
            </p>
            <p className="texto-perfil texto-longo">
                As pessoas com baixo grau de abertura tendem a ter interesses mais convencionais e tradicionais. Elas preferem o simples, claro e ??bvio ao complexo, amb??guo e subtil. Elas podem ver as artes e as ci??ncias com suspeita ou ach??-las desinteressantes.
            </p>
        </div>
    </div>
}