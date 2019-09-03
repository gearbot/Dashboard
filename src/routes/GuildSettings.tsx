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
import LogChannels from "../components/Configuration/LogChannels";


const validateRangedInt = (value, min, max) =>
    value ? value > max ? `This value can not be greater then ${max}` : value < min ? `This value can not be smaller then ${min}` : true : "Please enter a value";


const fields = {
    general: {
        Component: ConfigSection,
        extra_props: {
            fields:
                [
                    {
                        name: "PREFIX",
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
                        name: "LANG",
                        Component: LanguageSelector,
                    },
                    {
                        name: "NEW_USER_THRESHOLD",
                        Component: BasicInput,
                        validator: (value) => validateRangedInt(value, 0, 60 * 60 * 24 * 14),
                        extra_props: {
                            type: "number"
                        }
                    },
                    {
                        name: "TIMEZONE",
                        Component: TimezoneSelector,
                        visible: (values) => values["TIMESTAMPS"],
                    },
                    {
                        name: "PERM_DENIED_MESSAGE",
                        Component: CheckmarkField,
                    },
                    {
                        name: "TIMESTAMPS",
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
                    name: "LVL4_ROLES",
                    Component: RoleConfigurator,

                },
                {
                    name: "ADMIN_ROLES",
                    Component: RoleConfigurator,
                    extra_props: {
                        type: "admin"
                    }
                },
                {
                    name: "MOD_ROLES",
                    Component: RoleConfigurator,
                    extra_props: {
                        type: "mod"
                    }
                },
                {
                    name: "TRUSTED_ROLES",
                    Component: RoleConfigurator
                },

            ]
        }
    },
    dash_security: {
        Component: ConfigSection,
        extra_props: {
            fields: [
                {
                    name: "ACCESS",
                    Component: PermLevelSelector,
                    extra_props: {
                        min: 1
                    }
                },
                {
                    name: "INFRACTION",
                    Component: PermLevelSelector,
                    extra_props: {
                        min: 1,
                        min_value: "ACCESS"
                    }
                },
                {
                    name: "VIEW_CONFIG",
                    Component: PermLevelSelector,
                    extra_props: {
                        min: 1,
                        min_value: "ACCESS"
                    }
                },
                {
                    name: "ALTER_CONFIG",
                    Component: PermLevelSelector,
                    extra_props: {
                        min: 2,
                        min_value: "VIEW_CONFIG"
                    }
                }
            ]
        }
    },
    roles: {
        Component: ConfigSection,
        extra_props: {
            fields: [
                {
                    name: "SELF_ROLES",
                    Component: RoleConfigurator,
                    extra_props: {
                        extra_check: "can_be_self_role"
                    }
                },

                {
                    name: "MUTE_ROLE",
                    Component: MuteComponent,
                }
            ]
        }
    },
    log_channels: {
        Component: LogChannels
    },
    message_logs: {
        Component: ConfigSection,
        extra_props: {
            fields: []
        }
    },
    censoring: {
        Component: ConfigSection,
        extra_props: {
            fields: []
        }
    },
    infractions: {
        Component: ConfigSection,
        extra_props: {
            fields: []
        }
    },
    perm_overrides: {
        Component: ConfigSection,
        extra_props: {
            fields: []
        }
    },
    raid_handling: {
        Component: ConfigSection,
        extra_props: {
            fields: []
        }
    },
    anti_spam: {
        Component: ConfigSection,
        extra_props: {
            fields: []
        }
    }

};


export default class GuildSettings extends Component<NavProps, {}> {

    render() {
        const sections = [];

        for (let name in fields) {
            const {Component, extra_props} = fields[name];
            sections.push(<Component name={name} path={`${ROUTES.GUILD_SETTINGS}/${name}`} {...extra_props}/>)
        }
        return (
            <div class="flexcontainer">
                <div class="flexitem">
                    <GuildSettingsNav tab={this.props.tab} tabs={Object.keys(fields)}/>
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
