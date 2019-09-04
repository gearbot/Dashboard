import {Component} from "preact";
import {useContext} from "preact/hooks";
import {WS} from "../components/wrappers/Context";
import {StatsRouteState} from "../utils/Interfaces";
import {Text} from 'preact-i18n';
import Loading from "../components/main/Loading";

const INITIAL_STATE = {
    loading: true,
    stats: null,
    uptime_parts: [],
    interval: null
};

export default class StatsRoute extends Component<{}, StatsRouteState> {

    constructor(props, state) {
        super(props, state);
        this.state = {...INITIAL_STATE};
    }


    componentDidMount(): void {
        const websocket = useContext(WS);
        const interval = setInterval(() => this.updateUptime(), 1000);
        this.setState({interval: interval});
        websocket.subscribe({
            channel: "stats",
            handler: (stats) => {
                this.setState({loading: false, stats: stats});
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
        const {loading, stats} = this.state;
        let total = loading ? 0 : Math.floor((new Date().getTime() - new Date(`${stats.start_time} UTC`).getTime()) / 1000);
        const days = Math.floor(total / (60 * 60 * 24));
        total = total % (60 * 60 * 24);
        const hours = Math.floor(total / (60 * 60));
        total = total % (60 * 60);
        const minutes = Math.floor(total / 60);
        const seconds = total % 60;


        const parts = [];
        if (days)
            parts.push(<div class="uptime"><Text id="misc.days" plural={days} fields={{count: days}}/></div>);
        if (hours)
            parts.push(<div class="uptime"><Text id="misc.hours" plural={hours} fields={{count: hours}}/></div>);
        if (minutes)
            parts.push(<div class="uptime"><Text id="misc.minutes" plural={minutes} fields={{count: minutes}}/></div>);
        if (seconds)
            parts.push(<div class="uptime"><Text id="misc.seconds" plural={seconds} fields={{count: seconds}}/></div>);
        this.setState({uptime_parts: parts});
    }

    render() {
        const {loading, stats, uptime_parts} = this.state;
        if (loading)
            return <Loading/>;


        return (
            <div>
                <div class="level">
                    <div class="level-item has-text-centered box-item">
                        <div>
                            <p class="heading"><Text id={"stats.uptime"}/></p>
                            <p class="title">

                                {uptime_parts}
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