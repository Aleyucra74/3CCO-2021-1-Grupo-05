export default function Sobre(props){
    return <>
        <div className="container-perfil" style={{height: "100%"}}>
            <p className="titulo-perfil" style={{fontWeight: "bold", fontSize: "24px"}}>Sobre mim</p>
            <p className="texto-perfil" style={{padding: "0px 48px 16px 48px"}}>{props.descricao}</p>
        </div>
    </>
}