import {Component} from "preact";
import {GuildSettingsGeneralState} from "../utils/Interfaces";
import {get_info} from "../utils/dashAPI";
import {useContext} from "preact/hooks";
import {Guild} from "../components/wrappers/Context";
import ValidatedTextField from "../components/Configuration/ValidatedTextField";
import RangedIntField from "../components/Configuration/RangedIntField";
import LanguageSelector from "../components/Configuration/LanguageSelector";
import CheckmarkField from "../components/Configuration/CheckmarkField";
import TimezoneSelector from "../components/Configuration/TimezoneSelector";

const INITIAL_STATE = {
    loading: true,
    old_values: null,
    new_values: null
}

const fields = [
    {
        name: "Prefix",
        api_name: "PREFIX",
        info: "The bot prefix",
        Component: ValidatedTextField,
        visible: (values) => true,
        component_props: {
            validator: (value: string) => {
                if (!value || value == "")
                    return "Please enter a prefix";
                if (value.length > 10)
                    return "Please use a shorter prefix";
                return true
            }
        }
    },
    {
        name: "Language",
        api_name: "LANG",
        info: "The language the bot should use for this server",
        Component: LanguageSelector,
        visible: (values) => true,
        component_props: {}
    },
    {
        name: "New user age",
        api_name: "NEW_USER_THRESHOLD",
        info: "How old a user max is to be consider new, in seconds",
        Component: RangedIntField,
        visible: (values) => true,
        component_props: {
            min: 0,
            max: 60 * 60 * 24 * 14
        }
    },
    {
        name: "Permissions denied message",
        api_name: "PERM_DENIED_MESSAGE",
        info: "Whether or not to notify a user the command he tries to use isn't available to them or to ignore them",
        Component: CheckmarkField,
        visible: (values) => true,
        component_props: {}
    },
    {
        name: "Show timestamps",
        api_name: "TIMESTAMPS",
        info: "Whether or not to prepend timestamps to logs or not.",
        Component: CheckmarkField,
        visible: (values) => true,
        component_props: {}
    },
    {
        name: "Timezone",
        api_name: "TIMEZONE",
        info: "The timezone to use for timestamps",
        Component: TimezoneSelector,
        visible: (values) => values["TIMESTAMPS"],
        component_props: {}
    }
];

export default class GuildSettingsGeneral extends Component<{}, GuildSettingsGeneralState> {

    constructor(props, state) {
        super(props, state);
        this.state = {...INITIAL_STATE}
    }


    componentDidMount(): void {
        const guild = useContext(Guild);
        get_info({
            method: "GET",
            endpoint: `guilds/${guild.id}/config/general`
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
            new_values: current
        })
    };

    render() {
        const assembled = [];
        const {loading, old_values, new_values} = this.state;
        if (!loading){
            for (let key in fields) {
                const {name, api_name, info, Component, visible, component_props} = fields[key];
                const changed = old_values[api_name] != new_values[api_name];
                if (visible(new_values)) {
                    assembled.push(<Component name={name} api_name={api_name} info={info} value={new_values[api_name]} setter={this.setter} changed={changed} {...component_props} />)
                }
            }
        }
        return (
            loading ?
                <div>Loading...</div>:
                assembled
        );
    }
}