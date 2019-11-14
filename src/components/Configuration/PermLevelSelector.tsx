import {Component} from "preact";
import {PermLevelSelectorProps} from "../../utils/Interfaces";
import {useContext} from "preact/hooks";
import {Guild} from "../wrappers/Context";
import {Text} from 'preact-i18n';
import InfoTooltip from "./InfoTooltip";

const options = [
    "public",
    "trusted",
    "moderator",
    "admin",
    "lvl4",
    "owner",
    "nobody"
];

//FIXME: re-add user_level with the new permissions system
export default class PermLevelSelector extends Component<PermLevelSelectorProps, {}> {


    componentDidUpdate(previousProps: Readonly<PermLevelSelectorProps>, previousState: Readonly<{}>, snapshot: any): void {
        let {value, setter, all_values, min, min_value} = this.props;
        if (min_value)
            min = Math.max(min, all_values[min_value]);

        const guild = useContext(Guild);
        const max = guild.user_level;

        if (value < min)
            setter(name, min);
        else if (value > max)
            setter(name, max);


    }

    render() {
        let {value, setter, name, changed, disabled, all_values, min, min_value} = this.props;
        const assembed = [];

        if (min_value)
            min = Math.max(min, parseInt(all_values[min_value]));

        const guild = useContext(Guild);
        const max = guild.user_level;


        for (let v in options) {
            const name = options[v];
            assembed.push(<option value={v} selected={v == value} disabled={parseInt(v) < min || parseInt(v) > max}>
                <Text id={`config.parts.${name}`}/></option>)
        }
        return (
            <div class="field">
                <label class="label">
                    <Text id={`config.dash_security.${name.toLowerCase()}`}/>
                    <InfoTooltip name={`dashboard_${name.toLowerCase()}`}/>
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