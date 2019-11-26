import {Component} from "preact";
import {Link} from "preact-router";
import ROUTES from "../../utils/routes";
import {Text} from 'preact-i18n';

export default class Footer extends Component<{}, {}> {

    render() {

        return (
            <div class="footer">
                <div class="footerContainer">
                    <div class="left">
                        <h1>GearBot</h1>
                        <Link activeClassName="is-active" class="navbar-item" href={ROUTES.ADD_GEARBOT}><Text
                            id="navbar.add_bot"/></Link>
                        <Link activeClassName="is-active" class="navbar-item" href={ROUTES.COMMANDS}><Text
                            id="navbar.commands"/></Link>
                        <Link activeClassName="is-active" class="navbar-item" href={ROUTES.FAQ}><Text id="navbar.faq"/></Link>
                        <Link activeClassName="is-active" class="navbar-item" href={ROUTES.STATS}><Text
                            id="navbar.stats"/></Link>

                        <div class="copyright">
                            © 2019 <Text id="misc.created_by"/> AEnterprise#4693
                        </div>
                    </div>

                    <div class="right">
                        <img src="/assets/logo.png" class="logo"/>
                        <div class="socials">
                            <h1>
                                <Text id="misc.find_us"/>
                            </h1>
                            <a href="https://twitter.com/TheRealGearBot" target="_blank">
                                <img src="/assets/social/Twitter_Logo_whiteOnImage.svg"/>
                            </a>

                            <a href="https://discord.gg/vddW3D9" target="_blank">
                                <img src="/assets/social/Discord-Logo-White.svg"/>
                            </a>


                        </div>
                    </div>

                </div>
            </div>
        )
    }
}