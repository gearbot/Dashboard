import {Component} from "preact";
import {SettingsComponentProps} from "../../utils/Interfaces";
import {Text} from 'preact-i18n';
import InfoTooltip from "./InfoTooltip";

export default class CheckmarkField extends Component<SettingsComponentProps, {}> {

    render() {
        const {value, setter, name, disabled} = this.props;
        return (
            <div class="field">
                <label class="checkbox">
                    <input type="checkbox" checked={value} onClick={(event) => setter(name, event.target.checked)} disabled={disabled}/>
                        <Text id={`config.basic.${name.toLowerCase()}`}/>
                        <InfoTooltip name={name.toLowerCase()}/>
                </label>
            </div>

        );
    }
}