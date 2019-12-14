import {Component} from "preact";
import {useContext} from "preact/hooks";
import {WS} from "../components/wrappers/Context";
import {StatsRouteState} from "../utils/Interfaces";
import {Text} from 'preact-i18n';
import Loading from "../components/main/Loading";
import {format, formats} from "../utils/Utils";
import TimeDisplay from "../components/main/TimeDisplay";

const INITIAL_STATE = {
    loading: true,
    stats: null,
    interval: null,
    uptime: 0
};

export default class StatsRoute extends Component<{}, StatsRouteState> {

    constructor(props, state) {
        super(props, state);
        this.state = {...INITIAL_STATE};
    }


    componentDidMount(): void {
        const websocket = useContext(WS);
        this.setState({});
        const interval = setInterval(() => this.updateUptime(), 1000);
        this.setState({interval: interval});
        websocket.subscribe({
            channel: "stats",
            handler: (stats) => {
                this.setState({
                    loading: false,
                    stats: stats,
                    uptime: new Date().getTime() - new Date(`${stats.start_time} UTC`).getTime()
                })
                ;
                this.updateUptime();
            }
        })
    }


    componentWillUnmount(): void {
        const websocket = useContext(WS);
        websocket.unsubscribe("stats");
        clearInterval(this.state.interval)
    }

    updateUptime() {
        if (this.state.loading)
            return
        this.setState({uptime: new Date().getTime() - new Date(`${this.state.stats.start_time} UTC`).getTime()});
    }

    render() {
        const {loading, stats, uptime} = this.state;
        console.log(this.state)
        if (loading)
            return <Loading/>;


        return (
            <>
                <h1><Text id="stats.title"/></h1>
                <Text id="stats.info"/>

                <div class="statsContainer">
                    <div class="row">
                        <h2><Text id={"stats.basics"}/></h2>

                        <div class="card">
                            <div class="statHeader"><Text id={"stats.uptime"}/></div>
                            <div class="stat">
                                <TimeDisplay time={uptime}/>
                            </div>
                        </div>

                        <div class="card">
                            <div class="statHeader"><Text id={"stats.total_members"}/></div>
                            <div class="stat">
                                {formats(stats.total_members)}
                            </div>
                        </div>

                        <div class="card">
                            <div class="statHeader"><Text id={"stats.total_members"}/></div>
                            <div class="stat">
                                {formats(stats.unique_members)}
                            </div>
                        </div>

                    </div>
                    <div class="row">
                        <h2><Text id={"stats.messages"}/></h2>
                        <div class="card">
                            <div class="statHeader"><Text id={"stats.user_mesages"}/></div>
                            <div class="stat">
                                {formats(stats.user_mesages)}
                            </div>
                        </div>

                        <div class="card">
                            <div class="statHeader"><Text id={"stats.bot_messages"}/></div>
                            <div class="stat">
                                {formats(stats.bot_messages)}
                            </div>
                        </div>

                        <div class="card">
                            <div class="statHeader"><Text id={"stats.own_messages"}/></div>
                            <div class="stat">
                                {formats(stats.own_messages)}
                            </div>
                        </div>

                    </div>
                    <div class="row">
                        <h2><Text id={"stats.other"}/></h2>

                        <div class="card">
                            <div class="statHeader"><Text id={"stats.taco_count"}/></div>
                            <div class="stat">
                                {formats(stats.taco_count)}
                            </div>
                        </div>

                        <div class="card">
                            <div class="statHeader"><Text id={"stats.guilds"}/></div>
                            <div class="stat">
                                {format(stats.guilds)}
                            </div>
                        </div>

                        <div class="card">
                            <div class="statHeader"><Text id={"stats.commands_executed"}/></div>
                            <div class="stat">
                                {formats(stats.commands_executed)}
                            </div>
                        </div>

                        <div class="card">
                            <div class="statHeader"><Text id={"stats.custom_commands_executed"}/></div>
                            <div class="stat">
                                {formats(stats.custom_commands_executed)}
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );

        return (
            <div>
                <div class="level">
                    <div class="level-item has-text-centered box-item">
                        <div>
                            <p class="heading"><Text id={"stats.uptime"}/></p>
                            <p class="title">
                                <TimeDisplay time={uptime}/>
                            </p>
                        </div>
                    </div>

                </div>

                <div class="level">
                    <div class="level-item has-text-centered box-item">
                        <div>
                            <p class="heading"><Text id={"stats.total_members"}/></p>
                            <p class="title">
                                {BigInt(stats.total_members).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div class="level-item has-text-centered box-item">
                        <div>
                            <p class="heading"><Text id={"stats.unique_members"}/></p>
                            <p class="title">
                                {BigInt(stats.unique_members).toLocaleString()}
                            </p>
                        </div>
                    </div>

                </div>


                <div class="level">
                    <div class="level-item has-text-centered box-item">
                        <div>
                            <p class="heading"><Text id={"stats.user_mesages"}/></p>
                            <p class="title">
                                {BigInt(stats.user_mesages).toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered box-item">
                        <div>
                            <p class="heading"><Text id={"stats.bot_messages"}/></p>
                            <p class="title">
                                {BigInt(stats.bot_messages).toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered box-item">
                        <div>
                            <p class="heading"><Text id={"stats.own_messages"}/></p>
                            <p class="title">
                                {BigInt(stats.own_messages).toLocaleString()}
                            </p>
                        </div>
                    </div>

                </div>


                <div class="level">
                    <div class="level-item has-text-centered box-item">
                        <div>
                            <p class="heading"><Text id={"stats.taco_count"}/></p>
                            <p class="title">
                                {BigInt(stats.taco_count).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div class="level-item has-text-centered box-item">
                        <div>
                            <p class="heading"><Text id={"stats.guilds"}/></p>
                            <p class="title">
                                {stats.guilds.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div class="level-item has-text-centered box-item">
                        <div>
                            <p class="heading"><Text id={"stats.commands_executed"}/></p>
                            <p class="title">
                                {BigInt(stats.commands_executed).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div class="level-item has-text-centered box-item">
                        <div>
                            <p class="heading"><Text id={"stats.custom_commands_executed"}/></p>
                            <p class="title">
                                {BigInt(stats.custom_commands_executed).toLocaleString()}
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}