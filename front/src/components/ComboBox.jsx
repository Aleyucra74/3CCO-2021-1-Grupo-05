import React from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";

function ComboBox(props){

    // const opcoes = ['teste1','teste2','teste3','teste4','teste5','teste6','teste7','teste8','teste9']
    const classes = useStyles();
    return (
        <>

        <div className={props.divComboStyle}>
            <h3>{props.titleComboBox}</h3>
            <Autocomplete
                id={props.id}
                options={props.options}
                getOptionLabel={props.opcoesLabel}
                onChange={props.onInputChange}
                className={props.autoCompleteStyle}
                classes={classes}
                renderInput={(params) =>
            <TextField {...params}
                className={classes.inputRoot} 
                label="-- Selecione uma categoria --"
                variant="outlined" 
                color="white"
            />}
            />
        </div>
    </>
    )

}

const useStyles = makeStyles(theme => ({
    inputRoot: {
    color: "white",
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#7ACDF1"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#7ACDF1"
    },
    "& .MuiSvgIcon-root": {
        color: "white"
    },
    "& .MuiInputBase-input": {
        color: "white"
    }

    }
}));

export default ComboBox;