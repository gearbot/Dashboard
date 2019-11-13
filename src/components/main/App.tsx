import {Component} from "preact";
import {AppState, UserHolder} from "../../utils/Interfaces";
import Router from "preact-router";
import Home from "../../routes/Home";
import Header from "../navigation/Header";
import {
    AuthUser,
    AuthUserSetter,
    GeneralInfo,
    UsernameCache,
    UsernameCacheSetter,
    WS,
    UrlSetter
} from "../wrappers/Context";
import {useContext, useState} from "preact/hooks";
import PopupCloser from "./PopupCloser";
import ROUTES from "../../utils/routes";
import GuildListRoute from "../../routes/GuildListRoute";
import {get_info} from "../../utils/dashAPI";
import GuildRoute from "../../routes/GuildRoute";
import {set_theme_colors} from "../../utils/theme";
import {IntlProvider} from 'preact-i18n';
import Loading from "./Loading";
import WebSocketHolder from "../../utils/WebSocketHolder";
import Stats from "../../routes/StatsRoute";
import * as React from "preact/compat";

const INITIAL_STATE = {
    loading: true,
    user: null,
    generalInfo: null,
    lang_strings: null,
    websocket: null,
    pluralRules: null,
    usernameCache: {},
    usernamesRequested: []
};

class App extends Component<UserHolder, AppState> {

    constructor(props, state) {
        super(props, state);
        this.state =
            {
                ...INITIAL_STATE,
                websocket: new WebSocketHolder((reply) =>
                    useContext(AuthUserSetter)(reply.authorized ? reply.user_info : null))
            };
    }

    componentDidMount(): void {
        // we got some loading to do!
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
                    if (text != process.env.VERSION && process.env.VERSIONCHECK == "true") {
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

        todo.push(this.setLang(localStorage.getItem('LANG') || "en_US"));

        //wait till we got everything sorted
        Promise.all(todo).then(() => this.setState({loading: false}))
    }

    setLang(lang) {
        localStorage.setItem("LANG", lang);
        this.setState({pluralRules: new Intl.PluralRules(lang.replace("_", "-"))});
        return fetch(`/assets/lang/${lang}.json`).then(
            response => response.json().then(
                text => {
                    this.setState({lang_strings: text})
                }));
    }


    setUser = user => {
        this.setState({user: user});
        if (user)
            localStorage.setItem("user", JSON.stringify(user));
        else
            localStorage.removeItem("user")
    };

    pluralProvider = (dict, plural) => {
        return dict[this.state.pluralRules.select(plural)];
    };

    usernameCacheSetter = (newCache) => {
        this.setState({usernameCache: newCache})
    }


    render() {
        const [url, setUrl] = useState(null);
        const show_background = !this.state.loading && url && !(url.endsWith(ROUTES.STATS));
        return (
            <WS.Provider value={this.state.websocket} children={
                <AuthUser.Provider value={this.state.user} children={
                    <AuthUserSetter.Provider value={this.setUser} children={
                        <GeneralInfo.Provider value={this.state.generalInfo} children={
                            <UsernameCache.Provider value={this.state.usernameCache} children={
                                <UsernameCacheSetter.Provider value={this.usernameCacheSetter} children={
                                    <div class={show_background ? "bot_background" : ""}>


                                        <IntlProvider definition={this.state.lang_strings}
                                                      provider={this.pluralProvider}>

                                            <div class="page">
                                                {this.state.loading ? <Loading/> : <div><Header/>
                                                    <Router onChange={(url) => setUrl(url.url)} url={url}>
                                                        <Home path={ROUTES.HOME}/>
                                                        <PopupCloser path={ROUTES.CLOSER}/>
                                                        <GuildListRoute path={ROUTES.GUILDS}/>
                                                        <GuildRoute path={`${ROUTES.GUILD_DETAILS}/:?/:?`}/>
                                                        <Stats path={ROUTES.STATS}/>
                                                    </Router>
                                                </div>
                                                }
                                            </div>
                                        </IntlProvider>
                                    </div>
                                }/>
                            }/>
                        }/>
                    }/>
                }/>
            }/>

        );
    }
}

export default App