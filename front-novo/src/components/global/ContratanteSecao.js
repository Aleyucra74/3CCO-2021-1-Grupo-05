import React from "react";

import Heading4 from "@material-tailwind/react/Heading4";
import Image from "@material-tailwind/react/Image";

import NoUserPic from "../../assets/img/no-user.jpg";
import Button from "@material-tailwind/react/Button";

import { Icon } from "semantic-ui-react";

export default function ContratanteSecao({type, userName, userDescription}) {
  return (
    <>
      <Heading4>{type === "freelancer" ? "Sobre o Freelancer" : "Sobre o Contratante" }</Heading4>
      <div className="flex flex-row justify-center pt-4">
        <div>
          <Image
            className="w-28"
            src={NoUserPic}
            alt="Profile picture"
            raised
          />
        </div>
        <div className="w-2/3">
          <div className="px-8 pb-4">
            <p className="text-left pb-1" style={{ marginLeft: "-10px" }}>
              <span>{userName}</span>
              <span style={{color: "#fbbd08"}}>
                {" "}
                4,9 <Icon color="yellow" name="star" />
              </span>
              <a href="/#" className="text-gray-400"> - Ver Avaliações</a>
            </p>
            <p className="text-left px-4">
              {userDescription}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="purple-bgc rounded-sm hover:shadow-none border-none shadow-none blue-bgc text-white">
          Enviar Proposta
        </Button>
      </div>
    </>
  );
}
