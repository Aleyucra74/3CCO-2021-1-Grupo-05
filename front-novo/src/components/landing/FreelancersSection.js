import Title from 'components/landing/Title';
import TeamCard from 'components/landing/TeamCard';
import Image1 from 'assets/img/team-1-800x800.jpg';
import Image2 from 'assets/img/team-2-800x800.jpg';
import Image3 from 'assets/img/team-3-800x800.jpg';
import Image4 from 'assets/img/team-4-470x470.png';

export default function FreelancersSection() {
    return (
        <section className="pb-20 bg-gray-100">
            <div className="container max-w-7xl mx-auto px-4">
                <Title heading="Conheça nossos freelancers">
                    Esses são alguns de nossos freelancers destaques disponíveis
                    em nossa plataforma que já participaram de diferentes projetos
                    e receberam altas avaliações. Confira você mesmo.
                </Title>
                <div className="flex flex-wrap">
                    <TeamCard
                        img={Image1}
                        name="Fernando Fialho"
                        position="Web Developer"
                    />
                    <TeamCard
                        img={Image2}
                        name="Karol Conká"
                        position="Backend Developer"
                    />
                    <TeamCard
                        img={Image3}
                        name="Alexa Smith"
                        position="UI/UX Designer"
                    />
                    <TeamCard
                        img={Image4}
                        name="Jenna Kardi"
                        position="Backend Developer"
                    />
                </div>
            </div>
        </section>
    );
}
