import {Component} from "preact";
import {AppState, UserHolder} from "../utils/Interfaces";
import Router from "preact-router";
import ROUTES from "../utils/routes";
import Home from "./Home";
import Header from "./Header";
import {AuthUserContext, AuthUserSetter} from "./wrappers/AuthUserContext";
import {useState} from "preact/hooks";

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
                }))
    }



    render() {
        const [user, setUser] = useState(null);
        const [url, setUrl] = useState(null);
        return (
            <AuthUserContext.Provider value={user} children={
                <AuthUserSetter.Provider value={setUser} children={
                    <div>
                        <Header/>
                        <Router onChange={setUrl} url={url}>
                            <Home path={ROUTES.HOME}/>
                        </Router>
                    </div>
                }/>
            }/>
        );
    }
}

export default App