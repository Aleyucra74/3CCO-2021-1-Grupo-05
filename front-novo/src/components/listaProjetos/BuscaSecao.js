import H3 from '@material-tailwind/react/Heading3';
import InputIcon from "@material-tailwind/react/InputIcon";

export default function BuscaSecao() {
    return (
        <>
            <div className="flex content-center justify-center">
                <div className="container max-w-8xl relative mx-auto">
                    <div className="justify-center flex flex-wrap">
                        <div className="lg:w-4/12 ml-auto mr-auto text-center pb-6">
                            <H3 color="black" >Encontre uma vaga</H3>
                            <InputIcon
                                type="text"
                                color="blueGray"
                                size="small"
                                outline={true}
                                iconFamily="material-icons"
                                iconName="search"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <hr className="title-hr ml-auto mr-auto"/>
        </>
    );
}