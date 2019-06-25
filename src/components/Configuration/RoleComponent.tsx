import {Component} from "preact";
import {RoleComponentProps} from "../../utils/Interfaces";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {faLock} from "@fortawesome/free-solid-svg-icons/faLock";
export default class RoleComponent extends Component<RoleComponentProps, {}> {


    render() {
        const remover = this.props.remover;
        const {name, color} = this.props.role;
        const r = color >> 16;
        const g = color >> 8 & 255;
        const b = color & 255;
        const hsp = Math.sqrt(
            0.299 * (r * r) +
            0.587 * (g * g) +
            0.114 * (b * b)
        );


        const markerContent = remover ? <a onclick={() => remover(this.props.role.id)} style={{padding: "0.35em"}}><FontAwesomeIcon icon={faTimes}/></a> : <div style={{padding: "0 0.25em"}}><FontAwesomeIcon icon={faLock}/></div>

        return (
            <div class="level roleLevel" style={{float: "left", marginRight: "1em", backgroundColor:  hsp < 127 ? "#36393f": "#ffffff"}}>
                <div style={{backgroundColor: color}} class="roleMarker">{markerContent}</div><div style={{color: color}}>{name}</div>
            </div>
        );
    }
}