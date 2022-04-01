import React, { useEffect, useState } from "react";

import Image from "@material-tailwind/react/Image";

import Heading5 from "@material-tailwind/react/Heading5";
import Button from "@material-tailwind/react/Button";

import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Proposta from "./propostasProjeto/Proposta";
import PropostaSend from "./propostasProjeto/PropostaSend";
import NoUserPic from "../../assets/img/no-user.jpg";

import "../../assets/styles/components/titulo-secao-projeto.css";

import api from "api";
import { useHistory } from "react-router";
import { map } from "leaflet";

export default function TituloSecao({
  id,
  type,
  projectTitle,
  propostas,
  userId,
  userName,
  city,
  uf,
  proposta,
  payment,
  contratoEndDate,
}) {
  const history = useHistory();
  const [freelancers, setFreelancers] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const currentUser = sessionStorage.getItem("@Hireit/idUsuario");

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

  function contratoEnd() {
    let data1 = contratoEndDate.split("T");
    let dataSplit1 = data1[0].split("-");
    let dataEndFormatado = `${dataSplit1[2]}/${dataSplit1[1]}/${dataSplit1[0]}`;

    return dataEndFormatado;
  }

  function contratoEndDays() {
    let data1 = contratoEndDate.split("T");
    let dataSplit1 = data1[0].split("-");

    let dateEndFormatado = `${dataSplit1[1]}/${dataSplit1[2]}/${dataSplit1[0]}`;
    const date1 = new Date(dateEndFormatado);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    const dateNow = mm + "/" + dd + "/" + yyyy;

    let data2 = dateNow.split("T");
    let dataSplit2 = data2[0].split("-");
    let dataNowFormatado = `${dataSplit2[2]}/${dataSplit2[1]}/${dataSplit2[0]}`;
    const date2 = new Date(dataNowFormatado);

    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  const [showModal, setShowModal] = React.useState(false);
  const [showModalPropostas, setShowModalPropostas] = React.useState(false);

  return (
    <>
      {
        (console.log("------------------------------------=-=-=-=-=-=-=-="),
        console.log(proposta))
      }
      <Modal
        size="lg"
        active={showModalPropostas}
        toggler={() => setShowModalPropostas(false)}
      >
        <ModalHeader toggler={() => setShowModalPropostas(false)}>
          Minhas ofertas
        </ModalHeader>
        <ModalBody>
          {proposta.length > 0 ? (
            <div className="flex overflow-y-scroll p-4">
              {type === "projeto"
                ? proposta.map((prop) => (
                    <PropostaSend
                      type="oferta"
                      ofertaDemanda={prop}
                      idCurrentOfertaDemanda={id}
                    />
                  ))
                : proposta.map((prop) => (
                    <PropostaSend
                      type="demanda"
                      ofertaDemanda={prop}
                      idCurrentOfertaDemanda={id}
                    />
                  ))}
            </div>
          ) : (
            "Você ainda não criou uma oferta de freelancer ou um projeto para enviar como proposta."
          )}
        </ModalBody>
      </Modal>

      <Modal
        size="regular"
        active={showModal}
        toggler={() => setShowModal(false)}
      >
        <ModalHeader toggler={() => setShowModal(false)}>
          Finalizar contrato
        </ModalHeader>
        <ModalBody>
          <p className="text-base leading-relaxed text-gray-600 font-normal">
            É importante notar que esta ação deve estar alinhada com o
            freelancer antes de continuar.
            <br />
            Você realmente deseja finalizar este contrato?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="red"
            buttonType="link"
            onClick={(e) => setShowModal(false)}
            ripple="dark"
          >
            Não
          </Button>

          <Button
            color="green"
            onClick={() => history.push("/perfil/sobre")}
            ripple="light"
          >
            Sim, continuar
          </Button>
        </ModalFooter>
      </Modal>
      <main style={{ maxWidth: "768px", margin: "auto" }}>
        <div className="border-bottom pb-4">
          <div className="flex">
            <div>
              <Image
                className="w-32"
                src={NoUserPic}
                alt="Profile picture"
                raised
              />
            </div>
            <div className="w-full flex justify-between pl-4">
              <div className="flex flex-col justify-start">
                <Heading5 className="flex justify-start">
                  {type === "projeto" ? projectTitle : userName}
                </Heading5>
                <p className="flex justify-start text-lg font-sans">
                  {type === "projeto" ? userName + " -" : ""} {city} - {uf}
                </p>
                <p className="flex justify-start text-sm color-green font-sans">
                  {type === "projeto" ? "R$" + payment : ""}
                </p>
              </div>
              <div>
                {type === "contrato" ? (
                  userId.toString() ===
                  sessionStorage.getItem("@Hireit/idUsuario") ? (
                    <div
                      className="float-right items-end"
                      style={{ width: "20rem" }}
                    >
                      <div className="w-full">
                        <Button
                          className="purple-bgc rounded-sm hover:shadow-none border-none shadow-none blue-bgc text-white"
                          id="propostasButton"
                          block={true}
                          style={{ width: "16rem", float: "right" }}
                          onClick={(e) => setShowModal(true)}
                        >
                          Finalizar Contrato
                        </Button>
                      </div>

                      <div className="w-full pt-4 float-right">
                        <p
                          className="text-lg color-green font-sans"
                          style={{ textAlign: "right" }}
                        >
                          R$ {payment}
                        </p>
                      </div>
                      <div className="w-full float-right">
                        <p style={{ textAlign: "right" }}>
                          Fim do contrato em <b>{contratoEndDays()}</b> dias:{" "}
                          {contratoEnd()}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="float-right pt-4"
                      style={{ width: "20rem" }}
                    >
                      <div className="w-full">
                        <p
                          className="text-lg color-green font-sans"
                          style={{ textAlign: "right" }}
                        >
                          R$ {payment}
                        </p>
                      </div>
                      <div className="w-full">
                        <p style={{ textAlign: "right" }}>
                          Fim do contrato em <b>10</b> dias:
                        </p>
                      </div>
                    </div>
                  )
                ) : userId.toString() ===
                  sessionStorage.getItem("@Hireit/idUsuario") ? (
                  propostas.length > 0 ? (
                    <Button
                      onClick={function (e) {
                        changePropostas();
                      }}
                      className="purple-bgc rounded-sm hover:shadow-none border-none shadow-none blue-bgc text-white"
                      id="propostasButton"
                    >
                      Ver propostas
                    </Button>
                  ) : (
                    <Button
                      onClick={function (e) {
                        changePropostas();
                      }}
                      className="purple-bgc rounded-sm hover:shadow-none border-none shadow-none blue-bgc text-white"
                      disabled="true"
                      id="propostasButton"
                    >
                      Ver propostas
                    </Button>
                  )
                ) : (
                  <Button
                    className="purple-bgc rounded-sm hover:shadow-none border-none shadow-none blue-bgc text-white"
                    onClick={(e) => setShowModalPropostas(true)}
                  >
                    Enviar proposta
                  </Button>
                )}
                <p className="pt-4">
                  {type === "projeto" ? (
                    <span className="font-bold">
                      {" "}
                      {"Propostas Enviadas: " + propostas.length}
                    </span>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>
          </div>
          <br />
        </div>
      </main>
      <main style={{ maxWidth: "1500px", margin: "auto" }}>
        {/* Propostas */}
        {type === "contrato" ? (
          ""
        ) : propostas.length > 0 ? (
          <div
            id="propostas"
            className="border-bottom py-4 overflow-hidden scrolling-wrapper hidden"
          >
            {propostas.map((proposta) => (
              <Proposta type={type} proposta={proposta} />
            ))}
          </div>
        ) : (
          ""
        )}
      </main>
    </>
  );
}
