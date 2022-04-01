import Card from '@material-tailwind/react/Card';
import CardImage from '@material-tailwind/react/CardImage';
import CardBody from '@material-tailwind/react/CardBody';
import H6 from '@material-tailwind/react/Heading6';
import LeadText from '@material-tailwind/react/LeadText';
import Paragraph from '@material-tailwind/react/Paragraph';
import Button from '@material-tailwind/react/Button';
import Dashimg from 'assets/img/dashimg.png';

//paragrafo com espaçamento para conseguir quebra de linha (linha 19/45).
export default function TechSection() {
    return (
        <section className="pb-20 bg-white-100 mb-10">
          <div className="container max-w-7xl mx-auto px-4">
             <div className="flex flex-wrap items-center mt-32">
                  <div className="w-full md:w-5/12 px-4 mx-auto">
                  <div className="flex justify-center mt-10">
                  <span font-style="lighter"><span color="gray" className="text-3xl" style={{fontWeight: 'bold', fontFamily: 'Roboto'}}>Hire-IT</span>ANALYTICS</span>
                            <p> ⠀</p>
                            <a
                                href="/Login"
                                rel="noreferrer"
                            >
                                <Button
                                    color="lightBlue"
                                    buttonType="filled"
                                    size="small"
                                    rounded={false}
                                    block={false}
                                    iconOnly={false}
                                    ripple="light"
                                    style={{fontWeight: 'normal', fontFamily: 'Roboto'}}
                                >
                                    NOVO
                                </Button>
                            </a>
                        </div>
                        <LeadText color="blueGray">
                          <span className="text-3xl" style={{fontWeight: 'normal', fontFamily: 'Roboto'}}>Complemente a analise de dados da sua companhia</span>
                        </LeadText>
                        <LeadText color="blueGray">
                        Com ela conseguimos captar dados importantes para medir o 
                        desempenho das tecnologias utilizadas e também as principais 
                        softskil dos perfis.
                        <p> ⠀⠀</p>
                        Os dados recolhidos pelo HIRE-IT Analytics são transformados em gráficos. 
                        E com base nos gráficos você pode traçar estratégias e
                        metas para o seu sucesso.
                        </LeadText>
                    </div>

                    <div className="w-full md:w-4/12 px-4 mx-auto flex justify-center mt-24 lg:mt-0">
                        <Card>
                            <CardImage alt="Card Image" src={Dashimg} />
                            <CardBody>
                                <H6 color="gray">Facilidade, Personalização e Acompanhamento</H6>
                                <Paragraph color="blueGray">
                                  Montamos a melhor plataforma de dados para diversificar 
                                  suas pesquisas de analise de mercado.
                                </Paragraph>
                            </CardBody>
                        </Card>
                    </div>
                </div>
          </div>
        </section>
    );
}

