import React, { useEffect, useState } from "react";
import NoUserPic from "../../../assets/img/no-user.jpg";
import Image from "@material-tailwind/react/Image";
import Heading6 from "@material-tailwind/react/Heading6";
import Heading5 from "@material-tailwind/react/Heading5";
import TecnologiaComponent from "../tecnologias/TecnologiaComponent";
import { useHistory } from "react-router";
import "../../../assets/styles/proposta.css";
import "../../../assets/styles/components/modal-contrato.css";
import Button from "@material-tailwind/react/Button";
import { Link } from "react-router-dom";
import api from "api";

export default function Proposta({
  type,
  ofertaDemanda,
  idCurrentOfertaDemanda,
}) {
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [tecnologias, setTecnologias] = useState([]);

  let proposta = {};
  let idOferta = 0;
  let idDemanda = 0;
  if (type === "oferta") {
    idOferta = ofertaDemanda.idOferta;
    idDemanda = idCurrentOfertaDemanda;
  } else if(type === "demanda"){
    idOferta = idCurrentOfertaDemanda;
    idDemanda = ofertaDemanda.idDemanda;
  }

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
    setLoading(false);
  }

  async function postContrato(idOferta, idDemanda) {
    await api
      .post(
        "/propostas",
        (proposta = {
          oferta: {
            idOferta: idOferta,
          },
          demanda: {
            idDemanda: idDemanda,
          },
        }),
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
      history.push(type === "oferta" ? "/Projeto/" + idDemanda : "/Freelancer/" + idOferta)
  }

  useEffect(() => {
    if (type === "oferta") {
      getTecnologiasByOferta(ofertaDemanda.idOferta);
    } else if (type === "demanda") {
      getTecnologiasByProjeto(ofertaDemanda.idDemanda);
    }
  }, []);

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
      <div className="flex flex-row border-all max-w-screen-sm mr-8">
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
                {ofertaDemanda.usuario.nome}
              </Heading5>
              <span>
                {ofertaDemanda.usuario.localizacao.cidade} -{" "}
                {ofertaDemanda.usuario.localizacao.uf}
              </span>
            </div>
          </div>
          <div className="pb-4 w-96">
            <Heading6>
              {type === "demanda" ? ofertaDemanda.Titulo : "Descrição"}
            </Heading6>
            <p
              className="text-left px-6"
              style={{
                maxHeight: "100ch",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {ofertaDemanda.descricao}
              {""}
              <br />
              <span id="dots" className="text-blue-500 font-semibold">
                ...
              </span>
              {type === "demanda" ? (
                <Link to={`/Projeto/${ofertaDemanda.idDemanda}`}>
                  {" "}
                  <button
                    className="focus:bg-transparent text-blue-500 font-semibold"
                    id="btnReadMore"
                  >
                    Ler Mais
                  </button>
                </Link>
              ) : (
                <Link to={`/Freelancer/${ofertaDemanda.idOferta}`}>
                  {" "}
                  <button
                    className="focus:bg-transparent text-blue-500 font-semibold"
                    id="btnReadMore"
                  >
                    Ler Mais
                  </button>
                </Link>
              )}
            </p>
          </div>
          <div className="pb-4">
            <Heading6>Tecnologias:</Heading6>
            <div className="flex justify-center">
              {tecnologias.length > 0 ? (
                <div
                  className="grid grid-cols-2 gap-2"
                  style={{ width: "22rem" }}
                >
                  {" "}
                  {tecnologias.map((tec) => (
                    <TecnologiaComponent tecnologia={tec} />
                  ))}{" "}
                </div>
              ) : (
                "Sem tecnologias selecionadas"
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <Button
              className="ml-2 btn-green-accept shadow none"
              onClick={() => postContrato(idOferta, idDemanda)}
            >
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
