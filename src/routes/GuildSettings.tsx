import {Component} from "preact";
import Router from "preact-router";
import ROUTES from "../utils/routes";
import GuildSettingsNav from "../components/guilds/GuildSettingsNav";
import {NavProps} from "../utils/Interfaces";
import CheckmarkField from "../components/Configuration/CheckmarkField";
import TimezoneSelector from "../components/Configuration/TimezoneSelector";
import LanguageSelector from "../components/Configuration/LanguageSelector";
import ConfigSection from "../components/Configuration/ConfigSection";
import BasicInput from "../components/Configuration/BasicInput";


const validateRangedInt = (value, min, max) =>
    value ? value > max ? `This value can not be greater then ${max}` : value < min ? `This value can not be smaller then ${min}` : true : "Please enter a value"


const fields = {
    general: [
        {
            name: "Prefix",
            api_name: "PREFIX",
            info: "The bot prefix",
            Component: BasicInput,
            validator: (value) => {
                if (!value || value == "")
                    return "Please enter a prefix";
                if (value.length > 10)
                    return "Please use a shorter prefix";
                return true
            },
            extra_props: {
                type: "text"
            }
        },
        {
            name: "Language",
            api_name: "LANG",
            info: "The language the bot should use for this server",
            Component: LanguageSelector,
        },
        {
            name: "New user age",
            api_name: "NEW_USER_THRESHOLD",
            info: "How old a user max is to be consider new, in seconds",
            Component: BasicInput,
            validator: (value) => validateRangedInt(value, 0, 60 * 60 * 24 * 14),
            extra_props: {
                type: "number"
            }
        },
        {
            name: "Permissions denied message",
            api_name: "PERM_DENIED_MESSAGE",
            info: "Whether or not to notify a user the command he tries to use isn't available to them or to ignore them",
            Component: CheckmarkField,
        },
        {
            name: "Show timestamps",
            api_name: "TIMESTAMPS",
            info: "Whether or not to prepend timestamps to logs or not.",
            Component: CheckmarkField,
        },
        {
            name: "Timezone",
            api_name: "TIMEZONE",
            info: "The timezone to use for timestamps",
            Component: TimezoneSelector,
            visible: (values) => values["TIMESTAMPS"],
        }
    ]
};


export default class GuildSettings extends Component<NavProps, {}> {

    constructor(props, state) {
        super(props, state);
    }

    render() {
        const sections = [];
        for (let name in fields){
            sections.push(<ConfigSection name="general" fields={fields.general} path={`${ROUTES.GUILD_SETTINGS}/${name}`}/>)
        }
        return (
            <div class="flexcontainer">
                <div class="flexitem">
                    <GuildSettingsNav tab={this.props.tab}/>
                </div>
                <div class="container is-fluid flexitem2">
                    <Router>
                        {sections}
                    </Router>
                </div>
            </div>
        );
    }
}
