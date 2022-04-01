import React, { useEffect, useState } from "react";
import api from "../../api";

import Icon from "@material-tailwind/react/Icon";

import Pagination from "@material-tailwind/react/Pagination";
import PaginationItem from "@material-tailwind/react/PaginationItem";

import CardProjeto from "components/cardProjeto/CardProjeto";
import CardOferta from "components/cardOferta/CardOferta";

// import "../../assets/styles/projetos.css";

export default function ProjetosSecao() {
  const [isLoading, setLoading] = useState(true);
  const [demandas, setDemandas] = useState([]);

  useEffect(() => {
    async function getAllDemandas() {
      let uf = "SP" 
      const response = await api.get(`/demandas/uf/${uf}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('@Hireit/token')}`,
        },
      });
      console.log(response.data);
      setDemandas(response.data);
      setLoading(false);
    }

    getAllDemandas();
  }, []);

  function dateFormatter(date) {
    var formattedDate =
      date.substring(8, 10) +
      "/" +
      date.substring(5, 7) +
      "/" +
      date.substring(0, 4);
    return formattedDate;
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
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <br/><br/>
      </section>
    );
  }
  return (
    <>
      <div className="flex flex-col pl-5">
        {demandas.map((demanda) => (
          <>
            <CardProjeto 
                tipo="projeto"
                id={demanda.idProjeto}
                descricao={demanda.descricao}
                titulo={demanda.titulo}
                data={demanda.dataPostagem}
                tecnologias={demanda.listTecnologias}
                token={sessionStorage.getItem('@Hireit/token')}
            />
            <CardOferta 
                tipo="projeto"
                id={demanda.idProjeto}
                descricao={demanda.descricao}
                titulo={demanda.titulo}
                data={demanda.dataPostagem}
                token={sessionStorage.getItem('@Hireit/token')}
            />
          </>
        ))}
      </div>
    </>
  );
}
