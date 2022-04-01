import React from 'react';

import Card from "@material-tailwind/react/Card";
import Heading2 from '@material-tailwind/react/Heading2';


export default function CardContent(props) {

    return (

        <>
            <Card className={`${props.styleName}`}>
                <Heading2>
                    {props.numero}
                </Heading2>
                <p className="text-left text-lg pl-2">{props.texto}</p>
            </Card>
        </>

    )

}