import ServicesNavbar from 'components/ServicesNavbar';
import Header from '../components/listaFreelancers/Header.js';
import FreelaListSection from '../components/listaFreelancers/FreelaListSection.js';
import "../assets/styles/freelancer.css";

export default function Freelancers() {
    return (
        <>
        <div className="bg-gray-100">
            <ServicesNavbar />
        </div>
            <main>
                <Header/>
                <FreelaListSection/>
            </main>
        </>
    );
}
