import {Component} from "preact";
import withAuthorization from "../components/wrappers/WithAuthorization";
import {get_info} from "../utils/dashAPI";
import GuildCard from "../components/guilds/GuildCard";
import {BasicGuildInfo, GuildListRouteState} from "../utils/Interfaces";
import {useContext} from "preact/hooks";
import {AuthUser, WS} from "../components/wrappers/Context";
import Loading from "../components/main/Loading";
import {Text} from "preact-i18n"
import Carousel from "../components/main/Carousel";

const INITIAL_STATE = {
    guilds: undefined,
    all_guilds: undefined
};

class GuildListRoute extends Component<{}, GuildListRouteState> {


    constructor(props, state) {
        super(props, state);
        this.state = {...INITIAL_STATE};
    }

    componentDidMount(): void {
        const websocket = useContext(WS);
        websocket.subscribe({
            channel: "guilds",
            subkey: useContext(AuthUser).id,
            handler: (data) => {
                switch (data.type) {
                    case "add":
                        this.receiveGuilds(data.guilds);
                        break;
                    case "remove":
                        const g: any = this.state.guilds;
                        delete g[data.guild];
                        this.setState({guilds: g});
                        break;

                }
            }
        });
        websocket.ask_the_api("get_user_guilds_gearbot", null, (data) => {
            this.setState({
                guilds: data,
            })
        })
        websocket.ask_the_api("get_user_guilds_all", null, (data) => {
            this.setState({
                all_guilds: data,
            })
        })
    }

    receiveGuilds = (guilds) => {
        if (!this.state.guilds) {
            this.setState({guilds: guilds});
        } else {
            const g: any = this.state.guilds;
            Object.keys(guilds).forEach(key => g[key] = guilds[key]);
            this.setState({guilds: g});
        }
    };


    componentWillUnmount(): void {
        useContext(WS).unsubscribe("guilds")
    }

    render() {
        const {guilds, all_guilds} = this.state;
        const with_gearbot = [];
        const without_gearbot = [];
        if (guilds) {
            Object.keys(guilds).forEach(key => {
                const guild = guilds[key];
                with_gearbot.push(<GuildCard guild={guild} type="SETTINGS"/>)
            });


            if (all_guilds) {
                Object.keys(all_guilds).forEach(key => {
                    const guild = all_guilds[key];
                    if (!guilds[key])
                        without_gearbot.push(<GuildCard guild={guild} type={"ADD"}/>)
                });
            }
        }
        return (
            guilds ?
                <div>
                    <h1><Text id="guilds.title"/></h1>
                    <p><Text id="guilds.info"/></p>

                    {with_gearbot.length > 0 ?
                        <Carousel items={with_gearbot} title={<h2><Text id="guilds.with_gearbot"/></h2>}/> :
                        <div class="card centered">
                            <p><Text id="guilds.no_with_gearbot"/></p>
                            <img src="../assets/gearWhat.png"/>
                        </div>
                    }


                    {without_gearbot.length > 0 ?
                        <Carousel items={without_gearbot} title={
                            <>
                                <h2><Text id="navbar.add_bot"/></h2>
                                <p><Text id="guilds.refresh_update"/></p>
                            </>
                        }/>
                        :
                        <div class="card centered">
                            <p><Text id="guilds.no_without_gearbot"/></p>
                            <img src="../assets/gearWhat.png"/>
                        </div>
                    }
                </div> :
                <Loading/>
        );
    }
}

export default withAuthorization(user => user != null)(GuildListRoute);