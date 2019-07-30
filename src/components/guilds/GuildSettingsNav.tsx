import {Component} from "preact";
import {NavProps} from "../../utils/Interfaces";
import {Link} from "preact-router";
import ROUTES from "../../utils/routes";
import {useContext} from "preact/hooks";
import {Guild} from "../wrappers/Context";
import {Text} from 'preact-i18n';

export default class GuildSettingsNav extends Component<NavProps, {}> {

    constructor(props, state) {
        super(props, state);
    }

    render() {
        const guild_id = useContext(Guild).id;
        const links = [];
        for (let i in this.props.tabs) {
            const tab_name = this.props.tabs[i];
            links.push(
                <li>
                    <Link href={`${ROUTES.GUILDS}/${guild_id}/settings/${tab_name}`}
                          class={this.props.tab == tab_name ? "is-active" : ""}>
                        <Text id={`config.tabs.${tab_name}`}/>
                    </Link>
                </li>)

        }

        return (
            <aside class="menu">
                <p class="menu-label">
                    <Text id="config.parts.settings"/>
                </p>
                <ul class="menu-list">
                    {links}
                </ul>
            </aside>
        );
    }
}