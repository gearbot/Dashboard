import {Component} from "preact";
import {HeaderProps, HeaderState} from "../../utils/Interfaces";
import {useContext} from "preact/hooks";
import {AuthUser} from "../wrappers/Context";
import ROUTES from "../../utils/routes";
import {Link} from "preact-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import UserMenu from "./UserMenu";
import {Text} from 'preact-i18n';

//navigation for authenticated users
const NavigationAuth = ({user}) => (

    <>
        <a class="navbar-item" href={ROUTES.ADD_GEARBOT} target="_blank" native><Text id="navbar.add_bot"/></a>
        <Link activeClassName="is-active" class="navbar-item" href={ROUTES.GUILDS}><Text id="navbar.guilds"/></Link>
        <Link activeClassName="is-active" class="navbar-item" href={ROUTES.COMMANDS}><Text
            id={"navbar.commands"}/></Link>
        <Link activeClassName="is-active" class="navbar-item" href={ROUTES.STATS}><Text id="navbar.stats"/></Link>
        {
            user.bot_admin_status ?
                <Link activeClassName="is-active" href={ROUTES.ADMIN} class="navbar-item"><Text
                    id="navbar.admin"/></Link>
                : null
        }
    </>
);

//navbar for non authenticated users
const NavigationNonAuth = () => (
    <>
        <a class="navbar-item" href={ROUTES.ADD_GEARBOT} target="_blank" native><Text id="navbar.add_bot"/></a>
        <Link activeClassName="is-active" class="navbar-item" href={ROUTES.COMMANDS}><Text id="navbar.commands"/></Link>
        <Link activeClassName="is-active" class="navbar-item" href={ROUTES.FAQ}><Text id="navbar.faq"/></Link>
        <Link activeClassName="is-active" class="navbar-item" href={ROUTES.STATS}><Text id="navbar.stats"/></Link>
    </>
);


export default class Header extends Component<HeaderProps, HeaderState> {

    constructor(props, state) {
        super(props, state);
        this.state = {"menuActive": false};

    }

    toggleActive = () => this.setState({"menuActive": !this.state.menuActive});

    render() {

        const user = useContext(AuthUser);
        return <nav class="navbar" role="navigation" aria-label="main navbar">
            <div class="navcontainer">
                <Link class="logo" href={ROUTES.HOME}>
                    <img src="/assets/logo.png" class="logoImage"/>
                    <span class="logoText"><b>GEAR</b>BOT</span>
                </Link>
                <div class="altnav">
                    <a onClick={this.toggleActive}><FontAwesomeIcon icon={faBars}/></a>
                </div>
                <div class={`sliding navgroup ${this.state.menuActive ? "active" : ""}`}>
                    <div class="navmiddle">
                        <div class="navitems">
                            {
                                user ? <NavigationAuth user={user}/> : <NavigationNonAuth/>
                            }
                        </div>
                    </div>

                    <div class="navright">
                        <UserMenu/>
                    </div>
                </div>
            </div>



        </nav>;
    }
}