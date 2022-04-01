import React from 'react';

import HabilidadeComponent from './habillidades/HabilidadeComponent';

import Heading4 from '@material-tailwind/react/Heading4';

export default function HabilidadesSecao({tecnologias}) {
    return (
        <>
            <Heading4>Habilidades </Heading4>
            <div className="px-10 flex justify-center pt-4">
                {console.log(tecnologias)}
            {tecnologias.length  < 1 ? "Sem habilidades encontradas" : tecnologias.map((tecnologia) => (
                <HabilidadeComponent
                    tecnologiaId={tecnologia.tecnologias.idTecnologia}
                    experience={tecnologia.tempoExperiencia}
                />
              ))}

            </div>
        </>        
    )
}