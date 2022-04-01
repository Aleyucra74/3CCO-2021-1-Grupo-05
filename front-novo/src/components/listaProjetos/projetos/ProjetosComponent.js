import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";

import Label from "@material-tailwind/react/Label";
import Image from "@material-tailwind/react/Image";
import Heading6 from "@material-tailwind/react/Heading6";
import Button from "@material-tailwind/react/Button";
import api from "../../../api";

import NoUserPic from "assets/img/no-user.jpg";

import "../../../assets/styles/projetos.css";

export default function ProjetosComponents({
  idProjeto,
  projectTitle,
  userName,
  city,
  uf,
  date,
  src,
  link,
}) {
  const [tecnologiasDemanda, setTecnologiasDemanda] = useState([]);
  useEffect(() => {
    async function getTecnologiasByOferta(idDemanda) {
      const response = await api.get(`/tecnologias/demandas/${idDemanda}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('@Hireit/token')}`,
        },
      });
      console.log(response.data);
      setTecnologiasDemanda(response.data);
    }
    getTecnologiasByOferta(idProjeto);
  }, []);
  return (
    <>
      <Card className="hover-gray rounded-corners border-bottom py-10 flex justify-between">
        <div className="flex">
          <CardHeader className="w-32" color="transparent" size="lg" iconOnly>
            <Image
              className="mt-10"
              src={NoUserPic}
              alt="Profile picture"
              raised
            />
          </CardHeader>
          <CardBody className="pl-0">
            <Heading6 className="mb-0 font-sans text-large">
              {projectTitle}
            </Heading6>
            <Label className="font-sans text-base px-0">
              {userName} - {city} - {uf}
            </Label>
            <div className="flex">
              {tecnologiasDemanda.length === 0 ? "" : tecnologiasDemanda.map((tec) => (
                <Label className="px-2 py-1.5 text-color-white purple-bgc rounded-corners">
                  {tec.tecnologias.tecnologia}
                </Label>
              ))}
            </div>
          </CardBody>
        </div>
        <CardFooter className="flex flex-col justify-between">
          <Label className="text-color-gray">{date}</Label>
          <div>
            <Button
              className="bg-transparent hover:bg-transparent hover:shadow-none shadow-none color-purple active:bg-transparent focus:bg-transparent"
              type="button"
              ripple="light"
            >
              <Link to={link}>VER MAIS</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
