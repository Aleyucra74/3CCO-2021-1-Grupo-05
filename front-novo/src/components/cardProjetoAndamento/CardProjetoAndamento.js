import "./cardProjetoAndamento.css";

import logo from "../../assets/img/b3-logo.png";
import capa from "../../assets/img/perfil/b3-capa.jpg";

export default function CardProjetoAndamento(props) {
  let dataInicio = props.dataInicio.split("T");
  let dataInicio2 = dataInicio[0].split("-");
  let dataInicioFormatado = `${dataInicio2[2]}/${dataInicio2[1]}/${dataInicio2[0]}`;

  let dataFim = props.dataFim.split("T");
  let dataFim2 = dataFim[0].split("-");
  let dataFimFormatado = `${dataFim2[2]}/${dataFim2[1]}/${dataFim2[0]}`;

  return (
    <div className={`box-card-projeto ${props.width}`}>
      <a href={`/contrato/${props.id}`}>
        <div className="card-projeto">
          <div className="banner-card-projeto">
            <img src={logo} className="logo-card-projeto" />
            <img src={capa} className="capa-card-projeto" />
          </div>
          <div className="info-card-projeto">
            <div className="line-one-card-projeto">
              <span className={`${props.tipo} tag`}>
                {props.tipo.charAt(0).toUpperCase() + props.tipo.slice(1)}
              </span>
              <span className="preco-card-projeto">R$ {props.salario}</span>
            </div>
            <p className="titulo-card-projeto">{props.titulo}</p>
            <p className="data-card-projeto">
              Data de inicio: {dataInicioFormatado}
            </p>
            <p className="data-card-projeto">
              Data de termino: {dataFimFormatado}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}
