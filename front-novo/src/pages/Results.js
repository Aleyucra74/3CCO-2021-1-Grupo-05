import React from "react";
import ServicesNavbar from "components/ServicesNavbar";
import CardsPersonalidade from "components/results/InfoSection";
import { useLocation } from "react-router-dom";
import api from "../api";
import ChartSection from "components/results/ChartSection";
import Header from "components/results/Header";
import Button from "@material-tailwind/react/Button";
import { useHistory } from "react-router";

export default function Results() {
  const history = useHistory();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  async function PostTestePersonalidade() {
    const query = useQuery();
    const array = [
      { id: 1, nota: query.get("o") },
      { id: 2, nota: query.get("c") },
      { id: 3, nota: query.get("e") },
      { id: 4, nota: query.get("a") },
      { id: 5, nota: query.get("s") },
    ];

    array.map((data) => (
      api.post("/softskills/usuario", {
        notaSoftskill: data.nota,
        softskill: {
          idSoftSkills: data.id,
        },
        usuario: {
          idUsuario: parseInt(sessionStorage.getItem("@Hireit/idUsuario")),
        },
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(
            "@Hireit/token"
          )}`,
        },
      }
      )
      .then((resposta) => {
        console.log("post ok", resposta);
        console.log(resposta.data);
      })
    ))
  }

  return (
    <>
      <div className="bg-gray-100">
        <ServicesNavbar />
        <main>
          <Header />
          <ChartSection scores={PostTestePersonalidade()}/>
          <CardsPersonalidade />
          <Button
            size="lg"
            className="mx-auto"
            onClick={() => { history.push("/perfil/personalidade") }}          
          >
            Continuar
          </Button>
          <br />
          <br />
        </main>
      </div>
    </>
  );
}
