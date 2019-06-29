import {Component} from "preact";
import {RolePickerComponents, RolePickerState} from "../../utils/Interfaces";

export default class RolePicker extends Component<RolePickerComponents, RolePickerState> {

    render() {
        const {roles, selected, button_text, receiver, disabled, extra_check} = this.props;
        const assembed = [<option value={"0"} selected={!this.state.selected}>Select a role </option>];
        roles.forEach((role) => {
            const role_disabled = extra_check  && !role[extra_check];
            assembed.push(<option value={role.id} selected={selected == role.id} disabled={role_disabled}>{role.name}</option>)
        });

        const clicker = (event) => {
            event.preventDefault();
            receiver(this.state.selected);
            this.setState({selected: null})
        };
        return (
            <div class="field has-addons" style={{clear: "left"}}>
                <label class="label">{name}</label>
                <div class="control is-expanded">
                    <div class="select is-fullwidth">
                        <select disabled={disabled} onchange={(event) => this.setState({selected: event.target.value})}>
                            {assembed}
                        </select>
                    </div>
                </div>
                <div class="control">
                    <button class="button is-primary"
                            onclick={clicker} disabled={!this.state.selected || this.state.selected=="0"}>{button_text}</button>
                </div>
            </div>

        );
    }
}