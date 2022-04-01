import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import '../styles/components/Slider.css';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSlider(props) {
  const classes = useStyles();

  return (
    <>
    <div className="container">
    
    <section className="section-discordo">
      <h1 className="discordo">DISCORDO</h1>
    </section>
    <div className={classes.root}>
    
    <div className="div-slider">
      <Typography className="title-slider" id="discrete-slider" gutterBottom>
      <p>{props.titulo}</p>
      </Typography>
      <Slider
        className="slider"
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={5}
      />
    </div>
    </div>
    <section className="section-concordo">
      <h1 className="concordo">CONCORDO</h1>  
    </section>
    </div>
    </>
  );
}
