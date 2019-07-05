import {Component} from "preact";
import {GuildSettingsSectionProps, GuildSettingsSectionState} from "../../utils/Interfaces";
import {useContext} from "preact/hooks";
import {Guild} from "../wrappers/Context";
import {get_info} from "../../utils/dashAPI";

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
        get_info({
            method: "GET",
            endpoint: `guilds/${guild.id}/config/${this.props.name}`
        }).then(info =>
            this.setState({
                loading: false,
                old_values: {...info},
                new_values: {...info}
            })
        )
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
            let api_name = this.props.fields[key].api_name;
            let new_value = new_values[api_name];
            if (old_values[api_name] != new_value) {
                to_submit[api_name] = new_value
            }
        }
        return to_submit;
    };


    can_submit = () => {
        let to_submit = this.get_to_submit();
        let can_submit = Object.keys(to_submit).length > 0 && !this.state.saving;
        for (let k in this.props.fields) {
            let field = this.props.fields[k];
            if (to_submit[field.api_name] !== undefined)
                can_submit = can_submit && (!field.validator || field.validator(this.state.new_values[field.api_name]) === true);

            return can_submit;
        }
    };

    on_submit = (event) => {
        event.preventDefault();
        if (!this.can_submit()) {
            window.location.href = "https://tenor.com/view/close-so-close-joey-friends-nice-try-gif-4828122"
            return;
        }
        this.setState({...this.state, saving: true});

        const guild = useContext(Guild);
        get_info({
            method: "PATCH",
            endpoint: `guilds/${guild.id}/config/${this.props.name}`,
            body: this.get_to_submit()
        }).then(
            info => {
                this.setState({
                    old_values: {...info.modified_values},
                    new_values: {...info.modified_values},
                    saving: false
                })
            }
        )
    };

    reset = (event) => {
        event.preventDefault();
        this.setState({
            new_values: {...this.state.old_values}
        })
    }

    render() {
        const assembled = [];
        const {loading, old_values, new_values, saving} = this.state;
        if (!loading) {
            const guild = useContext(Guild);
            for (let key in this.props.fields) {
                let {name, api_name, info, Component, visible, validator, extra_props} = this.props.fields[key];
                extra_props = extra_props || {};
                visible = visible || ((v) => true);
                validator = validator || ((v) => true);
                const changed = old_values[api_name] != new_values[api_name];
                if (visible(new_values)) {
                    // @ts-ignore
                    assembled.push(<Component name={name} api_name={api_name} info={info} value={new_values[api_name]}
                                              setter={this.setter} changed={changed} validator={validator} all_values={new_values}
                                              disabled={saving || ((guild.user_perms & (1 << 3)) == 0)} {...extra_props}/>)
                }
            }
        }
        return (
            loading ?
                <div>Loading...</div> :
                <form onsubmit={this.on_submit}>
                    {assembled}

                    <div class="field is-grouped" style={{marginTop: "1em"}}>
                        <div class="control">
                            <button class="button is-link" disabled={!this.can_submit() || saving}>Save</button>
                        </div>
                        <div class="control">
                            <button class="button is-link" disabled={!this.can_submit() || saving} onclick={this.reset}>Reset</button>
                        </div>
                    </div>
                </form>
        );
    }

}