import {Component} from "preact";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {get_info} from "../../utils/dashAPI";
import {useContext} from "preact/hooks";
import {AuthUserSetter} from "../wrappers/Context";
import {route} from "preact-router";
import {Text} from 'preact-i18n';

export default class LogoutButton extends Component<{}, {}> {

    signout = () => {
        document.cookie = "state_key=; Max-Age=-99999999;";
        get_info({
            method: "GET",
            endpoint: "logout",
        }).then(
            () => {
                useContext(AuthUserSetter)(null)
                route("/");
            }
        )
    };

    render() {
        return (
            <button class="button" onclick={this.signout}>
                <FontAwesomeIcon icon={faSignOutAlt}/> <Text id={"header.logout"}/>
            </button>
        );
    }
}