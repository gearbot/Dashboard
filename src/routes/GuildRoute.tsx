import {Component} from "preact";
import withAuthorization from "../components/wrappers/WithAuthorization";
import {GuildRouteProps, GuildRouteState} from "../utils/Interfaces";
import {get_info} from "../utils/dashAPI";
import {Guild} from "../components/wrappers/Context";
import GuildNav from "../components/guilds/GuildNav";
import Router from "preact-router";
import GuildInfo from "./GuildInfo";
import ROUTES from "../utils/routes";
import HackerMan from "../components/main/HackerMan";
import GuildSettings from "./GuildSettings";
import TODOComponent from "../components/TODOComponent";
import {menu_options} from "../components/guilds/GuildNavOptions";

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
        const {loading, guild, authorized} = this.state;
        return (

            <Guild.Provider value={guild} children={
                <div class="container is-fluid">
                    {
                        loading ?
                            <div>Loading...</div> :
                            authorized ?
                            <div class="container">
                                <h1 class="title serverTitle"><img src={guild.server_icon} class="serverImage"/>{guild.name}<img src={guild.server_icon} class="serverImage"/></h1>
                                <GuildNav tab={this.props.tab}/>
                                <Router>
                                    <GuildInfo path={ROUTES.GUILD_INFO}/>
                                    <TODOComponent path={ROUTES.GUILD_INFRACTIONS}/>
                                    <GuildSettings path={`${ROUTES.GUILD_SETTINGS}/:tab?`}/>
                                </Router>
                            </div> :
                                <HackerMan/>
                    }
                </div>
            }/>

        );
    }
}

export default withAuthorization(user => user != null)(GuildRoute);