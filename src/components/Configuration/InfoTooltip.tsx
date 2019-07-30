import {Component} from "preact";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {InfoTooltipProps} from "../../utils/Interfaces";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons/faQuestionCircle";
import {Text} from 'preact-i18n';


export default class InfoTooltip extends Component<InfoTooltipProps, {}> {



    render() {
        return (
            <div class="helpholder">
                <FontAwesomeIcon icon={faQuestionCircle}/>
                <div class="helpcontent">
                    <Text id={`help.${this.props.name}`}/>
                </div>
            </div>
        );
    }
}

