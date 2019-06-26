import {Component} from "preact";
import {SettingsComponentProps} from "../../utils/Interfaces";
import {useContext} from "preact/hooks";
import {Guild} from "../wrappers/Context";

export default class RolePicker extends Component<SettingsComponentProps, {}> {

    render() {
        const {value, setter, name, info, api_name, changed, disabled} = this.props;
        const guild = useContext(Guild);
        const assembed = [<option value={0} selected={value == "0"}>No role</option>];
       for (let role_id in guild.role_list) {
           const role = guild.role_list[role_id];
           if (role.id != guild.id) {
               assembed.push(<option value={role.id} selected={value == role.id}>{role.name}</option>)
           }
        }

        return (
            <div class="field" style={{clear: "left"} }>
                <label class="label">{name}</label>
                    <div class={changed? "select is-success" : "select"}>
                        <select disabled={disabled} onchange={(event) => setter(api_name, event.target.value)}>
                            {assembed}
                        </select>
                </div>
            </div>

        );
    }
}