import {Component} from "preact";
import {DetailedGuildInfo, NavProps} from "../../utils/Interfaces";
import ROUTES from "../../utils/routes";
import {useContext} from "preact/hooks";
import {Guild} from "../wrappers/Context";
import {Link} from "preact-router";

const menu_options = {
    Info: {route: "info", perms: 1 << 0},
    Infractions: {route: "infractions", perms: 1 << 1},
    Settings: {route: "settings", perms: 1 << 2},
};

export default class GuildNav extends Component<NavProps, {}> {

    constructor(props, state) {
        super(props, state);
    }

    render() {
        const guild: DetailedGuildInfo = useContext(Guild);

        const test = <Guild />
        test.prop

        const links = [];
        for (let name in menu_options) {
            const {route, perms} = menu_options[name];
            if ((guild.user_perms & perms) > 0)
                links.push(
                    <li class={this.props.tab == route ? "is-active" : ""}>
                        <Link href={`${ROUTES.GUILDS}/${guild.id}/${route}`}>{name}</Link>
                    </li>
                )
        }

        ;

        return (
            <div class="level has-text-centered">
                <div class="tabs is-toggle is-toggle-rounded is-centered">
                    {links}
                </div>
            </div>
        );
    }
}