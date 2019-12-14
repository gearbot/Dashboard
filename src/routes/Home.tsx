import {Component} from "preact";
import {Text} from 'preact-i18n';
import ROUTES from "../utils/routes";
import {Link} from "preact-router";
import "../style/routes/home.scss"

export default class Home extends Component<{}, {}> {

    render() {
        return (
            <div class="home">
                <div class="homeHeader">
                    <h1><Text id="home.title"/></h1>
                    <p><Text id="home.info"/></p>
                    <a class="button yellowButton" href={ROUTES.ADD_GEARBOT} target="_blank" native><Text id="navbar.add_bot"/></a>
                    <Link activeClassName="is-active" class="button blackButton" href={ROUTES.COMMANDS}><Text id={"home.commands"}/></Link>
                </div>

                <div class="features">
                    <div class="feature">
                        <img src="/assets/background.svg"/>
                        <h2>Title</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pulvinar rhoncus dui, ac dictum massa semper non. Cras magna libero, sagittis sit amet tempor at, gravida ac dui
                        </p>
                    </div>

                    <div class="feature">
                        <img src="/assets/background.svg"/>
                        <h2>Title</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pulvinar rhoncus dui, ac dictum massa semper non. Cras magna libero, sagittis sit amet tempor at, gravida ac dui
                        </p>
                    </div>

                    <div class="feature">
                        <img src="/assets/background.svg"/>
                        <h2>Title</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pulvinar rhoncus dui, ac dictum massa semper non. Cras magna libero, sagittis sit amet tempor at, gravida ac dui
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}