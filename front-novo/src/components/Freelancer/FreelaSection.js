import React, { useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import NoUserPic from "assets/img/no-user.jpg";

import Image8 from "assets/img/tecnologias/c.svg";
import Image6 from "assets/img/tecnologias/c#.svg";
import Image7 from "assets/img/tecnologias/c++.svg";
import Image11 from "assets/img/tecnologias/cobol.svg";
import Image1 from "assets/img/tecnologias/java.svg";
import Image3 from "assets/img/tecnologias/mysql.svg";
import Image10 from "assets/img/tecnologias/python.svg";
import Image9 from "assets/img/tecnologias/r.svg";
import Image5 from "assets/img/tecnologias/react.svg";
import Image2 from "assets/img/tecnologias/spring.svg";
import Image4 from "assets/img/tecnologias/sqlserver.svg";
import NoImage from "assets/img/tecnologias/no-image.png";
import HandShake from "../../assets/img/maozinha.svg";
import C6Logo from "../../assets/img/c6-logo.png";
import B3Logo from "../../assets/img/b3-logo.png";

import "../../assets/styles/freelancer.css";
import CardBody from "@material-tailwind/react/CardBody";
import H6 from "@material-tailwind/react/Heading6";
import Button from "@material-tailwind/react/Button";
import api from "../../api";
import Image from "@material-tailwind/react/Image";
import Input from "@material-tailwind/react/Input";
import ContratanteSecao from "components/projeto/ContratanteSecao";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import TecnologiaComponent from "../projeto/tecnologias/TecnologiaComponent";
import HabilidadeComponent from '../projeto/habillidades/HabilidadeComponent';
import Heading4 from '@material-tailwind/react/Heading4';
import Heading5 from '@material-tailwind/react/Heading5';
import Heading6 from '@material-tailwind/react/Heading6';
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ClosingAlert from "@material-tailwind/react/ClosingAlert";
import { ToastContainer, toast } from 'react-toastify';

export default function FreelaSection(props) {
  const [isLoading, setLoading] = useState(true);
  const [oferta, setOferta] = useState({});
  const [tecnologiasOferta, setTecnologiasOferta] = useState([]);
  const [softskillsUsuario, setSoftskillsUsuario] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  function notificaSucesso() {
    toast.success(
      'Contrato criado com sucesso', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "success-toast"
      }
    )
    console.log("criado")
  }

  async function getOfertaById(id) {
    const response = await api.get(`/ofertas/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("@Hireit/token")}`,
      },
    });
    console.log(response.data);
    setOferta(response.data);
    getTecnologiasByOferta(id);
  }

  async function getTecnologiasByOferta(idOferta) {
    const response = await api.get(`/tecnologias/oferta/${idOferta}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("@Hireit/token")}`,
      },
    });
    console.log(response.data);
    setTecnologiasOferta(response.data);
/*     getSoftskillsByUser(oferta.usuario.idUsuario.toString() === sessionStorage.getItem("@Hireit/idUsuario"));
 */    setLoading(false);
  }

  async function getSoftskillsByUser(idUsuario) {
    const response = await api.get(`/softskills/usuario/${idUsuario}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("@Hireit/token")}`,
      },
    });
    console.log("-----------------")
    console.log(response.data);
    console.log("-----------------")
    setSoftskillsUsuario(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getOfertaById(id);
  }, []);

  if (isLoading) {
    return (
      <section className="pt-48 w-full max-w-8x1 px-4 overflow-auto pb-64">
        {" "}
        <div className="w-300 center">
          <div className="lds-ring flex">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>{" "}
        </div>{" "}
      </section>
    );
  }

  function habilidadeImage(id) {
    switch (id) {
      case 1:
        return Image1;
      case 2:
        return Image2;
      case 3:
        return Image3;
      case 4:
        return Image4;
      case 5:
        return Image5;
      case 6:
        return Image6;
      case 7:
        return Image7;
      case 8:
        return Image8;
      case 9:
        return Image9;
      case 10:
        return Image10;
      case 11:
        return Image11;
      default:
        return NoImage;
    }
  }

  function changePropostas() {
    var propostas = document.getElementById("propostas");
    var propostasButton = document.getElementById("propostasButton");
    if (propostas.classList.contains("hidden")) {
      propostas.classList.remove("hidden");
      propostasButton.firstChild.textContent = "Ocultar propostas";
    } else {
      propostas.classList.add("hidden");
      propostasButton.firstChild.textContent = "Ver propostas";
    }
  }

  return (
    <>
      <Modal className="flex flex-col justify-center mwidth" size="lg" active={showModal} toggler={() => setShowModal(false)}>
        <ModalHeader
          toggler={() => setShowModal(false)}
        >
          <Heading4>
            Criar Contrato
          </Heading4>
        </ModalHeader>
        <ModalBody className="container flex flex-col mwidth">
          <div className="flex flex-row mb-5">
            <Image
              className="w-24 shadow-none mleft"
              src={NoUserPic}
              alt="Profile picture"
              raised
            />
            <Image
              className="w-24 shadow-none"
              src={HandShake}
              alt="Profile picture"
              raised
            />
            <Image
              className="w-24 shadow-none mleft"
              src={B3Logo}
              alt="Profile picture"
              raised
            />
          </div>
          <div className="flex flex-col">
            <div
              className="mbottom px-5"
            >
              <Input
                type="number"
                color="cyan"
                size="regular"
                outline={true}
                placeholder="Valor Acordado:"
              />
            </div>
            <div
              className="px-5"
            >
              <Input
                type="date"
                color="cyan"
                size="regular"
                outline={true}
                placeholder="Data de termino:"
              />
            </div>
          </div>
        </ModalBody>
          <div  className="flex justify-center">
          {/* <Link to={"/contrato"}> */}
            <Button
              className="blue-bgc hover:shadow-none shadow-none active:bg-transparent focus:bg-transparent"
              onClick={function (e) {
                /* notificaSucesso(); */
                alert("Contrato criado com sucesso")
                setShowModal(false);
              }}
            >
              Criar Contrato
            </Button>
            {/* </Link> */}
          </div>
      </Modal>

      <section className="pt-8 w-full max-w-8x1 px-4 bg-gray-100 overflow-auto pb-32">
        <div className="w-300 mx-auto">
          <div className="w-75-p h-50-important mx-auto">
            <Image
              src={NoUserPic}
              rounded={false}
              raised={true}
              alt="Imagem do perfil"
              className="float-left h-35-important"
            />
            <div className="pl-4 float-left ">
              <p className="text-2xl font-bold text-left">
                {oferta.usuario.nome}
              </p>
              <p className="font-light text-left">
                {oferta.usuario.localizacao.cidade} -{" "}
                {oferta.usuario.localizacao.uf}
              </p>
            </div>
            <div className="float-right">
              {oferta.usuario.idUsuario.toString() ===
              sessionStorage.getItem("@Hireit/idUsuario") ? (
                <Button
                  color="lightBlue"
                  buttonType="filled"
                  size="lg"
                  rounded={false}
                  block={false}
                  iconOnly={false}
                  ripple="light"
                  id="propostasButton"
                  className="default-bg-blue "
                  onClick={function (e) {
                    changePropostas();
                  }}
                >
                  Ver propostas
                </Button>
              ) : (
                <Button
                  color="lightBlue"
                  buttonType="filled"
                  size="lg"
                  rounded={false}
                  block={false}
                  iconOnly={false}
                  ripple="light"
                  className="default-bg-blue"
                >
                  Enviar proposta
                </Button>
              )}
            </div>
          </div>
          <div
            id="propostas"
            className="border-bottom py-4 overflow-hidden scrolling-wrapper hidden"
          >
          <div className="flex flex-row border-all max-w-screen-sm mr-8">
          {/* Porcentagem de match */}
          {oferta.match > 75 ? <div className="color-green-proposta px-2 rounded-l-lg">
            <p className="text-white pt-10">
              <span className="font-semibold text-large">{oferta.match}%</span>
              <br />
              compatibilidade
            </p>
          </div> : oferta.match > 50 ? <div className="color-yellow-proposta px-2 rounded-l-lg">
            <p className="text-white pt-10">
              <span className="font-semibold text-large">{oferta.match}%</span>
              <br />
              compatibilidade
            </p>
          </div> : <div className="color-red-proposta px-2 rounded-l-lg">
            <p className="text-white pt-10">
              <span className="font-semibold text-large">{oferta.match}%</span>
              <br />
              compatibilidade
            </p>
          </div>
          }
          
          {/* Dados da proposta */}
          <div className="p-6">
            <div className="flex flex-row pb-2">
              <Image
                className="w-16 shadow-none"
                src={NoUserPic}
                alt="Profile picture"
                raised
              />
              <div className="pl-3">
                <Heading5 style={{ marginBottom: "0px" }}>
                  {oferta.usuario.nome}
                </Heading5>
                <span>
                  {oferta.usuario.localizacao.cidade} -{" "}
                  {oferta.usuario.localizacao.uf}
                </span>
              </div>
            </div>
            <div className="pb-4 w-96">
              <Heading6>Descrição</Heading6>
              <p
                className="text-left px-6"
                style={{
                  maxHeight: "100ch",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {oferta.descricao}
                {""}
                <br />
                <span id="dots" className="text-blue-500 font-semibold">
                  ...
                </span>
                <Link to={`/Freelancer/${oferta.idOferta}`}>
                  <button
                    className="focus:bg-transparent text-blue-500 font-semibold"
                    id="btnReadMore"
                  >
                    Ler Mais
                  </button>
                </Link>
              </p>
            </div>
            <div className="pb-4">
              <Heading6>Tecnologias:</Heading6>
              <div className="flex justify-center">
                <div
                  className="grid grid-cols-2 gap-2"
                  style={{ width: "22rem" }}
                >
                  {tecnologiasOferta.map((tec) => (
                    <TecnologiaComponent tecnologiaOferta={tec} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center">
              <Button className="mr-2 btn-red-refuse shadow-none">Recusar</Button>
              <Button className="ml-2 btn-green-accept shadow none"
                      onClick={(e) => setShowModal(true)}>
                Aceitar
              </Button>
            </div>
          </div>
        </div>
        </div>
          <hr className="w-90-p mx-auto" />
          <div className="w-full mt-8 color-default-black hidden">
            <div className="w-90-p mx-auto">
              <span className="text-3xl font-medium">Propostas:</span>
            </div>
            <div className="w-full px-12 pt-4 pb-10 text-lg"></div>
          </div>
          <hr className="w-90-p mx-auto" />
          <div className="w-90-p mx-auto mt-8 color-default-black">
          <Heading4>Sobre minha experiência: </Heading4>
            <div className="w-full px-12 pt-4 pb-10 text-lg">
              {oferta.descricao}
            </div>
          </div>
          <hr className="w-90-p mx-auto" />
          <div className="w-90-p mx-auto mt-8 color-default-black">
            <Heading4>Habilidades </Heading4>
              <div className="px-10 flex justify-center pt-4">
              {tecnologiasOferta.map((tecnologia) => (
                  <HabilidadeComponent
                      tecnologiaId={tecnologia.tecnologias.idTecnologia}
                      experience={tecnologia.tempoExperiencia}
                  />
                ))}
              </div>
          </div>
          {/* Se o usuário não for dono da oferta */}
          <hr className="w-90-p mx-auto" />
          {oferta.usuario.idUsuario.toString() ===
          sessionStorage.getItem("@Hireit/idUsuario") ? (
            ""
          ) : (
            <div className="w-90-p mx-auto mt-8 color-default-black">
              <ContratanteSecao
                type="freelancer"
                userName={oferta.usuario.nome}
                userDescription={oferta.usuario.descricao}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
