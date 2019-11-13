import {Component} from "preact";
import {GearIconProps} from "../../utils/Interfaces";

export default class GearIcon extends Component<GearIconProps, {}> {

    render() {
        return (
            <img src={`/assets/gear${this.props.name}.png`} style={{height: `${this.props.size || 1}em`}}/>
        )
    }
}