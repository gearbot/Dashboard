import {Component} from "preact";
import {GuildSettingsSectionProps, GuildSettingsSectionState} from "../../utils/Interfaces";
import {useContext} from "preact/hooks";
import {Guild, UserPerms, WS} from "../wrappers/Context";
import {Text} from 'preact-i18n';
import Loading from "../main/Loading";


const INITIAL_STATE = {
    loading: true,
    old_values: null,
    new_values: null,
    saving: false,
};

export default class ConfigSection extends Component<GuildSettingsSectionProps, GuildSettingsSectionState> {

    constructor(props, state) {
        super(props, state);
        this.state = {...INITIAL_STATE}
    }

    componentDidMount(): void {
        const guild = useContext(Guild);
        const websocket = useContext(WS);
        websocket.subscribe({
            channel: "guild_settings",
            subkey: guild.id,
            handler: (data) => {
            }
        });
        this.remount();
    }


    componentDidUpdate(previousProps: Readonly<GuildSettingsSectionProps>, previousState: Readonly<GuildSettingsSectionState>, snapshot: any): void {
        if (previousProps.name != this.props.name) {
            this.remount();
        }
    }

    remount = () => {
        this.setState({loading: true});
        const guild = useContext(Guild);
        const websocket = useContext(WS);
        websocket.ask_the_bot("get_guild_settings",
            {
                guild_id: guild.id,
                section: this.props.name.toUpperCase()
            },
            (data) => {
                this.setState({
                    loading: false,
                    old_values: {...data},
                    new_values: {...data}
                })
            });
    };


    componentWillUnmount(): void {
        const websocket = useContext(WS);
        websocket.unsubscribe("guild_settings")
    }

    setter = (key, value) => {
        const current = this.state.new_values;
        current[key] = value;
        this.setState({
            new_values: current,
        })
    };

    get_to_submit = () => {
        let {old_values, new_values} = this.state;
        let to_submit = {};
        for (let key in this.props.fields) {
            let name = this.props.fields[key].name;
            let new_value = new_values[name];
            if (old_values[name] != new_value) {
                to_submit[name] = new_value
            }
        }
        return to_submit;
    };


    can_submit = () => {
        let to_submit = this.get_to_submit();
        let can_submit = Object.keys(to_submit).length > 0 && !this.state.saving;
        for (let k in this.props.fields) {
            let field = this.props.fields[k];
            if (to_submit[field.name] !== undefined)
                can_submit = can_submit && (!field.validator || field.validator(this.state.new_values[field.name]) === true);

            return can_submit;
        }
    };

    on_submit = (event) => {
        event.preventDefault();
        if (!this.can_submit()) {
            // window.location.href = "https://tenor.com/view/close-so-close-joey-friends-nice-try-gif-4828122";
            return;
        }
        this.setState({...this.state, saving: true});

        const guild = useContext(Guild);
        const websocket = useContext(WS);
        websocket.ask_the_bot(
            "save_guild_settings",
            {
                guild_id: guild.id,
                section: this.props.name.toUpperCase(),
                modified_values: this.get_to_submit()
            },
            (data) => {
                this.setState({
                    old_values: {...data.modified_values},
                    new_values: {...data.modified_values},
                    saving: false
                })
            });
    };

    reset = (event) => {
        event.preventDefault();
        this.setState({
            new_values: {...this.state.old_values}
        })
    };

    render() {
        const assembled = [];
        const {loading, old_values, new_values, saving} = this.state;
        const perms = useContext(UserPerms);
        if (!loading) {
            for (let key in this.props.fields) {
                let {name, info, Component, visible, validator, extra_props} = this.props.fields[key];
                extra_props = extra_props || {};
                visible = visible || (() => true);
                validator = validator || (() => true);
                const changed = old_values[name] != new_values[name];
                if (visible(new_values)) {
                    // @ts-ignore
                    assembled.push(<Component name={name} info={info} value={new_values[name]}
                                              setter={this.setter} changed={changed} validator={validator}
                                              all_values={new_values}
                                              disabled={saving || ((perms.user_dash_perms & (1 << 3)) == 0)} {...extra_props}/>)
                }
            }
        }
        return (
            loading ?
                <Loading/> :
                <form onSubmit={this.on_submit}>
                    {assembled}

                    <div class="field is-grouped" style={{marginTop: "1em"}}>
                        <div class="control">
                            <button class="button is-link" disabled={!this.can_submit() || saving}><Text
                                id="config.parts.save"/></button>
                        </div>
                        <div class="control">
                            <button class="button is-link" disabled={!this.can_submit() || saving}
                                    onClick={this.reset}>
                                <Text id="config.parts.reset"/></button>
                        </div>
                    </div>
                </form>
        );
    }

}