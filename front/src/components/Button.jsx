import React from 'react';
import { Link } from 'react-router-dom';

function Button (props) {

    return (
        <div>
            <>
                <button onClick={props.clickFunction} type={props.tipo !== "button" ? props.tipo : "button"} className={props.classname}>{props.title}</button>
            </>
        </div>
    )

}

export default Button;