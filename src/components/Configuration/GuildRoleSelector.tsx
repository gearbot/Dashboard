import {Component} from "preact";
import {GuildRoleSelectorProps} from "../../utils/Interfaces";
import {useContext} from "preact/hooks";
import {Guild} from "../wrappers/Context";
import {Text} from 'preact-i18n';

export default class GuildRoleSelector extends Component<GuildRoleSelectorProps, {}> {

    render() {
        const {value, setter, name, changed, disabled, extra_check} = this.props;
        const guild = useContext(Guild);
        const assembed = [<option value={0} selected={value == "0"}>No role</option>];
       for (let role_id in guild.role_list) {
           const role = guild.role_list[role_id];
           if (role.id != guild.id) {
               const role_disabled = extra_check  && !role[extra_check];
               assembed.push(<option value={role.id} selected={value == role.id} disabled={role_disabled}>{role.name}</option>)
           }
        }

        return (
            <div class="field" style={{clear: "left"} }>
                <label class="label"><Text id={`config.roles.${name.toLowerCase()}`}/></label>
                    <div class={changed? "select is-success" : "select"}>
                        <select disabled={disabled} onChange={(event) => setter(name, event.target.value)}>
                            {assembed}
                        </select>
                </div>
            </div>

        );
    }
}