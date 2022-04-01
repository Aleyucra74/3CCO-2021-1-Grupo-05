import React from 'react';

import Heading4 from '@material-tailwind/react/Heading4';

export default function DescricaoSecao({
    type,
    projectTitle,
    description
}) {

    return (
        <>
            <Heading4>{type === "contrato" ? projectTitle : "Sobre o trabalho"}</Heading4>
            <div className="flex justify-start px-12 pt-4">
                <p className="text-left">{description}</p>
            </div>
        </>
    )

}