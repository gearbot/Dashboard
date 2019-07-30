import {Component} from "preact";
import {useContext} from "preact/hooks";
import {Guild} from "../components/wrappers/Context";
import {Text} from 'preact-i18n';

export default class GuildInfo extends Component<{}, {}> {

    render() {
        const guildInfo = useContext(Guild);
        return (
            <div>
                <div class="level">
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading"><Text id="info.members"/></p>
                            <p class="title">{guildInfo.members.toLocaleString()}</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading"><Text id="info.online"/></p>
                            <p class="title">{guildInfo.member_statuses.online.toLocaleString()}</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading"><Text id="info.afk"/></p>
                            <p class="title">{guildInfo.member_statuses.idle.toLocaleString()}</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading"><Text id="info.dnd"/></p>
                            <p class="title">{guildInfo.member_statuses.dnd.toLocaleString()}</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading"><Text id="info.offline"/></p>
                            <p class="title">{guildInfo.member_statuses.offline.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div class="level">
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading"><Text id="text_channels"/></p>
                            <p class="title">{Object.keys(guildInfo.text_channels).length}</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading"><Text id={"info.voice_channels"}/></p>
                            <p class="title">{guildInfo.voice_channels}</p>
                        </div>
                    </div>

                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading"><Text id="info.roles"/></p>
                            <p class="title">{Object.keys(guildInfo.role_list).length}</p>
                        </div>
                    </div>

                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading"><Text id="info.emoji"/></p>
                            <p class="title">{guildInfo.emojis.length}</p>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}