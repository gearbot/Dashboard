import {Component} from "preact";
import {AppState, UserHolder} from "../../utils/Interfaces";
import Router from "preact-router";
import Home from "../../routes/Home";
import Header from "../navigation/Header";
import {AuthUser, AuthUserSetter, GeneralInfo} from "../wrappers/Context";
import {useContext, useState} from "preact/hooks";
import PopupCloser from "./PopupCloser";
import ROUTES from "../../utils/routes";
import GuildListRoute from "../../routes/GuildListRoute";
import {get_info} from "../../utils/dashAPI";
import GuildRoute from "../../routes/GuildRoute";
import {set_theme_colors} from "../../utils/theme";
import {IntlProvider} from 'preact-i18n';
import Loading from "./Loading";

const VERSION = 23;

class App extends Component<UserHolder, AppState> {


    componentDidMount(): void {
        // we got some loading to do!
        this.setState({loading: true});

        const todo = [];

        //restore info from localstorage
        set_theme_colors(localStorage.getItem('theme') || "dark", false);
        this.setState({
            user: JSON.parse(localStorage.getItem("user"))
        });


        //check for a new version, self destruct and reload if one is found
        todo.push(fetch("/assets/version.txt").then(
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
                })));


        get_info({
            method: "GET",
            endpoint: "whoami"
        }).then(
            info => {
                useContext(AuthUserSetter)(info)
            }).catch(ex => {
            useContext(AuthUserSetter)(null)
        });
        get_info({
            method: "GET",
            endpoint: "general_info"
        }).then(
            info => {
                this.setState({generalInfo: info})
            }
        );

        todo.push(fetch(`/assets/lang/${localStorage.getItem('LANG') || "en_US"}.json`).then(
            response => response.json().then(
                text => {
                    this.setState({lang_strings: text})
                })));

        //wait till we got everything sorted
        Promise.all(todo).then(() => this.setState({loading: false}))
    }

    setUser = user => {
        this.setState({user: user});
        if (user)
            localStorage.setItem("user", JSON.stringify(user));
        else
            localStorage.removeItem("user")
    };


    render() {
        const [url, setUrl] = useState(null);
        const show_background = !this.state.loading && url && !(url.endsWith(ROUTES.HOME));
        return (

            <AuthUser.Provider value={this.state.user} children={
                <AuthUserSetter.Provider value={this.setUser} children={
                    <GeneralInfo.Provider value={this.state.generalInfo} children={
                        <div class={show_background ? "bot_background" : ""}>
                            <IntlProvider definition={this.state.lang_strings}>
                                {this.state.loading ? <Loading/> : <div><Header/>
                                    <Router onChange={(url) => setUrl(url.url)} url={url}>
                                        <Home path={ROUTES.HOME}/>
                                        <PopupCloser path={ROUTES.CLOSER}/>
                                        <GuildListRoute path={ROUTES.GUILDS}/>
                                        <GuildRoute path={`${ROUTES.GUILD_DETAILS}/:?/:?`}/>
                                    </Router>
                                </div>
                                }
                            </IntlProvider>
                        </div>

                    }/>
                }/>
            }/>

        );
    }
}

export default App