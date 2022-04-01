import React, { useEffect, useState } from "react";

import H6 from "@material-tailwind/react/Heading6";
import Button from "@material-tailwind/react/Button";
import Label from "@material-tailwind/react/Label";

import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";

import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import DropdownLink from "@material-tailwind/react/DropdownLink";

import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";

import InputIcon from "@material-tailwind/react/InputIcon";
import Textarea from "@material-tailwind/react/Textarea";
import Input from "@material-tailwind/react/Input";
import ClosingLabel from "@material-tailwind/react/ClosingLabel";

import { useHistory } from "react-router";

import Select from "components/select/Select";

import "../../assets/styles/listaProjetos.css";
import "../../assets/styles/components/button-projetos.css";
import "../../assets/styles/components/dropdown-projetos.css";
import "../../assets/styles/modal-cadastro-projeto.css";

import api from "api";

export default function FiltroSecao() {
  const history = useHistory();

  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setLoading] = useState(true);

  const [listaTecnologias, setListaTecnologias] = useState([]);
  const [listaSelecionadas, setListaSelecionadas] = useState([]);

  const [listaSoftskills, setListaSoftSkills] = useState([]);
  const [listaSoftskillsSelecionadas, setListaSoftSkillsSelecionadas] =
    useState([]);

  const [projetoData, setProjetoData] = useState({
    titulo: "",
    descricao: "",
    salario: "",
    usuario: {
      idUsuario: parseInt(sessionStorage.getItem("@Hireit/idUsuario")),
    },
  });

  function handle(e) {
    const newProjeto = { ...projetoData };
    newProjeto[e.target.id] = e.target.value;
    setProjetoData(newProjeto);
    console.log(newProjeto);
  }

  function enviar(e) {
    e.preventDefault();
    api
      .post(
        "/demandas",
        {
          titulo: projetoData.titulo,
          descricao: projetoData.descricao,
          salario: projetoData.salario,
          usuario:{
            idUsuario: projetoData.usuario.idUsuario
          }
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
        // postCriarTecnologias();
        // postCriarSoftskills();
      });
  }

  function postCriarTecnologias(){
    api
      .post(
        "/tecnologias/demanda",
        {
          titulo: projetoData.titulo,
          descricao: projetoData.descricao,
          salario: projetoData.salario,
          usuario:{
            idUsuario: projetoData.usuario.idUsuario
          }
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
      });

  }

  function postCriarSoftskills(){
    api
    .post(
      "/softskills/demanda",
      {
        titulo: projetoData.titulo,
        descricao: projetoData.descricao,
        salario: projetoData.salario,
        usuario:{
          idUsuario: projetoData.usuario.idUsuario
        }
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
    });
  }

  useEffect(() => {
    async function getAllTecnologias() {
      const response = await api.get(`/tecnologias`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("@Hireit/token")}`,
        },
      });
      console.log(response.data);
      setListaTecnologias(response.data);
      setLoading(false);
    }

    getAllTecnologias();
    setListaSoftSkills([
      "Aberto para experiências",
      "Conscienciosidade",
      "Extroversão",
      "Instabilidade Emocional",
      "Amabilidade",
    ]);
    // const getValoresTecnologias = async () => await getListaTecnologias()
    // getValoresTecnologias()
  }, []);

  const insertTecnoligasSelecionadas = (tecnologia) => {
    if (
      listaSelecionadas.filter((item) => item === tecnologia)[0] == tecnologia
    )
      return;
    setListaSelecionadas([...listaSelecionadas, tecnologia]);
  };

  const insertSoftskillsSelecionadas = (softskill) => {
    if (
      listaSoftskillsSelecionadas.filter((item) => item === softskill)[0] ==
      softskill
    )
      return;
    setListaSoftSkillsSelecionadas([...listaSoftskillsSelecionadas, softskill]);
  };

  const removeTecnoligasSelecionadas = (tecnologia) => {
    setListaSelecionadas(
      listaSelecionadas.filter((item) => item !== tecnologia)
    );
  };

  const removeSoftskillsSelecionadas = (softskill) => {
    setListaSoftSkillsSelecionadas(
      listaSoftskillsSelecionadas.filter((item) => item !== softskill)
    );
  };

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

  var tecnologiasF = [];

  const options = [];
  tecnologiasF.push("Tecnologia");
  listaTecnologias.map(
    (tecnologia) => (
      tecnologiasF.push(tecnologia.tecnologia),
      options.push({
        label: tecnologia.tecnologia,
        value: tecnologia.idTecnologia,
      })
    )
  );

  return (
    <>
      <div className="float-left">
        <Button
          className="mb-4 padding-lr rounded-sm hover:shadow-none border-none shadow-none blue-bgc text-white"
          onClick={(e) => setShowModal(true)}
          color="blue"
          size="lg"
          ripple="light"
        >
          Cadastrar Novo Projeto
        </Button>

        {/* MODAL */}
        <Modal
          className="w-fullsize"
          size="lg"
          active={showModal}
          toggler={() => setShowModal(false)}
        >
          <form onSubmit={(e) => enviar(e)}>
            <ModalHeader
              toggler={() => setShowModal(false)}
              className="justify-header"
            >
              Criar Projetos
            </ModalHeader>
            <ModalBody className="w-full">
              <div className="flex flex-row">
                <div className="w-25-size">
                  <Input
                    type="text"
                    color="purple"
                    size="lg"
                    outline={true}
                    placeholder="Titulo"
                    id="titulo"
                    onChange={(e) => handle(e)}
                  />
                  <br />
                  <Textarea
                    color="purple"
                    size="lg"
                    outline={true}
                    placeholder="Descrição"
                    id="descricao"
                    onChange={(e) => handle(e)}
                  />
                  <br />
                  <Input
                    type="number"
                    color="purple"
                    size="lg"
                    outline={true}
                    placeholder="Salário"
                    id="salario"
                    onChange={(e) => handle(e)}
                  />
                </div>

                {/* DROPDOWN - TECNOLOGIA */}
                <div className="w-25-size">
                  <Dropdown
                    color="black"
                    className="text-size font-sans font-extrabold hover:bg-transparent"
                    placement="bottom-start"
                    buttonText="Tecnologias"
                    buttonType="link"
                    size="regular"
                    rounded={false}
                    block={false}
                    ripple="light"
                  >
                    {listaTecnologias.map((tecnologia, index) => (
                      <DropdownItem
                        className="hover-none"
                        color="white"
                        ripple="light"
                        onClick={() => {
                          insertTecnoligasSelecionadas(tecnologia.tecnologia);
                        }}
                        key={index}
                      >
                        <div className="flex purple-bgc p-1 rounded justify-between">
                          <div className="flex justify-between w-full">
                            <Label className="text-white">
                              {tecnologia.tecnologia}
                            </Label>
                            <Label className="text-white pr-0">5 anos</Label>
                          </div>
                        </div>
                      </DropdownItem>
                    ))}
                  </Dropdown>
                  <div>
                    {listaSelecionadas.map((tecnologia, index) => (
                      <div className="flex purple-bgc mx-4 mt-2 rounded justify-between">
                        <div className="flex justify-between w-full">
                          <Label className="text-white">{tecnologia}</Label>
                          <Label className="text-white pr-0">5 anos</Label>
                        </div>
                        <Button
                          onClick={() => {
                            removeTecnoligasSelecionadas(tecnologia);
                          }}
                          className="pl-0 bg-transparent hover:bg-transparent hover:shadow-none shadow-none color-white active:bg-transparent focus:bg-transparent"
                        >
                          X
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DROPDOWN - SOFTSKILLS */}
                <div className="w-25-size">
                  <Dropdown
                    color="white"
                    className="text-size font-sans font-extrabold hover:bg-transparent"
                    placement="bottom-start"
                    buttonText="Softskill"
                    buttonType="link"
                    size="regular"
                    rounded={false}
                    block={false}
                    ripple="light"
                  >
                    {listaSoftskills.map((softskill, index) => (
                      <DropdownItem
                        color="white"
                        ripple="light"
                        onClick={() => {
                          insertSoftskillsSelecionadas(softskill);
                        }}
                        key={index}
                      >
                        <div className="flex purple-bgc p-1 rounded justify-between">
                          <div className="flex justify-between w-full">
                            <Label className="text-white">{softskill}</Label>
                          </div>
                        </div>
                      </DropdownItem>
                    ))}
                  </Dropdown>
                  <div>
                    {listaSoftskillsSelecionadas.map((softskill, index) => (
                      <div className="flex purple-bgc mx-4 mt-2 rounded justify-between">
                        <div className="flex justify-between w-full">
                          <Label className="text-white">{softskill}</Label>
                        </div>
                        <Button
                          onClick={() => {
                            removeSoftskillsSelecionadas(softskill);
                          }}
                          className="pl-0 bg-transparent hover:bg-transparent hover:shadow-none shadow-none color-white active:bg-transparent focus:bg-transparent"
                        >
                          X
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  className="mb-4 padding-lr rounded-sm hover:shadow-none border-none shadow-none blue-bgc text-white"
                  color="blue"
                  onClick={(e) => setShowModal(false)}
                  ripple="light"
                  type="submit"
                >
                  Criar Projeto
                </Button>
              </div>
            </ModalFooter>
          </form>
        </Modal>

        <div className="sticky border">
          <Card className="border-rounded-none">
            <CardBody>
              <H6 color="gray">Filtros:</H6>
              <div className="w-full">
                <Select items={vetorEstados} id="uf" />
              </div>
              <br />
              <InputIcon
                type="text"
                color="purple"
                size="regular"
                outline={true}
                placeholder="Nome do contratante"
                iconFamily="material-icons"
                iconName="search"
              />

              <br />
              <Input
                type="date"
                color="purple"
                size="regular"
                placeholder="Data de postagem"
                outline={true}
              />

              <br />
              <div className="w-full">
                <Select items={tecnologiasF} id="tecnologias" />
              </div>
              <br />

              <Input
                type="number"
                color="purple"
                size="regular"
                outline={true}
                placeholder="Experiência (em anos)"
                min="0"
              />
            </CardBody>

            <CardFooter className="flex-center">
              <Button
                className="padding-lr rounded-sm hover:shadow-none border-none shadow-none blue-bgc text-white"
                color="blue"
                size="lg"
                ripple="light"
              >
                Filtrar
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
