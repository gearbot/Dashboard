import {Component} from "preact";
import {PermLevelSelectorProps} from "../../utils/Interfaces";
import {useContext} from "preact/hooks";
import {Guild} from "../wrappers/Context";

const options = [
    "Public",
    "Trusted",
    "Moderator",
    "Admin",
    "Level 4",
    "Server owner",
    "Nobody"
]

export default class PermLevelSelector extends Component<PermLevelSelectorProps, {}> {


    componentDidUpdate(previousProps: Readonly<PermLevelSelectorProps>, previousState: Readonly<{}>, snapshot: any): void {
        let {value, setter, api_name, all_values, min, min_value} = this.props;
        if (min_value)
            min = Math.max(min, all_values[min_value]);

        const guild = useContext(Guild);
        const max = guild.user_level;

        if (value < min)
            setter(api_name, min);
        else if (value > max)
            setter(api_name, max);


    }

    render() {
        let {value, setter, name, info, api_name, changed, disabled, all_values, min, min_value} = this.props;
        const assembed = [];

        if (min_value)
            min = Math.max(min, parseInt(all_values[min_value]));

        const guild = useContext(Guild);
        const max = guild.user_level;


        for (let v in options) {
            const name = options[v];
            assembed.push(<option value={v} selected={v == value} disabled={parseInt(v) < min || parseInt(v) > max}>{name}</option>)
        }
        return (
            <div class="field">
                <label class="label">{name}</label>
                <div class={changed ? "select is-success" : "select"}>
                    <select onchange={(event) => setter(api_name, event.target.value)} title={info} disabled={disabled}>
                        {assembed}
                    </select>
                </div>
            </div>

        );
    }
}