import {Component} from "preact";
import {SettingsComponentProps} from "../../utils/Interfaces";
import {useContext} from "preact/hooks";
import {GeneralInfo} from "../wrappers/Context";
import {Text} from 'preact-i18n';
import InfoTooltip from "./InfoTooltip";

export default class LanguageSelector extends Component<SettingsComponentProps, {}> {

    render() {
        const {value, setter, name, changed, disabled} = this.props;
        const langs = useContext(GeneralInfo).languages;
        const assembed = [];
        for (let code in langs) {
            assembed.push(<option value={code} selected={code == value}>{langs[code]}</option>)
        }
        return (
            <div class="field">
                <label class="label">
                    <Text id={`config.basic.language`}/>
                    <InfoTooltip name='language'/>
                </label>
                <div class={changed ? "select is-success" : "select"}>
                    <select onchange={(event) => setter(name, event.target.value)} disabled={disabled}>
                        {assembed}
                    </select>
                </div>
            </div>

        );
    }
}