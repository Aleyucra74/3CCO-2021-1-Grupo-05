import H2 from '@material-tailwind/react/Heading2';
import LeadText from '@material-tailwind/react/LeadText';
import Logo from 'assets/img/logo.png';
import Image from '@material-tailwind/react/Image';
export default function Header() {
    return (
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center h-screen">
            <div className="bg-landing-background bg-cover bg-center absolute top-0 w-full h-full" />
            <div className="container max-w-8xl relative mx-auto">
                <div className="items-center flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                        <div className="flex justify-center">
                            <Image
                                src={Logo}
                                rounded={false}
                                raised={false}
                                alt="Hire IT Logo Image"
                            />
                        </div>
                        <div className="bg-white-100">
                            <LeadText color="white">
                                Encontre o freelancer ou o projeto ideal para 
                                se trabalhar! Aqui você tem tudo em um
                                só lugar, então aproveite agora de nossos
                                serviços e dê um up na sua carreira ou projeto!
                            </LeadText>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
