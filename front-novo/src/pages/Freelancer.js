import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api";

import ServicesNavbar from "components/ServicesNavbar";
import TituloSecao from "components/global/TituloSecao";
import DescricaoSecao from "components/global/DescricaoSecao";
import HabilidadesSecao from "components/global/HabilidadesSecao";
import ContratanteSecao from "components/global/ContratanteSecao";

export default function Freelancer(props) {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [oferta, setOferta] = useState({});
  const [tecnologiasOferta, setTecnologiasOferta] = useState([]);
  const [propostas, setPropostas] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [usuario, setUsuario] = useState([]);

  let token = sessionStorage.getItem("@Hireit/token");
  let currentUser = sessionStorage.getItem("@Hireit/idUsuario");

  async function getOfertaById(id) {
    const response = await api.get(`/ofertas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
    getProjetos();
  }

  async function getProjetos() {
    await api
      .get(`/demandas/usuario/${currentUser}`, {
        headers: {
          Authorization:
            "Bearer " + sessionStorage.getItem("@Hireit/token"),
        },
      })
      .then((response) => {
        setProjetos(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
      getAllPropostasByOferta()
  }

  async function getAllPropostasByOferta() {
    const response = await api.get(`/propostas/oferta/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("@Hireit/token")}`,
      },
    });
    setPropostas(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getOfertaById(id);
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
        id={oferta.idOferta}
        type="freelancer"
        propostas={propostas}
        userId={oferta.usuario.idUsuario}
        userName={oferta.usuario.nome}
        city={oferta.usuario.localizacao.cidade}
        uf={oferta.usuario.localizacao.uf}
        proposta={projetos}
      />
      <br />
      <main style={{ maxWidth: "768px", margin: "auto" }}>
        {/* Description Section */}
        <div className="border-bottom py-4">
          <DescricaoSecao description={oferta.descricao} />
          <br />
        </div>

        {/* Skills Section */}
        <div className="border-bottom py-4">
          <HabilidadesSecao tecnologias={tecnologiasOferta} />
          <br />
        </div>

        {/* About Hire Section */}

        {sessionStorage.getItem("@Hireit/idUsuario") ===
        oferta.usuario.idUsuario.toString() ? (
          ""
        ) : (
          <div className="py-4">
            <ContratanteSecao
              type="freelancer"
              userName={oferta.usuario.nome}
              userDescription={oferta.usuario.descricao}
            />
            <br />
          </div>
        )}
      </main>
    </>
  );
}
