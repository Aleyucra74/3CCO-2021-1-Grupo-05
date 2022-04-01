import { React, useState, useContext } from 'react';
import Navbar from '@material-tailwind/react/Navbar';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';
import NavbarBrand from '@material-tailwind/react/NavbarBrand';
import NavbarToggler from '@material-tailwind/react/NavbarToggler';
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse';
import Nav from '@material-tailwind/react/Nav';
import NavItem from '@material-tailwind/react/NavItem';
import NavLink from '@material-tailwind/react/NavLink';
import Button from '@material-tailwind/react/Button';
import Image from '@material-tailwind/react/Image';
import LogoCube from 'assets/img/logo-nav.png';
import { useLocation, Link, useHistory } from "react-router-dom";

import StoreContext from './store/Context';

export default function DefaultNavbar() {
    const [openNavbar, setOpenNavbar] = useState(false);
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const history = useHistory();
    const {token} = useContext(StoreContext);
    
        // AO SER CHAMADO RESETA  OS DADOS DA SESSION
    const Logout = () => {
        localStorage.removeItem("token");
        history.push("/login");
        sessionStorage.clear();
        // window.location.reload();
        history.go(0);
    }

    return (
        <>
        <div id="div-nav" className="absolute w-full z-20">
        <Navbar color="transparent" navbar>
            <NavbarContainer>
                <NavbarWrapper>
                    <a
                        href="/Projetos"
                        rel="noreferrer"
                    >
                        <NavbarBrand>
                            <Image 
                                src={LogoCube} 
                                className="w-36"
                            />
                        </NavbarBrand>
                    </a>
                    <NavbarToggler
                        onClick={() => setOpenNavbar(!openNavbar)}
                        color="white"
                    />
                </NavbarWrapper>

                <NavbarCollapse open={openNavbar}>
                    <Nav>
                    <NavLink href="/Projetos"
                             ripple="light"
                             active={splitLocation[1] === "Projetos" ? "light" : ""} 
                             >Projetos</NavLink>
                    <NavLink href="/Freelancers"
                             active={splitLocation[1] === "Freelancers" ? "light" : ""} 
                             ripple="light"> 
                             Freelancers </NavLink>
                    <NavLink href="/Teste-Personalidade" 
                             ripple="light"
                             active={splitLocation[1] === "Teste-Personalidade" ? "light" : ""} 
                             >Teste Personalidade</NavLink>
                    <NavLink href="/perfil/sobre" 
                             ripple="light"
                             active={splitLocation[1] === "Profile" ? "light" : ""} 
                             >Perfil</NavLink>
                    <NavLink href="/Dashboard" 
                             ripple="light"
                             active={splitLocation[1] === "Dashboard" ? "light" : ""} 
                             >Dashboard</NavLink>
                        <div className="flex flex-col z-50 lg:flex-row lg:items-center">
                            <a href="/Login" rel="noreferrer">
                                <Button
                                    color="transparent"
                                    className="bg-white text-black ml-4"
                                    ripple="dark"
                                    onClick={Logout}
                                >
                                    Logout
                                </Button>
                            </a>
                        </div>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
        </div>
        <div style={{ paddingBottom: "10%" }}/>
        </>
    );
}
