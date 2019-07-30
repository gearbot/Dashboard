import {Component} from "preact";
import {RoleListProps} from "../../utils/Interfaces";
import {useContext} from "preact/hooks";
import {Guild} from "../wrappers/Context";
import RoleComponent from "./RoleComponent";
import RolePicker from "./RolePicker";
import {Text} from 'preact-i18n';
import InfoTooltip from "./InfoTooltip";

export default class RoleConfigurator extends Component<RoleListProps, {}> {


    render() {
        const {value, setter, name, disabled, type, extra_check} = this.props;
        const guild = useContext(Guild);
        const assembled = [];
        const already_picked = value ? [...value] : [];
        const local = value ? [...value] : [];
        const to_pick = [];
        const remover = (role_id) => {
            if (disabled) return;
            const index = value.indexOf(role_id);
            if (index > -1) {
                local.splice(index, 1);
                setter(name, local)
            }
        };
        for (let role_id in guild.role_list) {
            const role = guild.role_list[role_id];
            if (role[`is_${type}`]) {
                already_picked.push(role.id);
                assembled.push(<RoleComponent role={role}/>)
            }
        }
        value && value.forEach((role) => {
            assembled.push(<RoleComponent role={guild.role_list[role]} remover={remover}/>)
        });


        for (let role_id in guild.role_list) {
            const role = guild.role_list[role_id];
            if (already_picked.indexOf(role_id) === -1 && role_id != guild.id)
                to_pick.push(role)
        }

        const receiver = (rid) => {
            local.push(rid);
            setter(name, local);
            this.setState({selected: 0})
        };


        return (
            <div>
                <h4 class="mytitle"><Text id={`config.permissions.${name.toLowerCase()}`}/><InfoTooltip name={name.toLowerCase()}/></h4>

                {assembled}
                <RolePicker roles={to_pick} button_text={<Text id="config.parts.add"/>} receiver={receiver} disabled={disabled} extra_check={extra_check}/>
            </div>
        );
    }
}