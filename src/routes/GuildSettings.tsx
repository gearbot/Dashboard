import {Component} from "preact";
import Router, {route} from "preact-router";
import ROUTES from "../utils/routes";
import GuildSettingsNav from "../components/guilds/GuildSettingsNav";
import {NavProps} from "../utils/Interfaces";
import GuildSettingsGeneral from "./GuildSettingsGeneral";
import {useContext} from "preact/hooks";
import {Guild} from "../components/wrappers/Context";

export default class GuildSettings extends Component<NavProps, {}> {

    constructor(props, state) {
        super(props, state);
    }

    render() {
        const guild = useContext(Guild);
        if (guild != null && (!this.props.tab || this.props.tab == "")){
            route(`${ROUTES.GUILDS}/${guild.id}/settings/general`)
        }
        return (
            <div class="flexcontainer">
                <div class="flexitem">
                    <GuildSettingsNav tab={this.props.tab}/>
                </div>
                <div class="flexitem2">
                    <Router>
                        <GuildSettingsGeneral path={ROUTES.GUILD_SETTINGS_GENERAL}/>
                    </Router>
                </div>
            </div>
        );
    }
}