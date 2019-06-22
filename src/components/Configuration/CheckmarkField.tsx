import {Component} from "preact";
import {SettingsComponentProps} from "../../utils/Interfaces";
export default class CheckmarkField extends Component<SettingsComponentProps, {}> {

    constructor(props, state) {
        super(props, state);
    }

    render() {
        const {value, setter, name, info, api_name} = this.props;
        return (
            <div class="field">
                <label class="checkbox">
                    <input type="checkbox" checked={value} onclick={(event) => setter(api_name, event.target.checked)} title={info}/>
                        {name}
                </label>
            </div>

        );
    }
}