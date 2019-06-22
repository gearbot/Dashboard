import {Component} from "preact";
import Router from "preact-router";
import ROUTES from "../utils/routes";
import GuildSettingsNav from "../components/guilds/GuildSettingsNav";
import {NavProps} from "../utils/Interfaces";
import GuildSettingsGeneral from "./GuildSettingsGeneral";

export default class GuildSettings extends Component<NavProps, {}> {

    constructor(props, state) {
        super(props, state);
    }

    render() {
        return (
            <div class="level">
                <GuildSettingsNav tab={this.props.tab}/>
                <Router>
                    <GuildSettingsGeneral path={ROUTES.GUILD_SETTINGS_GENERAL}/>
                </Router>
            </div>
        );
    }
}