import DefaultNavbar from 'components/DefaultNavbar';
import DefaultFooter from 'components/DefaultFooter';
import Header from 'components/landing/Header';
import InfoSection from 'components/landing/InfoSection';
import FreelancersSection from 'components/landing/FreelancersSection';
import CompaniesSection from 'components/landing/CompaniesSection';
import TechSection from 'components/landing/TechSection';
import RegisterSection from 'components/landing/RegisterSection';

import '../assets/styles/global.css'
import { useEffect } from 'react';

export default function Landing() {
    useEffect(() => {
        document.querySelector('body').style.backgroundColor = 'rgba(245, 245, 245, var(--tw-bg-opacity))';
     }, []);
    return (
        <>
            <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>
            <main>
                <Header />
                <InfoSection />
                <CompaniesSection/> 
                <FreelancersSection />
                <TechSection/>
                <RegisterSection/>
            </main>
            <DefaultFooter />
        </>
    );
}
