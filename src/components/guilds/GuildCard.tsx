import {Component} from "preact";
import {GuildProps} from "../../utils/Interfaces";
import {Link} from "preact-router";
import ROUTES from "../../utils/routes";
import GuildLogo from "./GuildLogo";
import "../../style/main/cards.scss"
import "../../style/other/hover.scss"

export default class GuildCard extends Component<GuildProps, {}> {

    render() {
        const {id, name} = this.props.guild;
        let link;


        if (this.props.type == "SETTINGS")
            link = `${ROUTES.GUILDS}/${id}/info`;
        else
            link = `${ROUTES.ADD_GEARBOT}&guild_id=${id}`;

        const content = <>
                <GuildLogo guild_info={this.props.guild} size={7}/>
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