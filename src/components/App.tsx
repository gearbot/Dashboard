import {Component} from "preact";
import {AppState, UserHolder} from "../utils/Interfaces";
import Router from "preact-router";
import ROUTES from "../utils/routes";
import Home from "./Home";
import Header from "./Header";

const VERSION = 1;

const INITIAL_STATE = {
    currentUrl: ""
};

class App extends Component<UserHolder, AppState> {
    private listener;


    componentDidMount(): void {
        this.state = {...INITIAL_STATE};
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

    componentWillUnmount() {
        this.listener();
    }

    handleRoute = (e: { url: string; }) => {
        this.setState({
            currentUrl: e.url
        });
    };


    render() {
        return (
            <div>
                <Header/>
                <Router onChange={this.handleRoute} url={this.state.currentUrl}>
                    <Home path={ROUTES.HOME}/>
                </Router>

            </div>
        );
    }
}

export default App