import React from "react"
import { Link } from 'react-router-dom'
import { Button, Container, Divider, Icon } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import big5 from "../tests/big5";
import _ from "lodash";
import NavBarLogado from 'components/NavBar';
import Heading2 from "@material-tailwind/react/Heading2";
import ScrollToTop from 'components/ButtonScrollTop';
import ServicesNavbar from 'components/ServicesNavbar';

import "../assets/styles/testePersonalidade.css"
import Header from "components/testePersonalidade/Header";
export function scoringCallback(category, results) {
    return (score) => {
      results[category] += score;
    };
}

export function Selection({ onSelected, selected, color, hover, size }) {
    const selectedStyle = selected
      ? {
          backgroundColor: color,
        }
      : {};
    return (
      <div
        className="selection"
        style={{
          ...selectedStyle,
          borderRadius: "100%",
        }}
        onClick={() => onSelected()}
      >
        <style jsx scoped>{`
          .selection {
            height: ${size};
            width: ${size};
            background-color: transparent;
            border: 4px solid ${"#8a8a8a"};
            transition: background-color 0.1s linear;
          }
        `}</style>
      </div>
    );
}

export function Question({ question, onAnswer }) {
    const [state, setState] = React.useState(undefined);
    const questionRef = React.createRef();
    const colors = ["#ff0000", "#ff6666", "#bdbdbd", "#5ec493", "#00a656"];
    return (
      <div className="question" ref={questionRef}>
        <div className="question-text">{big5.personalize(question.question)}</div>
        <div className="questions">
          {[1, 2, 3, 4, 5].map((score, i) => (
            <Selection
              key={i}
              selected={state !== undefined && state === score}
              onSelected={() => {
                questionRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
                setState(score);
                onAnswer(score);
              }}
              color={colors[i]}
              hover={`${colors[i]}88`}
              size={`${(score - 3) ** 2 * 2.5 + 35}px`}
            />
          ))}
        </div>
      </div>
    );
}

export function resultsURL(answers) {
    const results = big5.score(answers);
    return `?o=${results["Openness"]}&s=${results["Emotional Stability"]}&c=${results["Conscientiousness"]}&a=${results["Agreeableness"]}&e=${results["Extroversion"]}`;

}

export function Test() {
    const [results, setResults] = React.useState({});
    return (
      <>
        <main className="test-container bg-gray-100">
        <ServicesNavbar />
        <ScrollToTop />
        <Header/>
        <div className="container">
          <div className="container-progress">
  {/*         <h1 class="text-gray-900 text-xl font-serif font-bold leading-normal mt-0 mb-2" id="title-test">
            Faça o Teste de Personalidade
          </h1> */}
            <p class="text-blue-gray-700 text-base font-light leading-relaxed mb-4" id="description-test" style={{marginTop:"1rem "}}>
              Ele possui {big5.questions.length} questões <br/><br/>
              Cor <a id="vermelho">vermelho</a>: discordo <br/>
              Cor <a id="cinza">cinza</a>: neutro <br/>
              Cor <a id="verde">verde</a>: concordo
            </p>

            {big5.questions.map((question, i) => (
              <React.Fragment key={i}>
                <Question
                  question={question}
                  onAnswer={(score) => {
                    // score is 1 through 5
                    // -1 or 1
                    const direction = Number.parseInt(question.score);
                    // [1, 5]
                    const directedScore = direction === -1 ? 6 - score : score;
                    setResults({
                      ...results,
                      [question.question]: { category: question.category, score: directedScore },
                    });
                  }}
                />
                <Divider />
              </React.Fragment>
            ))}
            <div style={{ display: "flex", justifyContent: "center", margin: "50px 0 50px" }}>
            <Link to={`results${resultsURL(_.values(results))}`}>
                <Button
                  animated
                  circular
                  className="button-results"
                  color="teal"
                  disabled={_.keys(results).length !== big5.questions.length}
                >
                  <Button.Content visible>Resultado</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right"></Icon>
                  </Button.Content>
                </Button>
              </Link>
            </div>
            <br/>
            </div>
          </div>
        </main>
        </>
    );
}
  
export default Test;