import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api";

import ServicesNavbar from "components/ServicesNavbar";
import TituloSecao from "components/global/TituloSecao";
import DescricaoSecao from "components/global/DescricaoSecao";
import HabilidadesSecao from "components/global/HabilidadesSecao";
import ContratanteSecao from "components/global/ContratanteSecao";

export default function Projeto(props) {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [demanda, setDemanda] = useState({});
  const [tecnologiasDemanda, setTecnologiasDemanda] = useState([]);
  const [propostas, setPropostas] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const currentUser = sessionStorage.getItem("@Hireit/idUsuario");

  async function getDemandaById(id) {
    const response = await api.get(`/demandas/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("@Hireit/token")}`,
      },
    });
    console.log(response.data);
    setDemanda(response.data);
    getTecnologiasByDemanda(id);
  }

  async function getTecnologiasByDemanda(idDemanda) {
    const response = await api.get(`/tecnologias/demandas/${idDemanda}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("@Hireit/token")}`,
      },
    });
    console.log(response.data);
    setTecnologiasDemanda(response.data);
    getFreelancers();
  }
  async function getFreelancers() {
    await api
      .get(`/ofertas/usuario/${currentUser}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("@Hireit/token"),
        },
      })
      .then((response) => {
        setFreelancers(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
    getAllPropostasByDemanda();
  }

  async function getAllPropostasByDemanda() {
    const response = await api.get(`/propostas/demanda/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("@Hireit/token")}`,
      },
    });
    console.log(response.data);
    setPropostas(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getDemandaById(id);
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
=      <TituloSecao
        id={demanda.idDemanda}
        type="projeto"
        projectTitle={demanda.titulo}
        propostas={propostas}
        userId={demanda.usuario.idUsuario}
        userName={demanda.usuario.nome}
        city={demanda.usuario.localizacao.cidade}
        uf={demanda.usuario.localizacao.uf}
        proposta={freelancers}
        payment={demanda.salario}
      />
      <br />
      <main style={{ maxWidth: "768px", margin: "auto" }}>
        {/* Description Section */}
        <div className="border-bottom py-4">
          <DescricaoSecao description={demanda.descricao} />
          <br />
        </div>

        {/* Skills Section */}
        <div className="border-bottom py-4">
          <HabilidadesSecao tecnologias={tecnologiasDemanda} />
          <br />
        </div>

        {/* About Hire Section */}

        {sessionStorage.getItem("@Hireit/idUsuario") ===
        demanda.usuario.idUsuario.toString() ? (
          ""
        ) : (
          <div className="py-4">
            <ContratanteSecao
              type="projeto"
              userName={demanda.usuario.nome}
              userDescription={demanda.usuario.descricao}
            />
            <br />
          </div>
        )}
      </main>
    </>
  );
}
