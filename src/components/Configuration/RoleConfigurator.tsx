import {Component} from "preact";
import {RoleListProps} from "../../utils/Interfaces";
import {useContext} from "preact/hooks";
import {Guild} from "../wrappers/Context";
import RoleComponent from "./RoleComponent";
import RolePicker from "./RolePicker";

export default class RoleConfigurator extends Component<RoleListProps, {}> {


    render() {
        const {value, setter, name, info, api_name, changed, disabled, type} = this.props;
        const guild = useContext(Guild);
        const assembled = [];
        const already_picked = [...value];
        const local = [...value];
        const to_pick = [];
        const remover = (role_id) => {
            if (disabled) return;
            const index = value.indexOf(role_id);
            if (index > -1) {
                local.splice(index, 1);
                setter(api_name, local)
            }
        };
        for (let role_id in guild.role_list) {
            const role = guild.role_list[role_id];
            if (role[`is_${type}`]) {
                already_picked.push(role.id);
                assembled.push(<RoleComponent role={role}/>)
            }
        }
        value.forEach((role) => {
            assembled.push(<RoleComponent role={guild.role_list[role]} remover={remover}/>)
        });


        for (let role_id in guild.role_list) {
            const role = guild.role_list[role_id];
            if (already_picked.indexOf(role_id) === -1 && role_id != guild.id)
                to_pick.push(role)
        }

        const receiver = (rid) => {
            local.push(rid);
            setter(api_name, local);
            this.setState({selected: 0})
        };


        return (
            <div style={{float: "left"}}>
                <h2 class="subtitle">{name}</h2>
                <p>{info}</p>
                {assembled}
                <RolePicker roles={to_pick} button_text={"Add"} receiver={receiver} disabled={disabled}/>
            </div>
        );
    }
}