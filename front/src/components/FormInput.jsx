import React from 'react';


function FormInput(props){

    return (
        <>
        {/* <input className={props.formInput} type={props.type} placeholder={props.placeholder}  /> */}
        
        <div className={props.formInput}>
            <h2>{props.title}</h2>
            <input type={props.type} placeholder={props.placeholder} onChange={props.changeFunction} id={props.idInput}/>
        </div>
        </>
    )

}

export default FormInput;