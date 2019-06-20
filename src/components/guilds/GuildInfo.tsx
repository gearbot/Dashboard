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
            <div>

            </div>
        );
    }
}