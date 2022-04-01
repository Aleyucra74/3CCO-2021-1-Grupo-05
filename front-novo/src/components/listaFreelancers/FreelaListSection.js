import React, { useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import ProfilePicture from "assets/img/no-user.jpg";
import CardBody from "@material-tailwind/react/CardBody";
import H6 from "@material-tailwind/react/Heading6";
import CardFooter from "@material-tailwind/react/CardFooter";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import InputIcon from "@material-tailwind/react/InputIcon";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Textarea from "@material-tailwind/react/Textarea";
import Label from "@material-tailwind/react/Label";
import api from "../../api";
import Select from "components/select/Select";
import { MultiSelect, SelectPanel } from "react-multi-select-component";
import Icon from "@material-tailwind/react/Icon";
import Pagination from "@material-tailwind/react/Pagination";
import PaginationItem from "@material-tailwind/react/PaginationItem";

import CardProjeto from "components/cardProjeto/CardProjeto";
import CardOferta from "components/cardOferta/CardOferta";

import "../../assets/styles/freelancer.css";
import { useHistory } from "react-router";
import { toast, ToastContainer } from "react-toastify";

export default function FreelaListSection() {
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [ofertas, setOfertas] = useState([]);
  const [tecnologias, setTecnologias] = useState([]);
  const [tecnologiasOferta, setTecnologiasOferta] = useState([]);

  // ERRROR HANDLER
  let payload = {
    descricao: "",
    tecnologias: [],
  };

  const notificaErro = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "error-toast",
    });

  const handlePayload = (e) => {
    payload.descricao = document.getElementById("descricao").value;
    payload.tecnologias = selected2;
  };

  var tecnologiasF = [];

  const [ofertaData, setOfertaData] = useState({
    descricao: "",
    usuario: {
      idUsuario: parseInt(sessionStorage.getItem("@Hireit/idUsuario")),
    },
  });

  function handle(e) {
    const { descricao, tecnologias } = payload;
    const newOferta = { ...ofertaData };
    newOferta[e.target.id] = e.target.value;
    setOfertaData(newOferta);
    console.log(newOferta);
  }
  const selected2 = [];
  function enviar(e) {
    selected2 = selected.map((select) => ({
      tempoExperiencia: 10,
      tecnologias: { idTecnologia: select.value },
    }));
    console.log(JSON.parse(JSON.stringify(selected2)));

    api
      .post(
        "/ofertas",
        {
          oferta: ofertaData,
          listaTecnologias: selected2,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("@Hireit/token")}`,
          },
        }
      )
      .then((resposta) => {
        console.log("post ok", resposta);
        console.log(resposta.data);
        history.push("/Freelancers");
      })
      .catch((e) => {
        if (e.response.status === 422) {
          notificaErro("Algo deu errado! :(");
        }
      });
  }

  useEffect(() => {
    async function getAllFreelancers() {
      const response = await api.get(`/ofertas`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("@Hireit/token")}`,
        },
      });
      setOfertas(response.data);
      getAllTecnologias();
    }

    async function getAllTecnologias() {
      const response = await api.get(`/tecnologias`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("@Hireit/token")}`,
        },
      });
      setTecnologias(response.data);
      setLoading(false);
    }

    getAllFreelancers();
  }, []);

  let vetorEstados = [
    "UF",
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MG",
    "PA",
    "PB",
    "PE",
    "PI",
    "PR",
    "RJ",
    "RN",
    "RS",
    "RR",
    "SC",
    "SE",
    "SP",
    "TO",
  ];

  const options = [];
  tecnologiasF.push("Tecnologia");
  tecnologias.map(
    (tecnologia) => (
      tecnologiasF.push(tecnologia.tecnologia),
      options.push({
        label: tecnologia.tecnologia,
        value: tecnologia.idTecnologia,
      })
    )
  );

  const [showModal, setShowModal] = React.useState(false);
  const [selected, setSelected] = useState([]);
  var obj = JSON.parse(JSON.stringify(selected));
  var res = [];

  for (var i in obj) {
    res.push(obj[i]);
  }

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

  return (
    <>
      <ToastContainer />
      <Modal
        className="w-fullsize"
        size="lg"
        active={showModal}
        toggler={() => setShowModal(false)}
      >
        <ModalHeader
          className="justify-header"
          toggler={() => setShowModal(false)}
        >
          Criar minha oferta de freelancer
        </ModalHeader>
        <form onSubmit={(e) => enviar(e)}>
          <ModalBody className="w-full">
            <div className="">
              <div className="w-180 m-4">
                <Textarea
                  color="lightBlue"
                  size="regular"
                  outline={true}
                  placeholder="Descrição"
                  id="descricao"
                  onChange={(e) => handle(e)}
                />
              </div>

              <div className="w-180 m-4">
                <div>
                  <h1>Tecnologias:</h1>
                  <MultiSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                    limit="4"
                  />
                  <div id="label-span" className="pt-4 label-3-row">
                    {
                      (console.log(res),
                      res.map((selected) => (
                        <div className="flex label-span p-1 rounded justify-between">
                          <div className="flex justify-between w-full">
                            <Label className="text-white float-left">
                              {selected.label}
                            </Label>
                            <Label className="text-white float-right">
                              5 anos
                            </Label>
                          </div>
                        </div>
                      )))
                    }
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="green"
              onClick={(e) => setShowModal(false)}
              ripple="light"
              size="regular"
              className="mx-auto padding-lr rounded-sm hover:shadow-none border-none shadow-none blue-bgc text-white"
              type="submit"
            >
              Criar oferta
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      <section className="pt-16 w-full max-w-8x1 px-4 bg-gray-100 h-full overflow-auto pb-32">
        <div className="container mx-auto">
          <div className="w-96-new w-full-new float-left">
            <Button
              color="lightBlue"
              buttonType="filled"
              size="lg"
              rounded={false}
              block={true}
              iconOnly={false}
              ripple="light"
              onClick={(e) => setShowModal(true)}
              className="padding-lr rounded-sm hover:shadow-none border-none shadow-none blue-bgc text-white"
            >
              Faça parte!
            </Button>
            <br />
            <Card className="border border-rounded-none">
              <CardBody>
                <H6 color="gray">Filtros</H6>

                <br />
                <div className="w-full">
                  <Select items={vetorEstados} id="uf" />
                </div>

                <br />
                <InputIcon
                  type="text"
                  color="lightBlue"
                  size="lg"
                  outline={true}
                  placeholder="Nome do freelancer"
                  iconFamily="material-icons"
                  iconName="search"
                />

                <br />
                <Input
                  type="date"
                  color="lightBlue"
                  size="lg"
                  outline={true}
                  placeholder="Data de postagem"
                />

                <br />
                <div className="w-full">
                  <Select items={tecnologiasF} id="tecnologias" />
                </div>

                <br />
                <Input
                  type="number"
                  color="lightBlue"
                  size="lg"
                  outline={true}
                  placeholder="Experiência (em anos)"
                  min="0"
                  max="100"
                />
              </CardBody>

              <CardFooter className="flex-center">
                <Button
                  color="blue"
                  size="lg"
                  ripple="light"
                  className="default-bg-blue"
                >
                  Filtrar
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Freelancer */}
          <div className="flex flex-col pl-5">
            {ofertas.length === 0 ? (
              <div className="text-center">
                Nenhum freelancer encontrado. <br />{" "}
              </div>
            ) : (
              <div>
                {ofertas.map((oferta) => (
                  <>
                    <CardProjeto
                      tipo="freelancer"
                      id={oferta.idOferta}
                      descricao={oferta.descricao}
                      titulo={oferta.usuario.nome}
                      data={oferta.createdAt}
                      token={sessionStorage.getItem("@Hireit/token")}
                    />
                    <CardOferta
                      tipo="freelancer"
                      id={oferta.idOferta}
                      descricao={oferta.descricao}
                      titulo={oferta.usuario.nome}
                      data={oferta.createdAt}
                      token={sessionStorage.getItem("@Hireit/token")}
                    />
                  </>
                  // <HireCard
                  //   idOferta={oferta.idOferta}
                  //   userName={oferta.usuario.nome}
                  //   description={oferta.descricao}
                  //   date={dateFormatter(oferta.createdAt)}
                  //   src={ProfilePicture}
                  //   link={`/Freelancer/${oferta.idOferta}`}
                  // />
                ))}
                {/* <HireCard
                    userName="{oferta.usuario.nome}"
                    description="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                    date="2021"
                    src={ProfilePicture}
                    link={`/Freelancer/1`}
                  /> */}
                <br />
                <br />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
