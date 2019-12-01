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

        const content = <>
                <GuildLogo link={icon && icon_url} name={name} size={7}/>
                    <p class="guild-name">
                        {name}
                    </p>
            </>
        ;
        return (
            this.props.type == "SETTINGS" ?
                <Link href={link} class="card hoverable">
                    {content}
                </Link>
                :
                <a href={link} class="card hoverable" target="_blank">
                    {content}
                </a>
        );
    }
}