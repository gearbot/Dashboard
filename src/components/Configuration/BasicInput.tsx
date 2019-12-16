import {Component} from "preact";
import {BasicInputComponentProps} from "../../utils/Interfaces";
import { Text } from 'preact-i18n';
import InfoTooltip from "./InfoTooltip";

export default class BasicInput extends Component<BasicInputComponentProps, {}> {

    render() {
        const {value, setter, name, validator, changed, disabled, type} = this.props;
        const error = validator(value);
        const valid = error === true;
        const c = "input " + (changed ? (valid ? "is-success" : "is-danger") : "");
        return (
            <div class="field">
                <label class="label"><Text id={`config.basic.${name.toLocaleLowerCase()}`}/> <InfoTooltip name={name.toLowerCase()}/></label>
                <div class="control">
                    <input class={c} type={type} value={value} disabled={disabled} step={1}
                           onChange={(event) => setter(name, type == "number" ? parseInt(event.target.value) : event.target.value)}/>
                </div>
                <p class="help is-danger">{valid ? " " : error}</p>
            </div>

        );
    }
}