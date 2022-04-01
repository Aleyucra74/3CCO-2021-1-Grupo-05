import ServicesNavbar from 'components/ServicesNavbar';
import BuscaSecao from 'components/listaProjetos/BuscaSecao';
import FiltroSecao from 'components/listaProjetos/FiltroSecao';
import ProjetosSecao from 'components/listaProjetos/ProjetosSecao';

export default function ListaProjetos() {
    return (
        <>
            <div className="bg-gray-100">
            <ServicesNavbar />
            <main className="container w-full" >
                <BuscaSecao/>
                <div className="px-10 pt-10 h-full">
                    <div className="container">
                        <FiltroSecao/>
                        <ProjetosSecao/>
                        <br/>
                        <br/>
                    </div>
                </div>
            </main>
            </div>
        </>
    );
}