import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api";

import ServicesNavbar from "components/ServicesNavbar";
import TituloSecao from "components/global/TituloSecao";
import DescricaoSecao from "components/global/DescricaoSecao";
import HabilidadesSecao from "components/global/HabilidadesSecao";

export default function Contrato(props) {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [contrato, setContrato] = useState({});
  const [tecnologiasDemanda, setTecnologiasDemanda] = useState([]);
  const [usuario, setUsuario] = useState([]);

  let token = sessionStorage.getItem("@Hireit/token");
  let actualUserId = sessionStorage.getItem("@Hireit/idUsuario");

  async function getContratoById(id) {
    const response = await api.get(`/contratos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    setContrato(response.data);
    getTecnologiasDemandaByContrato(id);
  }

  async function getTecnologiasDemandaByContrato(idContrato) {
    const response = await api.get(
      `/contratos/tecnologias/demanda/${idContrato}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("@Hireit/token")}`,
        },
      }
    );
    console.log(response.data);
    setTecnologiasDemanda(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getContratoById(id);
  }, []);

  if (isLoading) {
    return (
      <section className="pt-48 w-full max-w-8x1 px-4 overflow-auto pb-64">
        {" "}
        <div className="w-300 mx-auto center">
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
      <ServicesNavbar />
      {/* Header Project Title Section */}
      <TituloSecao
        id={contrato.demandas.idDemanda}
        type="contrato"
        userId={contrato.demandas.usuario.idUsuario}
        userName={contrato.demandas.usuario.nome}
        city={contrato.demandas.usuario.localizacao.cidade}
        uf={contrato.demandas.usuario.localizacao.uf}
        payment={contrato.valorHora}
        contratoEndDate={contrato.dataFim}
      />
      <br />
      <main style={{ maxWidth: "768px", margin: "auto" }}>
        {/* Description Section */}
        <div className="border-bottom py-4">
          <DescricaoSecao
            type="contrato"
            projectTitle={contrato.demandas.titulo}
            description={contrato.demandas.descricao}
          />
          <br />
        </div>

        {/* Skills Section */}
        <div className="border-bottom py-4">
          <HabilidadesSecao tecnologias={tecnologiasDemanda} />
          <br />
        </div>
      </main>
    </>
  );
}
