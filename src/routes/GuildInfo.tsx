import {Component} from "preact";
import {useContext} from "preact/hooks";
import {Guild} from "../components/wrappers/Context";

export default class GuildInfo extends Component<{}, {}> {

    constructor(props, state) {
        super(props, state);
    }

    render() {
        const guildInfo = useContext(Guild);
        return (
            <div>
                <div class="level">
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Members</p>
                            <p class="title">{guildInfo.members}</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Online</p>
                            <p class="title">{guildInfo.member_statuses.online}</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">AFK</p>
                            <p class="title">{guildInfo.member_statuses.idle}</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">DND</p>
                            <p class="title">{guildInfo.member_statuses.dnd}</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Offline</p>
                            <p class="title">{guildInfo.member_statuses.offline}</p>
                        </div>
                    </div>
                </div>

                <div class="level">
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Text channels</p>
                            <p class="title">{guildInfo.text_channels}</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Voice channels</p>
                            <p class="title">{guildInfo.voice_channels}</p>
                        </div>
                    </div>

                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Roles</p>
                            <p class="title">{guildInfo.role_list.length}</p>
                        </div>
                    </div>

                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Emoji</p>
                            <p class="title">{guildInfo.emojis.length}</p>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}