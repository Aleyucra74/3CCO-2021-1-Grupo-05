import './select.css'

export default function Select(props){

    var items = props.items.slice(1, props.items.length);

    return <select className="select" defaultValue={props.items[0]} id={props.id} >
        <option value={props.items[0]} disabled hidden>{props.items[0]}:</option>
        {
           items.map( (items) => (
            <option value={items}>{items}</option>
           ))
        }
    </select>
}