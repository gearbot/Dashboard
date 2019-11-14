import {Component} from "preact";
import {MuteComponentState, SettingsComponentProps} from "../../utils/Interfaces";
import {useContext} from "preact/hooks";
import {Guild} from "../wrappers/Context";
import GuildRoleSelector from "./GuildRoleSelector";
import {get_info} from "../../utils/dashAPI";
import {Text} from 'preact-i18n';

export default class MuteComponent extends Component<SettingsComponentProps, MuteComponentState> {

    render() {
        const {value, setter, name, changed, disabled, all_values} = this.props;
        const {setup, cleaned} = this.state;
        const guild = useContext(Guild);

        const setupf = (event) => {
            event.preventDefault();
            this.setState({setup: true});
            get_info({
                method: "POST",
                endpoint: `guilds/${guild.id}/mute`,
                body: {
                    action: "setup",
                    role_id: value
                }
            })
        };

        const cleanup = (event) => {
            event.preventDefault();
            this.setState({cleaned: true});
            get_info({
                method: "POST",
                endpoint: `guilds/${guild.id}/mute`,
                body: {
                    action: "cleanup",
                    role_id: value
                }
            })
        };

        return (
            <div>
                <GuildRoleSelector value={value} setter={setter} name={name} changed={changed}
                                   disabled={disabled} all_values={all_values} extra_check="can_be_self_role"/>

                <div class="field is-grouped">
                    <p class="control">
                        <button class="button" disabled={disabled || this.state.setup} onClick={setupf}>
                            {this.state.setup ? <Text id="config.mute.setup_triggered"/> : <Text id="config.mute.setup"/>}
                        </button>
                    </p>
                    <p class="control">
                        <button class="button" disabled={disabled || this.state.cleaned} onClick={cleanup}>
                            {this.state.cleaned ?  <Text id="config.mute.cleanup_triggered"/> : <Text id="config.mute.cleanup"/>}
                        </button>
                    </p>
                </div>
            </div>

        );
    }
}