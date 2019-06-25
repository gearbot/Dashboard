import {Component} from "preact";
import {SettingsComponentProps} from "../../utils/Interfaces";
import {useContext} from "preact/hooks";
import {Languages} from "../wrappers/Context";
export default class LanguageSelector extends Component<SettingsComponentProps, {}> {

    render() {
        const {value, setter, name, info, api_name, changed, disabled} = this.props;
        const langs = useContext(Languages);
        const assembed = [];
        for (let code in langs) {
            assembed.push(<option value={code} selected={langs[code] == value}>{langs[code]}</option>)
        }
        return (
            <div class="field">
                <label class="label">{name}</label>
                <div class={changed? "select is-success" : "select"}>
                    <select onchange={(event) => setter(api_name, event.target.value)} title={info} disabled={disabled}>
                    {assembed}
                    </select>
                </div>
            </div>

        );
    }
}