import {Component} from "preact";
import {HeaderProps, HeaderState} from "../../utils/Interfaces";
import {useContext} from "preact/hooks";
import {AuthUser, AuthUserSetter} from "../wrappers/Context";
import ROUTES from "../../utils/routes";
import {Link} from "preact-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faToolbox} from "@fortawesome/free-solid-svg-icons";
import {get_info} from "../../utils/dashAPI";
import UserMenu from "./UserMenu";
import { Text } from 'preact-i18n';

//navigation for authenticated users
const NavigationAuth = ({user}) => (

    <div class="navbar-start">
        <Link activeClassName="is-active" class="navbar-item" href={ROUTES.GUILDS}><Text id="navbar.guilds" /></Link>
        <Link activeClassName="is-active" class="navbar-item" href={ROUTES.COMMANDS}><Text id={"navbar.commands"}/></Link>
        <Link activeClassName="is-active" class="navbar-item" href={ROUTES.STATS}><Text id="navbar.stats" /></Link>
        {
            user.bot_admin_status ?
                <Link activeClassName="is-active" href={ROUTES.ADMIN} class="navbar-item"><FontAwesomeIcon icon={faToolbox}/><Text id="navbar.admin" /></Link>
            : null
        }
    </div>
);

//navbar for non authenticated users
const NavigationNonAuth = () => (
    <div class="navbar-start">
        <Link activeClassName="is-active" class="navbar-item" href={ROUTES.STATS}><Text id="navbar.stats" /></Link>
    </div>
);

const login = () => {
    get_info({method: "GET", endpoint: "whoami", auth_on_fail:true}).then(info => useContext(AuthUserSetter)(info))
};

//login for non authenticated users
const UserLogin = () => (
    <div class="navbar-item">
        <div class="buttons">
            <a class="button is-light" activeClassName="active" onclick={login}>
                <FontAwesomeIcon icon={faSignInAlt} className="fab"/> <Text id="navbar.login"/>
            </a>
        </div>
    </div>
);


export default class Header extends Component<HeaderProps, HeaderState> {

    constructor(props, state) {
        super(props, state);
        this.state = {"menuActive": false};

    }

    toggleActive = (event) => this.setState({"menuActive": !this.state.menuActive});

    render() {

        const user = useContext(AuthUser);
        return <nav class="navbar" role="navigation" aria-label="main navbar">
            <div class="navbar-brand">
                <Link class="navbar-item" href={ROUTES.HOME}>
                    <img src="/assets/logo.png" class="logo"/>
                    <h1>GearBot</h1>
                </Link>
                <a role="button" aria-label="menu" aria-expanded="false" onclick={this.toggleActive}
                   class={this.state.menuActive ? "navbar-burger burger is-active" : "navbar-burger burger"}>
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                </a>
            </div>

            <div class={this.state.menuActive ? "navbar-menu is-active" : "navbar-menu"}>
                {
                    user ? <NavigationAuth user={user}/> : <NavigationNonAuth/>
                }

                <div class="navbar-end">
                    <UserMenu />
                </div>
            </div>
        </nav>;
    }
}