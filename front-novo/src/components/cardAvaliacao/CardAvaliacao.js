import '../cardProjetoAndamento/cardProjetoAndamento.css'
import './cardAvaliacao.css'

import logo from '../../assets/img/no-user.jpg'
import capa from '../../assets/img/perfil/b3-capa.jpg'

export default function CardAvaliacao() {
    return <div className={`box-card-projeto`}>
        <div className="card-projeto">
            <div className="banner-card-projeto" style={{backgroundColor: '#B4F6FF'}}>
                <img src={logo} className="logo-card-projeto"/>
                {/* <img src={capa} className="capa-card-projeto"/> */}
            </div>
            <div className="info-card-projeto">
                <div className="line-one-card-projeto">
                    <span className="freelancer tag">Freelancer</span>
                </div>
                <p className="titulo-card-projeto">Segunda Demanda</p>
                <div className="line-rating">
                    <p className="avaliacao-card-projeto span">4.9</p>
                    <box-icon type='solid' name='star' color='#F4C344' size="14px"></box-icon>
                    <p className="avaliacao-card-projeto">Softskills</p>
                </div>
                <div className="line-rating">
                    <p className="avaliacao-card-projeto span">4.9</p>
                    <box-icon type='solid' name='star' color='#F4C344' size="14px"></box-icon>
                    <p className="avaliacao-card-projeto">Habilidades técnicas</p>
                </div>
            </div>
        </div> 
    </div>
}