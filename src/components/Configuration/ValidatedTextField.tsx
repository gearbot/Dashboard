import {Component} from "preact";
import {ValidatingSettingsComponentProps} from "../../utils/Interfaces";
export default class ValidatedTextField extends Component<ValidatingSettingsComponentProps, {}> {

    constructor(props, state) {
        super(props, state);
    }

    render() {
        const {value, setter, name, info, validator, changed, api_name} = this.props;
        const error = validator(value);
        const valid = error === true;
        const c = "input " +( changed ? (valid ? "is-success" : "is-danger") : "");
        return (
            <div class="field">
                <label class="label">{name}</label>
                <div class="control">
                    <input class={c} type="text" value={value} onchange={(event) => setter(api_name, event.target.value)} title={info}/>
                </div>
                <p class="help is-danger">{valid ? " " : error}</p>
            </div>

        );
    }
}