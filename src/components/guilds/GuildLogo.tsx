import {Component} from "preact";
import {GuildLogoProps} from "../../utils/Interfaces";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFortAwesome} from "@fortawesome/free-brands-svg-icons";
export default class GuildLogo extends Component<GuildLogoProps, {}> {

    render() {
        return (
            this.props.link ? <img src={this.props.link} class={this.props.size == "2x" ? "serverImage": ""} /> : <FontAwesomeIcon icon={faFortAwesome} size={this.props.size}/>
        );
    }
}