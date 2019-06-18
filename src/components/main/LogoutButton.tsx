import {Component} from "preact";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {get_info} from "../../utils/dashAPI";
import {useContext} from "preact/hooks";
import {AuthUserSetter} from "../wrappers/Context";

export default class LogoutButton extends Component<{}, {}> {

    signout = () => {
        get_info({
            method: "GET",
            endpoint: "logout",
            auth_on_fail: false
        }).then(
            useContext(AuthUserSetter)(null)
        )
    };

    render() {
        return (
            <button class="button is-light" onclick={this.signout}>
                <FontAwesomeIcon icon={faSignOutAlt}/> Sign Out
            </button>
        );
    }
}