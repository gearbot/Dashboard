import {Component} from "preact";
import {GuildProps} from "../../utils/Interfaces";
import {Link} from "preact-router";
import ROUTES from "../../utils/routes";
import GuildLogo from "./GuildLogo";

export default class GuildCard extends Component<GuildProps, {}> {

    render() {
        const {id, name, icon} = this.props.guild;
        let link, icon_url;

        const animated = icon && icon.startsWith("a_");
        icon_url = `https://cdn.discordapp.com/icons/${id}/${icon}.${animated ? "gif" : "png"}?size=256`;

        if (this.props.type == "SETTINGS")
            link = `${ROUTES.GUILDS}/${id}/info`;
        else
            link = `${ROUTES.ADD_GEARBOT}&guild_id=${id}`;

        const content = [<header class="card-header">
            <p class="card-header-title">
                {name}

            </p>
        </header>,
            <div class="card-image">
                <figure class="image">
                    <GuildLogo link={icon && icon_url} size="10x"/>
                </figure>
            </div>];
        return (
            this.props.type == "SETTINGS" ?
                <Link href={link} class="card tile is-child mycard">
                    {content}
                </Link>
                :
                <a href={link} class="card tile is-child mycard" target="_blank">
                    {content}
                </a>
        );
    }
}