import {Component} from "preact";
import {LogChannelSectionState} from "../../utils/Interfaces";
import {useContext} from "preact/hooks";
import {Guild, UserPerms, WS} from "../wrappers/Context";
import {get_info} from "../../utils/dashAPI";
import LogChannel from "./LogChannel";
import {Text} from "preact-i18n";

const INITIAL_STATE = {
    loading: true,
    old_values: null,
    new_values: null,
    saving: false,
};


export default class LogChannels extends Component<{}, LogChannelSectionState> {


    constructor(props, state) {
        super(props, state);
        this.state = {...INITIAL_STATE}
    }

    componentDidMount(): void {
        this.setState({loading: true});
        const guild = useContext(Guild);
        const websocket = useContext(WS);
        websocket.ask_the_bot("get_guild_settings",
            {
                guild_id: guild.id,
                section: "LOG_CHANNELS"
            },
            (data) => {
               this.process_info(data)
            });
        websocket.subscribe({
            channel: "guild_settings",
            subkey: guild.id,
            handler: (data) => {
                console.log(data)
            }
        });
    }

    componentWillUnmount(): void {
        const websocket = useContext(WS);
        websocket.unsubscribe("guild_settings")
    }

    process_info = (info) => {
        const new_info = [];
        for (let i in info) {
            new_info.push({
                channel: i,
                ...info[i]
            });
        }
        this.setState({
            loading: false,
            //why is there no better way to deep clone an object?
            old_values: JSON.parse(JSON.stringify(new_info)),
            new_values: new_info,
            saving: false
        })
    };

    get_to_submit = () => {
        const to_submit = {};
        const {new_values} = this.state;
        for (let i in new_values) {
            const v = new_values[i];
            to_submit[v.channel] = {
                CATEGORIES: v.CATEGORIES,
                DISABLED_KEYS: v.DISABLED_KEYS
            }
        }
        return to_submit;
    };


    can_submit = () => {
        const to_submit = this.get_to_submit();
        let valid = to_submit && !to_submit[0] && JSON.stringify(this.state.old_values) != JSON.stringify(this.state.new_values);
        if (valid) {
            for (let i in to_submit) {
                if (to_submit[i].CATEGORIES.length == 0) {
                    valid = false;
                    break;
                }
            }
        }
        return valid
    };

    on_submit = (event) => {
        event.preventDefault();
        if (!this.can_submit()) {
            // window.location.href = "https://tenor.com/view/close-so-close-joey-friends-nice-try-gif-4828122"
            return;
        }
        this.setState({...this.state, saving: true});

        const guild = useContext(Guild);
        const websocket = useContext(WS);
        websocket.ask_the_bot(
            "replace_guild_settings",
            {
                guild_id: guild.id,
                section: "LOG_CHANNELS",
                modified_values: this.get_to_submit()
            },
            (data) => {
               this.process_info(data)
            });
    };

    reset = (event) => {
        event.preventDefault();
        this.setState({
            new_values: JSON.parse(JSON.stringify(this.state.old_values))
        })
    };




    channel_adder = (e) => {
        e.preventDefault();
        const i = this.state.new_values;
        i.push({
            channel: 0,
            CATEGORIES: [],
            DISABLED_KEYS: []
        });
        this.setState({new_values: i});
    };

    render() {
        const assembled = [];
        const {loading, new_values, saving} = this.state;
        const userperms = useContext(UserPerms)
        const disabled = saving || ((userperms.user_dash_perms & (1 << 3)) == 0);
        const selected = [];
        if (!loading) {

            for (let i in new_values)
                selected.push(new_values[i].channel);
            for (let id in new_values) {
                const values = new_values[id];

                const setter = ( value) => {
                    const current = this.state.new_values;
                    current[id] = value;
                    this.setState({
                        new_values: current,
                    })
                };

                const channel_remover = () => {
                    const i = this.state.new_values;
                    delete i[id];
                    this.setState({new_values: i});
                };


                assembled.push(<LogChannel info={values} infoSetter={setter}
                                           selectedChannels={selected} disabled={disabled}
                                           remover={channel_remover} index={id}/>)
            }

        }

        return (
            loading ?
                <div>Loading...</div> :
                <form onsubmit={this.on_submit}>
                    {assembled}

                    <div class="field">
                        <div class="control">
                            <button class="button is-primary" disabled={disabled || saving || selected.indexOf(0) > -1}
                                    onclick={this.channel_adder} style={{width: "100%"}}>
                                <Text id={"config.parts.add_channel"}/>
                            </button>
                        </div>
                    </div>

                    <div class="field is-grouped" style={{marginTop: "1em"}}>
                        <div class="control">
                            <button class="button is-link" disabled={!this.can_submit() || saving}>
                                <Text id="config.parts.save"/>
                            </button>
                        </div>
                        <div class="control">
                            <button class="button is-link" disabled={JSON.stringify(this.state.old_values) == JSON.stringify(this.state.new_values) || saving}
                                    onclick={this.reset}>Reset
                            </button>
                        </div>
                    </div>
                </form>
        );
    }
}