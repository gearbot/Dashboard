import {Component} from "preact";
import {AppState, UserHolder} from "../../utils/Interfaces";
import Router from "preact-router";
import Home from "../../routes/Home";
import Header from "./Header";
import {AuthUser, AuthUserSetter} from "../wrappers/Context";
import {useContext, useState} from "preact/hooks";
import PopupCloser from "./PopupCloser";
import ROUTES from "../../utils/routes";
import GuildListRoute from "../../routes/GuildListRoute";
import {get_info} from "../../utils/dashAPI";
import "../../style/styles.scss"
import GuildRoute from "../../routes/GuildRoute";

const VERSION = 1;

class App extends Component<UserHolder, AppState> {


    componentDidMount(): void {
        //check for a new version, self destruct and reload if one is found
        fetch("/assets/version.txt").then(
            response => response.text().then(
                text => {
                    if (parseInt(text) > VERSION) {
                        navigator.serviceWorker.getRegistration().then(function (reg) {
                            if (reg) {
                                reg.unregister().then(function () {
                                    location.reload(true);
                                });
                            } else {
                                location.reload(true);
                            }
                        });
                    }
                }));

        this.setState({user: JSON.parse(localStorage.getItem("user"))});
        get_info({method: "GET", endpoint: "whoami", auth_on_fail: false}).then(info => {
            localStorage.setItem("user", JSON.stringify(info));
            useContext(AuthUserSetter)(info)
        });
    }

    setUser = user => this.setState({user: user});


    render() {
        const [url, setUrl] = useState(null);
        return (
            <AuthUser.Provider value={this.state.user} children={
                <AuthUserSetter.Provider value={this.setUser} children={
                    <div>
                        <Header/>
                        <Router onChange={setUrl} url={url}>
                            <Home path={ROUTES.HOME}/>
                            <PopupCloser path={ROUTES.CLOSER}/>
                            <GuildListRoute path={ROUTES.GUILDS}/>
                            <GuildRoute path={`${ROUTES.GUILD_DETAILS}/:?/:?`}/>
                        </Router>
                    </div>
                }/>
            }/>
        );
    }
}

export default App