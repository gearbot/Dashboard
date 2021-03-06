import {Component} from "preact";
import {useContext} from "preact/hooks";
import {AuthUser, AuthUserSetter} from "../wrappers/Context";
import {ThemeState} from "../../utils/Interfaces";
import {set_theme_colors} from "../../utils/theme";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import {get_info} from "../../utils/dashAPI";
import {route} from "preact-router";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";

export default class UserMenu extends Component<{}, ThemeState> {


    constructor(props: {}, context: any) {
        super(props, context);
        this.state = {theme: localStorage.getItem("theme") as ("light" | "dark") || "dark"}


    }

    switcher = () => {
        const new_theme = this.state.theme == "light" ? "dark": "light";
        this.setState({theme: new_theme});
        set_theme_colors(new_theme);
        localStorage.setItem("theme", new_theme)
    };

    login = () => {
        get_info({method: "GET", endpoint: "whoami", auth_on_fail:true}).then(info => useContext(AuthUserSetter)(info))
    };

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
        const user = useContext(AuthUser);
        return (
            <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                    {user ?
                        <div>
                            <div class="userHolder">
                            <img src="/assets/gear.png" class="userGear"/>
                            <img src={user.avatar_url} class="userImage"/>
                            </div>
                            {user.username}#{user.discrim}
                        </div>
                        : "Not logged in"}
                </a>

                <div class="navbar-dropdown">
                    <a class="navbar-item" onclick={this.switcher}>
                        <div class="field">
                            <label class="label">Theme</label>
                            <input id="wtf" type="checkbox" name="wtf" class="switch" checked={this.state.theme == "light"}  onclick={this.switcher}/>
                            <label for="wtf">{this.state.theme == "light" ? "Light": "Dark"}</label>
                        </div>
                    </a>
                    <hr class="navbar-divider" />
                        <a class="navbar-item">
                            Report a bug
                        </a>

                    <a class="navbar-item">
                        Feedback
                    </a>

                    <hr class="navbar-divider" />

                    {user ?
                        <a class="navbar-item" onclick={this.signout}>
                            <FontAwesomeIcon icon={faSignOutAlt}/> Sign Out
                        </a> :
                        <a class="navbar-item" onclick={this.login}>
                            <FontAwesomeIcon icon={faSignInAlt} className="fab"/> Log in
                        </a>
                    }
                </div>
            </div>
        );
    }
}