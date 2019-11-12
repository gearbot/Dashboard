import {Component} from "preact";
import withAuthorization from "../components/wrappers/WithAuthorization";
import {GuildRouteProps, GuildRouteState} from "../utils/Interfaces";
import {Guild, WS, UserPerms} from "../components/wrappers/Context";
import GuildNav from "../components/guilds/GuildNav";
import Router from "preact-router";
import GuildInfo from "./GuildInfo";
import ROUTES from "../utils/routes";
import GuildSettings from "./GuildSettings";
import TODOComponent from "../components/TODOComponent";
import GuildLogo from "../components/guilds/GuildLogo";
import Loading from "../components/main/Loading";
import {useContext} from "preact/hooks";
import Infractions from "./Infractions";

const INITIAL_STATE = {
    loading: true,
    guild_info: null,
    user_perms: null
};


class GuildRoute extends Component<GuildRouteProps, GuildRouteState> {

        constructor(props, state) {
            super(props, state);
            this.state = {...INITIAL_STATE};
            const websocket = useContext(WS);
            websocket.subscribe({
                channel: "guild_info",
                subkey: this.props.gid,
                handler: (data) => {
                    this.setState({
                        ...data
                    })
                }
            });

            websocket.ask_the_bot("get_guild_info", {guild_id: this.props.gid}, (data) => this.setState({loading: false, ...data}))
        }

    componentWillUnmount(): void {
        const websocket = useContext(WS);
        websocket.unsubscribe("guild_info")
    }

    render() {
        const {loading, guild_info, user_perms} = this.state;
        let animated, icon_url;
        if (!loading) {
            animated = guild_info.icon && guild_info.icon.startsWith("a_");
            icon_url = `https://cdn.discordapp.com/icons/${guild_info.id}/${guild_info.icon}.${animated ? "gif" : "png"}?size=256`;
        }
        return (
            <Guild.Provider value={guild_info} children={
                <UserPerms.Provider value={user_perms} children={
                    <div>
                        {
                            loading?
                                <Loading/> :
                                user_perms.user_dash_perms > 0 ?
                                    <div class="container">
                                        <h1 class="title serverTitle"><span class="serverImage"> <GuildLogo
                                            link={icon_url} size="2x"/></span> {guild_info.name}</h1>
                                        <GuildNav tab={this.props.tab}/>
                                        <Router>
                                            <GuildInfo path={ROUTES.GUILD_INFO}/>
                                            <Infractions path={ROUTES.GUILD_INFRACTIONS}/>
                                            <GuildSettings path={`${ROUTES.GUILD_SETTINGS}/:tab?`}/>
                                        </Router>
                                    </div> :
                                    <TODOComponent/>
                        }
                    </div>
                }/>
            }/>

        );
    }
}

export default withAuthorization(user => user != null)(GuildRoute);