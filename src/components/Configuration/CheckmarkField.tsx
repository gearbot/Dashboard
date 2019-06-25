import {Component} from "preact";
import {SettingsComponentProps} from "../../utils/Interfaces";
export default class CheckmarkField extends Component<SettingsComponentProps, {}> {

    render() {
        const {value, setter, name, info, api_name, disabled} = this.props;
        return (
            <div class="field">
                <label class="checkbox">
                    <input type="checkbox" checked={value} onclick={(event) => setter(api_name, event.target.checked)} title={info} disabled={disabled}/>
                        {name}
                </label>
            </div>

        );
    }
}