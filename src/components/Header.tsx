import {Component} from "preact";
import withAuthentication from "./wrappers/WithAuthentication";
import {HeaderProps} from "../utils/Interfaces";

class HeaderClass extends Component<HeaderProps, {}> {

    render() {
        return (
            <div>
                Header
            </div>
        );
    }
}

const Header = withAuthentication(HeaderClass);
export default Header;