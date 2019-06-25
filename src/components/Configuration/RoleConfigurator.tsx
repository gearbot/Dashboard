import {Component} from "preact";
import {RoleListProps} from "../../utils/Interfaces";
import {useContext} from "preact/hooks";
import {Guild} from "../wrappers/Context";
import RoleComponent from "./RoleComponent";

export default class RoleConfigurator extends Component<RoleListProps, {}> {


    render() {
        const {value, setter, name, info, api_name, changed, disabled, type} = this.props;
        const guild = useContext(Guild);
        const assembled = [];
        const already_picked = value ? [...value]: [];
        const local = value ? [...value]: [];
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
        if (value)
            value.forEach((role) => {
                assembled.push(<RoleComponent role={guild.role_list[role]} remover={remover}/>)
            });


        return (
            <div style={{float: "left"}}>
                <h2 class="subtitle">{name}</h2>
                <p>{info}</p>
                {assembled}
            </div>
        );
    }
}