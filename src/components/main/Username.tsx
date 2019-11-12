import {Component} from "preact";
import {UsernameProps} from "../../utils/Interfaces";
import {useContext} from "preact/hooks";
import {UsernameCache, UsernameCacheSetter, WS} from "../wrappers/Context";

const requested = [];
let scheduled = false;
let to_request = [];

export function receive_usernames(data) {
    const cache = useContext(UsernameCache);
    for (let uid in data) {
        cache[uid] = data[uid];
        requested.splice(requested.indexOf(uid), 1);
    }
    useContext(UsernameCacheSetter)(cache)
}


//prep for requesting, schedule request if we didn't have one planned yet
function request_username(uid) {
    requested.push(uid);
    to_request.push(uid);
    if (!scheduled) {
        scheduled = true;
        setTimeout(
            () => {
                useContext(WS).send("get_usernames", {ids: to_request});
                to_request = [];
                scheduled = false;

            },
            100
        )
    }
}

export default class Username extends Component<UsernameProps, {}> {


    componentDidMount(): void {
        const cache = useContext(UsernameCache);
        console.log(cache, requested, to_request);
        if (!cache[this.props.id] && requested.indexOf(this.props.id) === -1) {
            request_username(this.props.id);
        }
    }

    render() {
        const cache = useContext(UsernameCache);
        return (
            <>
                <div>{cache[this.props.id] ? cache[this.props.id] + (this.props.hideId ? "" : ` (${this.props.id})`) : this.props.id}</div>
            </>
        );
    }
}