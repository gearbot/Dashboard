import {Component} from "preact";
import {useContext} from "preact/hooks";
import {Guild} from "../wrappers/Context";
export default class GuildInfo extends Component<{}, {}> {

    constructor(props, state) {
        super(props, state);
    }

    render() {
        const guildInfo = useContext(Guild);
        return (
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
        );
    }
}