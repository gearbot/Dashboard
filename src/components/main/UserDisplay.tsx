import {Component} from "preact";
import {UsernameProps} from "../../utils/Interfaces";
import {useContext} from "preact/hooks";
import {UserInfoCache, UserInfoCacheSetter, WS} from "../wrappers/Context";
import "../../style/main/userdisplay.scss"

const requested = [];
let scheduled = false;
let to_request = [];

export function receive_users_info(data) {
    const cache = {...useContext(UserInfoCache)};
    for (let uid in data) {
        cache[uid] = data[uid];
        requested.splice(requested.indexOf(uid), 1);
    }
    useContext(UserInfoCacheSetter)(cache)
}


//prep for requesting, schedule request if we didn't have one planned yet
function request_username(uid) {
    requested.push(uid);
    to_request.push(uid);
    if (!scheduled) {
        scheduled = true;
        setTimeout(
            () => {
                useContext(WS).send("get_users_info", {ids: to_request});
                to_request = [];
                scheduled = false;

            },
            100
        )
    }
}

export default class UserDisplay extends Component<UsernameProps, {}> {


    componentDidMount(): void {
        const cache = useContext(UserInfoCache);
        if (!cache[this.props.id] && requested.indexOf(this.props.id) === -1) {
            request_username(this.props.id);
        }
    }

    render() {
        const cache = useContext(UserInfoCache);
        if (!cache[this.props.id])
            return this.props.id;
        const {username, avatar} = cache[this.props.id];
        return (
            <div class="userDisplay">
                <img class="avatar" src={avatar}/>
                <div class="username">{username}</div>
            </div>
        );
    }
}