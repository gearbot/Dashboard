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
import RoleConfigurator from "../components/Configuration/RoleConfigurator";
import MuteComponent from "../components/Configuration/MuteComponent";
import PermLevelSelector from "../components/Configuration/PermLevelSelector";


const validateRangedInt = (value, min, max) =>
    value ? value > max ? `This value can not be greater then ${max}` : value < min ? `This value can not be smaller then ${min}` : true : "Please enter a value"


const fields = {
    general:
        {
            Component: ConfigSection,
            extra_props: {
                fields:
                    [
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
                            name: "Timezone",
                            api_name: "TIMEZONE",
                            info: "The timezone to use for timestamps",
                            Component: TimezoneSelector,
                            visible: (values) => values["TIMESTAMPS"],
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
                        }
                    ]
            }

        },
    permissions: {
        Component: ConfigSection,
        extra_props: {
            fields: [
                {
                    name: "Level 4 roles",
                    api_name: "LVL4_ROLES",
                    info: "People with any of these roles have  level 4 permissions",
                    Component: RoleConfigurator,

                },
                {
                    name: "Admin roles",
                    api_name: "ADMIN_ROLES",
                    info: "People with any of these roles are considered admins and thus have lvl 3 permissions",
                    Component: RoleConfigurator,
                    extra_props: {
                        type: "admin"
                    }
                },
                {
                    name: "Mod roles",
                    api_name: "MOD_ROLES",
                    info: "People with any of these roles are considered moderators and thus have lvl 2 permissions",
                    Component: RoleConfigurator,
                    extra_props: {
                        type: "mod"
                    }
                },
                {
                    name: "Trusted roles",
                    api_name: "TRUSTED_ROLES",
                    info: "People with any of these roles are considered trusted and thus have lvl 1 permissions",
                    Component: RoleConfigurator
                },

            ]
        }
    },
    roles: {
        Component: ConfigSection,
        extra_props: {
            fields: [
                {
                    name: "Self assignable roles",
                    api_name: "SELF_ROLES",
                    info: "These are the roles people can add to themselves through the !selfroles command. Integration roles (created by bots, twitch, boosting, ...) or roles above the bot's highest role will not work.",
                    Component: RoleConfigurator,
                    extra_props: {
                        extra_check: "can_be_self_role"
                    }
                },

                {
                    name: "Mute role",
                    api_name: "MUTE_ROLE",
                    info: "The role used to mute people",
                    Component: MuteComponent
                }
            ]
        }
    },
    dash_security: {
        Component: ConfigSection,
        extra_props: {
            fields: [
                {
                    name: "Dashboard access",
                    api_name: "ACCESS",
                    info: "Minimum permission level required to access the dashboard for this guild.",
                    Component: PermLevelSelector,
                    extra_props: {
                        min: 1
                    }
                },
                {
                    name: "Dashboard Infraction access",
                    api_name: "INFRACTION",
                    info: "Minimum permission level required to access the infractions from the dashboard for this guild.",
                    Component: PermLevelSelector,
                    extra_props: {
                        min: 1,
                        min_value: "ACCESS"
                    }
                },
                {
                    name: "Dashboard config read access",
                    api_name: "VIEW_CONFIG",
                    info: "Minimum permission level required to access gain read-only access to this guilds config from the dashboard.",
                    Component: PermLevelSelector,
                    extra_props: {
                        min: 1,
                        min_value: "ACCESS"
                    }
                },
                {
                    name: "Dashboard config write access",
                    api_name: "ALTER_CONFIG",
                    info: "Minimum permission level required to alter this guilds config from the dashboard.",
                    Component: PermLevelSelector,
                    extra_props: {
                        min: 2,
                        min_value: "VIEW_CONFIG"
                    }
                }
            ]
        }
    }
};


export default class GuildSettings extends Component<NavProps, {}> {

    constructor(props, state) {
        super(props, state);
    }

    render() {
        const sections = [];

        for (let name in fields) {
            const {Component, extra_props} = fields[name];
            sections.push(<Component name={name} path={`${ROUTES.GUILD_SETTINGS}/${name}`} {...extra_props}/>)
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
