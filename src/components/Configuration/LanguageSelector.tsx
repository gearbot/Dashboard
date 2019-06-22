import {Component} from "preact";
import {SettingsComponentProps} from "../../utils/Interfaces";
import {useContext} from "preact/hooks";
import {Languages} from "../wrappers/Context";
export default class LanguageSelector extends Component<SettingsComponentProps, {}> {

    constructor(props, state) {
        super(props, state);
    }

    render() {
        const {value, setter, name, info, api_name} = this.props;
        const langs = useContext(Languages);
        const assembed = [];
        for (let code in langs) {
            assembed.push(<option value={code} selected={langs[code] == value}>{langs[code]}</option>)
        }
        return (
            <div class="field">
                <label class="label">{name}</label>
                <div class="select">
                    <select onchange={(event) => setter(api_name, event.target.value)} title={info}>
                    {assembed}
                    </select>
                </div>
            </div>

        );
    }
}