import {Component} from "preact";
import {NavProps} from "../../utils/Interfaces";
import ROUTES from "../../utils/routes";
import {useContext} from "preact/hooks";
import {Guild, UserPerms} from "../wrappers/Context";
import {Link} from "preact-router";
import GuildLogo from "./GuildLogo";

const MENU_OPTIONS = {
    Info: {route: "info", perms: 1 << 0},
    Infractions: {route: "infractions", perms: 1 << 1},
    Settings: {route: "settings/general", perms: 1 << 2},
};

export default class GuildNav extends Component<NavProps, {}> {

    constructor(props, state) {
        super(props, state);
    }

    render() {
        const guild = useContext(Guild);
        const user_perms = useContext(UserPerms);
        const links = [];
        for (let name in MENU_OPTIONS) {
            const {route, perms} = MENU_OPTIONS[name];
            if ((user_perms.user_dash_perms & perms) > 0)
                links.push(
                    <Link href={`${ROUTES.GUILDS}/${guild.id}/${route}`}
                          class={`button ${this.props.tab == route.split("/")[0] ? "yellow" : "black"}Button`}>{name}</Link>
                )
        }
        return (
            <div class="guild-nav">
                <div class="guild-nav-inner">
                    <div class="guild-info">
                        <GuildLogo size={1.75}/>
                        <p class="guild-name">{guild.name}</p>
                    </div>
                    <div class="links">
                        {links}
                    </div>
                </div>
            </div>
        );
    }
}