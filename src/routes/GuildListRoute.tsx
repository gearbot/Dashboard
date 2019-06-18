import {Component} from "preact";
import withAuthorization from "../components/wrappers/WithAuthorization";
import {get_info} from "../utils/dashAPI";
import {useContext} from "preact/hooks";
import {GuildListSetter, GuildList} from "../components/wrappers/Context";
import Guild from "../components/guilds/Guild";

class GuildListRoute extends Component<{}, {}> {

    constructor(props, state) {
        super(props, state);
        get_info({
            method: "GET",
            endpoint: "guilds"
        }).then(
            guilds =>
            {
                console.log(guilds)
                useContext(GuildListSetter)(guilds)
            }
        )
    }

    render() {
        const guilds = useContext(GuildList);
        const processed = [];
        if (guilds) {
            Object.keys(guilds).map(key => {
                const guild = guilds[key];
                processed.push(<Guild guild={guild} />)
            })
        }
        return (
            guilds ?
               processed:
                <div>Loading...</div>
        );
    }
}

export default withAuthorization(user => user != null)(GuildListRoute);