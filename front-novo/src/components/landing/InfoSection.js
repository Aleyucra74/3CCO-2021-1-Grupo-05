import Card from '@material-tailwind/react/Card';
import CardImage from '@material-tailwind/react/CardImage';
import CardBody from '@material-tailwind/react/CardBody';
import Icon from '@material-tailwind/react/Icon';
import H4 from '@material-tailwind/react/Heading4';
import H6 from '@material-tailwind/react/Heading6';
import LeadText from '@material-tailwind/react/LeadText';
import Paragraph from '@material-tailwind/react/Paragraph';
import StatusCard from 'components/landing/StatusCard';
import Teamwork from 'assets/img/teamwork.jpeg';

export default function InfoSection() {
    return (
        <section className="pb-20 bg-white-100 -mt-32">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap relative z-50">
                    <StatusCard 
                        color="red" 
                        icon="stars" 
                        title="Quem somos?"
                    >
                        Somos uma plataforma que une projetos aos freelancers, 
                        possibilitando o match mais perfeito entre as duas pontas 
                        utilizando das melhores tecnologias para isso. 

                    </StatusCard>
                    <StatusCard
                        color="lightBlue"
                        icon="autorenew"
                        title="Objetivo"
                    >
                        Nosso objetivo é mudar a forma de recrutamento atual, visando 
                        a melhora e a rapidez do mesmo. Jutando a empresa ao profissional, 
                        todo o resto será possível.
                    </StatusCard>
                    <StatusCard
                        color="teal"
                        icon="fingerprint"
                        title="Evolução"
                    >
                        Acreditamos fortemente no bem-estar de nossos usuários, e por isso 
                        queremos unir o útil ao agradável. Uma plataforma que une os melhores 
                        profissionais a grandes projetos.  
                    </StatusCard>
                </div>

                <div className="flex flex-wrap items-center mt-32">
                    <div className="w-full md:w-5/12 px-4 mx-auto">

                        <H4 color="gray">A Hire IT está aqui para ajudar...</H4>
                        <LeadText color="blueGray">
                            Se você é um profissional em busca do projeto que seja 
                            compatível com suas habilidades técnicas e socioemocional, 
                            você está no lugar certo. Cadastre sua oferta agora e 
                            encontre o projeto perfeito que atenda seus critérios.
                        </LeadText>
                        <LeadText color="blueGray">
                            Ou se você tem um projeto e está em busca de profissionais
                            temporários para compor seu time, entendemos suas dificuldades,
                            e é por isso que seu lugar também é aqui. Cadastre seu 
                            projeto e encontre os melhores freelancers!
                        </LeadText>
                    </div>

                    <div className="w-full md:w-4/12 px-4 mx-auto flex justify-center mt-24 lg:mt-0">
                        <Card>
                            <CardImage alt="Card Image" src={Teamwork} />
                            <CardBody>
                                <H6 color="gray">Tecnologia de ponta!</H6>
                                <Paragraph color="blueGray">
                                    Encontrou o que queria? Deixa o resto com a gente!
                                    Com nossas tecnologias e algoritmos de ponta, cuidamos
                                    para que desde os nossos testes até o match final você 
                                    tenha o melhor resultado.
                                </Paragraph>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
