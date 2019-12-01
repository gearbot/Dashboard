import {Component} from "preact";
import {GuildLogoProps} from "../../utils/Interfaces";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFortAwesome} from "@fortawesome/free-brands-svg-icons";

export default class GuildLogo extends Component<GuildLogoProps, {}> {

    render() {
        const {link, name, size} = this.props;
        const style = {
            width: `${size}em`,
            height: `${size}em`,
        };

        const offset = {
            marginLeft: `${size/2}em`,
            marginTop: `${size/2}em`
        }
        return (
            <div class="guild-icon" style={style}>
                {this.props.link ?
                    <img src={link}/>
                    :
                    <div class="servericon-alt" style={{lineHeight: `${size}em`}}>
                        {name.split(" ").map(s => s[0]).join("").substr(0, 5)}
                    </div>
                }
            </div>
        );
    }
}