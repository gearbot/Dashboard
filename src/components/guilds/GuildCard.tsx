import {Component} from "preact";
import {GuildProps} from "../../utils/Interfaces";
import {Link} from "preact-router/match";
import ROUTES from "../../utils/routes";
import GuildLogo from "./GuildLogo";

export default class GuildCard extends Component<GuildProps, {}> {

    render() {
        const {id, name, icon} = this.props.guild;
        return (
            <Link href={`${ROUTES.GUILDS}/${id}/info`} class="card tile is-child mycard">
                <header class="card-header">
                    <p class="card-header-title">
                        {name}

                    </p>
                </header>
                <div class="card-image">
                    <figure class="image">
                        <GuildLogo link={icon} size="10x"/>
                    </figure>
                </div>
            </Link>
        );
    }
}