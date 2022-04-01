import Title from 'components/landing/Title';
import TeamCard from 'components/landing/TeamCard';
import Image1 from 'assets/img/bandtec-logo.png';
import Image2 from 'assets/img/c6-logo.png';
import Image3 from 'assets/img/deloitte-logo.jpg';
import Image4 from 'assets/img/b3-logo.png';

export default function CompaniesSection() {
    return (
        <section className="pt-20 pb-20 bg-gray-100">
            <div className="container max-w-7xl mx-auto px-4">
                <Title heading="Conheça nossas empresas">
                    Essas são algumas empresas cadastradas em nosso site e
                    que estão em busca de profissionais para seus projetos.
                    Se interessou em trabalhar em alguma? Faça seu cadastro agora mesmo.
                </Title>
                <div className="flex flex-wrap">
                    <TeamCard
                        img={Image1}
                        name="Bandtec Digital School"
                        position="Faculdade de tecnologia"
                    />
                    <TeamCard
                        img={Image2}
                        name="C6 Bank"
                        position="Banco digital moderno"
                    />
                    <TeamCard
                        img={Image3}
                        name="Deloitte"
                        position="Auditoria e consultoria empresarial"
                    />
                    <TeamCard
                        img={Image4}
                        name="B3"
                        position="Bolsa de valores Brasileira"
                    />
                </div>
            </div>
        </section>
    );
}
