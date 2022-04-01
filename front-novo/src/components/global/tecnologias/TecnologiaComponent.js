import React from 'react';

import Image from "@material-tailwind/react/Image";

import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";

import Image8 from "assets/img/tecnologias/c.svg";
import Image6 from "assets/img/tecnologias/c#.svg";
import Image7 from "assets/img/tecnologias/c++.svg";
import Image11 from "assets/img/tecnologias/cobol.svg";
import Image1 from "assets/img/tecnologias/java.svg";
import Image3 from "assets/img/tecnologias/mysql.svg";
import Image10 from "assets/img/tecnologias/python.svg";
import Image9 from "assets/img/tecnologias/r.svg";
import Image5 from "assets/img/tecnologias/react.svg";
import Image2 from "assets/img/tecnologias/spring.svg";
import Image4 from "assets/img/tecnologias/sqlserver.svg";
import NoImage from "assets/img/tecnologias/no-image.png";

import Tecnologia from '../../../assets/img/tecnologias/java.svg';

export default function TecnologiaComponent({tecnologia}) {
    function habilidadeImage(id) {
        switch (id) {
          case 1:
            return Image1;
          case 2:
            return Image2;
          case 3:
            return Image3;
          case 4:
            return Image4;
          case 5:
            return Image5;
          case 6:
            return Image6;
          case 7:
            return Image7;
          case 8:
            return Image8;
          case 9:
            return Image9;
          case 10:
            return Image10;
          case 11:
            return Image11;
          default:
            return NoImage;
        }
      }
    return (

        <>
            <div style={{width:"10rem"}} className="mt-1 border-all">
                <Card className="p-0 shadow-none flex flex-row">
                    <CardBody className="bg-gray-200 p-0 w-2/3 flex justify-center rounded-l-md">
                        <Image className="w-7 shadow-none" src={habilidadeImage(
                          tecnologia.tecnologias.idTecnologia
                        )} alt="Profile picture" raised/>
                    </CardBody>
                    <CardBody className="bg-white px-4 w-2/3 flex items-center justify-center rounded-md">
                        <p className="text-md text-gray-600">
                            {tecnologia.tempoExperiencia}
                        </p>
                    </CardBody>
                </Card>
            </div>
        </>

    )

}