import {Component} from "preact";
import {HeaderProps, HeaderState} from "../utils/Interfaces";
import {useContext} from "preact/hooks";
import {AuthUserContext} from "./wrappers/AuthUserContext";
import ROUTES from "../utils/routes";
import {Link} from "preact-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faToolbox} from "@fortawesome/free-solid-svg-icons";

//navigation for authenticated users
const NavigationAuth = ({user}) => (

    <div class="navbar-start">
        {user.globalAdmin ? (
                <Link activeClassName="active" href={ROUTES.ADMIN} class="navbar-item"><FontAwesomeIcon icon={faToolbox}/>Admin</Link>
            )
            : null}
    </div>
);

//navbar for non authenticated users
const NavigationNonAuth = () => (
    <div class="navbar-start">


    </div>
);
//Right side for logged in users
const NavUserAuth = () => (
    <div class="navbar-item">
        <div class="buttons">
            {/*<SignoutButton/>*/}

        </div>
    </div>
)

//login for non authenticated users
const UserLogin = () => (
    <div class="navbar-item">
        <div class="buttons">
            <a class="button is-light" activeClassName="active" href={ROUTES.SIGN_IN} native>
                <FontAwesomeIcon icon={faSignInAlt} className="fab"/> Log in
            </a>
        </div>
    </div>
);


export default class Header extends Component<HeaderProps, HeaderState> {

    constructor(props, state) {
        super(props, state);
        this.setState({"menuActive": false})
    }

    toggleActive = (event) => this.setState({"menuActive": !this.state.menuActive});

    render() {
        const user = useContext(AuthUserContext);
        console.log("User: " + user);
        return <nav class="navbar is-light" role="navigation" aria-label="main navbar">
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
                    {
                        user ? <NavUserAuth/> : <UserLogin/>
                    }
                </div>
            </div>
        </nav>;
    }
}