import {Component} from "preact";
import withAuthorization from "../components/wrappers/WithAuthorization";
import {GuildRouteProps, GuildRouteState} from "../utils/Interfaces";
import {get_info} from "../utils/dashAPI";
import {Guild} from "../components/wrappers/Context";
import GuildNav from "../components/guilds/GuildNav";
import Router from "preact-router";
import GuildInfo from "../components/guilds/GuildInfo";
import ROUTES from "../utils/routes";

const INITIAL_STATE = {
    guild: null,
    loading: true,
    authorized: true,
};


class GuildRoute extends Component<GuildRouteProps, GuildRouteState> {

    constructor(props, state) {
        super(props, state);
        this.state = {...INITIAL_STATE};
        get_info({
            method: "GET",
            endpoint: `guilds/${this.props.gid}/info`
        }).then(info => {
            this.setState({
                loading: false,
                guild: info
            })
        }).catch(
            () => this.setState({
                loading: false,
                authorized: false
            })
        )
    }

    render() {
        return (
            <Guild.Provider value={this.state.guild} children={
                <div class="container is-fluid">
                    {
                        this.state.loading ?
                            <div>Loading...</div> :
                            <div class="container">
                                <h1 class="title">{this.state.guild.name}</h1>
                                <GuildNav tab={this.props.tab}/>
                                <Router>
                                    <GuildInfo path={ROUTES.GUILD_INFO}/>
                                </Router>
                            </div>
                    }
                </div>
            }/>

        );
    }
}

export default withAuthorization(user => user != null)(GuildRoute);