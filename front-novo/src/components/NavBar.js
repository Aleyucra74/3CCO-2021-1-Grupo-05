import LogoCube from 'assets/img/logo-nav.png';
import Image from '@material-tailwind/react/Image';
import Button from '@material-tailwind/react/Button';

import "../assets/styles/navBar.css"

export default function NavBarLogado() {
    return (
    <div className="flex flex-col z-50 lg:flex-row lg:items-center">
    <section className="relative mx-auto">
    <nav className="flex justify-between bg-gray-900 text-white w-screen" id="container-navBar">
      <div className="px-5 flex w-full items-center">
        <a className="text-3xl font-bold font-heading" href="#">
        <Image 
            src={LogoCube} 
            className="w-36"
        />
        </a>
        <ul className="md:flex px-4 mx-auto lg:items-center font-semibold font-heading space-x-12" id="navBar-itens">
          <li><a className="hover:text-gray-200" href="#">Home</a></li>
          <li><a className="hover:text-gray-200" href="#">Freelancers</a></li>
          <li><a className="hover:text-gray-200" href="#">Projetos</a></li>
          <li><a className="hover:text-gray-200" href="#">Perfil</a></li>
        </ul>
        <Button  color="transparent" className="bg-white text-black ml-4" id="navBarButton" ripple="dark"> 
            Logout 
        </Button>
      </div>
    </nav>
    </section>
    </div>
    );
}