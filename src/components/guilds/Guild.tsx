import {Component} from "preact";
import {GuildProps} from "../../utils/Interfaces";
import {Link} from "preact-router/match";
import ROUTES from "../../utils/routes";

export default class Guild extends Component<GuildProps, {}> {

    constructor(props, state) {
        super(props, state);
    }

    render() {
        const {id, name, icon} = this.props.guild;
        return (
            <Link href={`${ROUTES.GUILDS}/${id}`} class="card tile is-child mycard">
                <header class="card-header">
                    <p class="card-header-title">
                        {name}
                    </p>
                </header>
                <div class="card-image">
                    <figure class="image">
                        <img src={icon} alt="Guild icon"/>
                    </figure>
                </div>
            </Link>
        );
    }
}