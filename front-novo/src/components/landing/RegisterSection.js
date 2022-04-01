import H3 from '@material-tailwind/react/Heading3';
import Paragraph from '@material-tailwind/react/Paragraph';
import Button from '@material-tailwind/react/Button';

export default function RegisterSection() {
    return (
        <section className="pt-20 pb-4 bg-gray-100">
            <div className="container max-w-7xl mx-auto px-4">
                    <div className="flex-auto p-5 lg:p-10">
                        <div className="w-full text-center">
                            <H3 color="gray">Gostou do que viu?</H3>
                            <Paragraph color="blueGray">
                                Faça seu cadastro agora e aproveite
                                de nossos serviços.
                            </Paragraph>
                        </div>
                        <div className="flex justify-center mt-10">
                            <a
                                href="/Cadastro"
                                rel="noreferrer"
                            >
                                <Button
                                    color="lightBlue"
                                    buttonType="filled"
                                    size="lg"
                                    rounded={false}
                                    block={false}
                                    iconOnly={false}
                                    ripple="light"
                                >
                                    Eu quero me cadastrar!
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
        </section>
    );
}
