import {Component} from "preact";
import {BasicInputComponentProps} from "../../utils/Interfaces";

export default class BasicInput extends Component<BasicInputComponentProps, {}> {

    constructor(props, state) {
        super(props, state);
    }

    render() {
        const {value, setter, name, info, validator, changed, api_name, disabled, type} = this.props;
        const error = validator(value);
        const valid = error === true;
        const c = "input " + (changed ? (valid ? "is-success" : "is-danger") : "");
        return (
            <div class="field">
                <label class="label">{name}</label>
                <div class="control">
                    <input class={c} type={type} value={value} title={info} disabled={disabled} step={1}
                           onchange={(event) => setter(api_name, event.target.value)}/>
                </div>
                <p class="help is-danger">{valid ? " " : error}</p>
            </div>

        );
    }
}