import "./button.css"

export default function Button(props){
    return <button className="button" style={{width: `${props.width}px`, backgroundColor: props.disable ? "#D1D1D1" : "", cursor: props.disable ? "default" : ""}}>
        {props.text}
    </button>
}