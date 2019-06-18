import {Component} from "preact";
import {GuildProps} from "../../utils/Interfaces";
import {Link} from "preact-router/match";
import ROUTES from "../../utils/routes";

export default class Guild extends Component<GuildProps, {}> {

    constructor(props, state) {
        super(props, state);
    }

    render() {
        const {id, name, permissions, icon} = this.props.guild;
        return (
            <Link href={`${ROUTES.GUILDS}/${id}`}>{name}</Link>
        );
    }
}