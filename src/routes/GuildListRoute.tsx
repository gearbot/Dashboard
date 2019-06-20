import {Component} from "preact";
import withAuthorization from "../components/wrappers/WithAuthorization";
import {get_info} from "../utils/dashAPI";
import Guild from "../components/guilds/Guild";
import {GuildListRouteState} from "../utils/Interfaces";

class GuildListRoute extends Component<{}, GuildListRouteState> {

    constructor(props, state) {
        super(props, state);
        this.setState({guilds: undefined});
        get_info({
            method: "GET",
            endpoint: "guilds"
        }).then(
            guilds =>
            {
                console.log(guilds)
                this.setState({guilds: guilds})
            }
        )
    }

    render() {
        const guilds = this.state.guilds;
        const processed = [];
        if (guilds) {
            Object.keys(guilds).map(key => {
                const guild = guilds[key];
                processed.push(<Guild guild={guild} />)
            })
        }
        return (
            guilds ?
                <div class="cardflex">{processed}</div>:
                <div>Loading...</div>
        );
    }
}

export default withAuthorization(user => user != null)(GuildListRoute);