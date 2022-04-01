import { Progress } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import NavBarLogado from 'components/NavBar';

import Card from '@material-tailwind/react/Card';

import "../assets/styles/scoreChart.css"
import "../assets/styles/tailwind.css"

export default ScoreChart;

export function ScoreChart({ scores, time, ...props }) {
  return (
    <>
    <div className="container-progress">
        <Card>
            <Progress className="c" value={scores["Conscientiousness"]} progress="value" label="Conscienciosidade" />
            <Progress className="n" value={scores["Emotional Stability"]} progress="value" label="Estabilidade emocional" />
            <Progress className="a" value={scores["Agreeableness"]} progress="value" label="Amabilidade" />
            <Progress className="e" value={scores["Extroversion"]} progress="value" label="Extroversão" />
            <Progress className="o" value={scores["Openness"]} progress="value" label="Aberto para experiências" />
        </Card>
    </div> 
    </>
  );
}
