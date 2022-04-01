import React, { useEffect, useState } from "react";

import NoUserPic from "../../../assets/img/no-user.jpg";
import C6Logo from "../../../assets/img/c6-logo.png";
import B3Logo from "../../../assets/img/b3-logo.png";
import HandShake from "../../../assets/img/maozinha.svg";
import Image from "@material-tailwind/react/Image";

import { Bar } from "react-chartjs-2";

import Heading6 from "@material-tailwind/react/Heading6";
import Heading5 from "@material-tailwind/react/Heading5";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import TecnologiaComponent from "../tecnologias/TecnologiaComponent";
import Input from "@material-tailwind/react/Input";

import { useHistory } from "react-router";

import "../../../assets/styles/proposta.css";
import "../../../assets/styles/components/modal-contrato.css";
import Button from "@material-tailwind/react/Button";
import { Link } from "react-router-dom";
import api from "api";
import Heading4 from "@material-tailwind/react/Heading4";

export default function Proposta({ type, proposta }) {
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [tecnologias, setTecnologias] = useState([]);
  let [softskillsUsuario, setSoftskillsUsuario] = useState({
    experiencias: 0,
    conscienciosidade: 0,
    extroversao: 0,
    instabilidade: 0,
    amabilidade: 0,
  });
  const [showModal, setShowModal] = useState(false);

  const contrato = {
    dataFim: "",
    valorHora: 0,
    idOferta: proposta.ofertas.idOferta,
    idDemanda: proposta.demandas.idDemanda,
  };

  const handleCadastro = (e) => {
    contrato.valorHora = document.getElementById("valorHora").value;
    contrato.dataFim = document.getElementById("dataFim").value;

    console.log(`${contrato.dataFim}T23:59:12.613`);
    console.log(contrato.valorHora);
    console.log(proposta.ofertas.idOferta);
    console.log(proposta.ofertas.idDemanda);
  };

  async function getTecnologiasByProjeto(idDemanda) {
    const response = await api.get(`/tecnologias/demandas/${idDemanda}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("@Hireit/token")}`,
      },
    });
    console.log(response.data);
    setTecnologias(response.data);
    setLoading(false);
  }

  async function getTecnologiasByOferta(idOferta) {
    const response = await api.get(`/tecnologias/oferta/${idOferta}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("@Hireit/token")}`,
      },
    });
    console.log(response.data);
    setTecnologias(response.data);
    getSoftskillsByUser(proposta.ofertas.usuario.idUsuario);
  }

  async function getSoftskillsByUser(idUsuario) {
    const response = await api
      .get(`/softskills/usuario/${idUsuario}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("@Hireit/token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          let experiencia,
            conscienciosidade,
            extroversao,
            instabilidade,
            amabilidade;

          for (let i = 0; i < response.data.length; i++) {
            switch (response.data[i].softskill.idSoftSkills) {
              case 1:
                experiencia = response.data[i].notaSoftskill;
                break;
              case 2:
                conscienciosidade = response.data[i].notaSoftskill;
                break;
              case 3:
                extroversao = response.data[i].notaSoftskill;
                break;
              case 4:
                instabilidade = response.data[i].notaSoftskill;
                break;
              case 5:
                amabilidade = response.data[i].notaSoftskill;
                break;
            }
          }

          setSoftskillsUsuario({
            ...softskillsUsuario,
            experiencias: experiencia,
            conscienciosidade: conscienciosidade,
            extroversao: extroversao,
            instabilidade: instabilidade,
            amabilidade: amabilidade,
          });
        }
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
    setLoading(false);
  }

  async function postContrato() {
    await api
      .post(
        "/contratos",
        {
          dataFim: `${contrato.dataFim}T23:59:12.613`,
          valorHora: contrato.valorHora,
          ofertas: {
            idOferta: contrato.idOferta,
          },
          demandas: {
            idDemanda: contrato.idDemanda,
          },
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("@Hireit/token"),
          },
        }
      )
      .then((resposta) => {
        if (resposta.status === 201) {
          console.log("Push com sucesso");
        }
        return { error: "Erro no push" };
      });
    history.push("/perfil/projetos-andamento");
  }

  useEffect(() => {
    if (type === "projeto") {
      getTecnologiasByOferta(proposta.ofertas.idOferta);
    } else if (type === "freelancer") {
      getTecnologiasByProjeto(proposta.demandas.idDemanda);
    }
  }, []);
  //   function readMore() {
  //     var dots = document.getElementById("dots");
  //     var moreText = document.getElementById("more");
  //     var btnText = document.getElementById("btnReadMore");

  //     if (dots.style.display === "none") {
  //       dots.style.display = "inline";
  //       btnText.innerHTML = "Ler Mais";
  //       moreText.style.display = "none";
  //     } else {
  //       dots.style.display = "none";
  //       btnText.innerHTML = "Ler Menos";
  //       moreText.style.display = "inline";
  //     }
  //   }

  if (isLoading) {
    return (
      <section className="pt-48 max-w-8x1 px-4 overflow-auto pb-64">
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

  const labels = [
    "Aberto para experiências",
    "Conscienciosidade",
    "Extroversão",
    "Instabilidade Emocional",
    "Amabilidade",
  ];
  function dataSoftskills(softskills) {
    let teste = [];
    if (softskills !== []) {
      softskills.forEach((softskill) => {
        teste.push(softskill.notaSoftskill);
      });
    }

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Porcentagem",
          data: teste,
          backgroundColor: [
            "rgb(233, 93, 127)",
            "rgb(144, 235, 255)",
            "rgb(93, 233, 166)",
            "rgb(250, 227, 146)",
            "rgb(236, 155, 223)",
          ],
        },
      ],
    }; //TODO: TENTAR PEGAR CADA SOFTSKILL E JOGAR NO DATA SEPARADO

    return data;
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Modal
        className="flex flex-col justify-center mwidth"
        size="lg"
        active={showModal}
        toggler={() => setShowModal(false)}
      >
        <ModalHeader toggler={() => setShowModal(false)}>
          <Heading4>Criar Contrato</Heading4>
        </ModalHeader>
        <ModalBody className="container flex flex-col mwidth">
          <div className="flex flex-row mb-5">
            <Image
              className="w-24 shadow-none mleft"
              src={C6Logo}
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
            <div className="mbottom px-5">
              <Input
                id="valorHora"
                type="number"
                color="cyan"
                size="regular"
                outline={true}
                onClick={handleCadastro}
                placeholder="Valor Acordado:"
              />
            </div>
            <div className="px-5">
              <Input
                id="dataFim"
                type="date"
                color="cyan"
                size="regular"
                outline={true}
                onClick={handleCadastro}
                placeholder="Data de termino:"
              />
            </div>
          </div>
        </ModalBody>
        <div className="flex justify-center">
          {/* <Link to={"/contrato"}> */}
          <Button
            className="blue-bgc hover:shadow-none shadow-none active:bg-transparent focus:bg-transparent"
            onClick={(e) => {
              setShowModal(false);
              postContrato(e);
            }}
          >
            Criar Contrato
          </Button>
          {/* </Link> */}
        </div>
      </Modal>

      <div className="flex flex-row border-all max-w-screen-sm mr-8">
        {/* Porcentagem de match */}
        {proposta.match > 75 ? (
          <div className="color-green-proposta px-2 rounded-l-lg">
            <p className="text-white pt-6">
              <span
                className="font-semibold text-lg"
                style={{ fontSize: "30px" }}
              >
                {proposta.match}%
              </span>
              <br />
              compatibilidade
            </p>
          </div>
        ) : proposta.match > 50 ? (
          <div className="color-yellow-proposta px-2 rounded-l-lg">
            <p className="text-white pt-6">
              <span
                className="font-semibold text-lg"
                style={{ fontSize: "30px" }}
              >
                {proposta.match}%
              </span>
              <br />
              compatibilidade
            </p>
          </div>
        ) : (
          <div className="color-red-proposta px-2 rounded-l-lg">
            <p className="text-white pt-6">
              <span
                className="font-semibold text-large"
                style={{ fontSize: "30px" }}
              >
                {proposta.match}%
              </span>
              <br />
              compatibilidade
            </p>
          </div>
        )}

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
                {proposta.ofertas.usuario.nome}
              </Heading5>
              <span>
                {proposta.ofertas.usuario.localizacao.cidade} -{" "}
                {proposta.ofertas.usuario.localizacao.uf}
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
              {proposta.ofertas.descricao}
              {""}
              <br />
              <span id="dots" className="text-blue-500 font-semibold">
                ...
              </span>
              <Link to={`/Freelancer/${proposta.ofertas.idOferta}`}>
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
                {tecnologias.map((tec) => (
                  <TecnologiaComponent tecnologia={tec} />
                ))}
              </div>
            </div>
          </div>
          {type === "projeto" ? (
            <div className="w-80">
              <Heading6>Personalidade:</Heading6>
              <div className="flex justify-center">
                <Bar
                  data={{
                    labels: [
                      "Abertura para a experiência",
                      "Conscienciosidade",
                      "Extroversão",
                      "Instabilidade emocional",
                      "Amabilidade",
                    ],
                    datasets: [
                      {
                        label: "Resultado no teste de personalidade",
                        data: [
                          softskillsUsuario.experiencias,
                          softskillsUsuario.conscienciosidade,
                          softskillsUsuario.extroversao,
                          softskillsUsuario.instabilidade,
                          softskillsUsuario.amabilidade,
                        ],
                        backgroundColor: [
                          "#E95D7F",
                          "#90EBFF",
                          "#5DE9A6",
                          "#FAE392",
                          "#F5AEEA",
                        ],
                      },
                    ],
                  }}
                  height={3}
                  width={3}
                  options={options}
                />
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="flex flex-row justify-center">
            <Button className="mr-2 btn-red-refuse shadow-none">Recusar</Button>
            <Button
              className="ml-2 btn-green-accept shadow none"
              onClick={(e) => setShowModal(true)}
            >
              Aceitar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
