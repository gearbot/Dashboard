import {Component} from "preact";
import {NavProps} from "../../utils/Interfaces";
import {Link} from "preact-router";
import ROUTES from "../../utils/routes";
import {useContext} from "preact/hooks";
import {Guild} from "../wrappers/Context";

const menu_options = {
    General: "general",
    Roles: "roles",
    "Log channels": "log_channels",
    "Message logs": "message_logs",
    Censoring: "censoring",
    Infractions: "infractions",
    "Permission overrides": "perm_overrides",
    "Raid settings": "raid_handling",
    "Anti spam": "anti_spam"
};

export default class GuildSettingsNav extends Component<NavProps, {}> {

    constructor(props, state) {
        super(props, state);
    }

    render() {
        const guild_id = useContext(Guild).id;
        const links = [];
        for (let name in menu_options) {
            const tab_name = menu_options[name];
            links.push(<li><Link href={`${ROUTES.GUILDS}/${guild_id}/settings/${tab_name}`} class={this.props.tab == tab_name ? "is-active" : ""}>{name}</Link></li>)

        }

        return (
            <aside class="menu">
                <p class="menu-label">Settings</p>
                <ul class="menu-list">
                    {links}
                </ul>
            </aside>
        );
    }
}