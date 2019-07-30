import {Component} from "preact";
import {RoleComponentProps} from "../../utils/Interfaces";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {faLock} from "@fortawesome/free-solid-svg-icons/faLock";
import {icon} from "@fortawesome/fontawesome-svg-core";
export default class RoleComponent extends Component<RoleComponentProps, {}> {

    luminanace = (r, g, b) => {
        var a = [r, g, b].map(function (v) {
            v /= 255;
            return v <= 0.03928
                ? v / 12.92
                : Math.pow( (v + 0.055) / 1.055, 2.4 );
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };
    contrast = (rgb1, rgb2) => {
        return (this.luminanace(rgb1[0], rgb1[1], rgb1[2]) + 0.05)
            / (this.luminanace(rgb2[0], rgb2[1], rgb2[2]) + 0.05);
    }


    render() {
        const remover = this.props.remover;
        const {name, color} = this.props.role;
        let c = parseInt(color.substring(1), 16);
        const r = (c >> 16) & 0xff;
        const g = (c >> 8) & 0xff;
        const b = (c >> 0) & 0xff;
        let bgcolor = "#36393f";
        if (this.contrast([r, g, b], [249, 249, 249]) > this.contrast([r, g, b], [54, 57, 63]))
            bgcolor = "#f9f9f9";

        // console.log(name, color, this.contrast([r, g, b], [249, 249, 249]), this.contrast([r, g, b], [54, 57, 63]), bgcolor, this.contrast([r, g, b], [249, 249, 249]) > this.contrast([r, g, b], [54, 57, 63]))

        let iconcolor = "#4a4a4a";
        if (this.contrast([r, g, b], [204, 204, 204]) > this.contrast([r, g, b], [74, 74, 74]))
            iconcolor = "#cccccc";


        const markerContent = remover ? <a onclick={() => remover(this.props.role.id)} style={{padding: "0.35em", color: iconcolor}}><FontAwesomeIcon icon={faTimes}/></a> : <div style={{padding: "0 0.25em"}}><FontAwesomeIcon icon={faLock}/></div>

        return (
            <div class="level roleLevel" style={{float: "left", marginRight: "1em", backgroundColor: bgcolor}}>
                <div style={{backgroundColor: color, color: iconcolor}} class="roleMarker">{markerContent}</div><div style={{color: color}}>{name}</div>
            </div>
        );
    }
}