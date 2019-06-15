import {Component} from "preact";
import {HeaderProps} from "../utils/Interfaces";
import {useContext} from "preact/hooks";
import {AuthUserContext} from "./wrappers/AuthUserContext";

export default class Header extends Component<HeaderProps, {}> {

    render() {
        const user = useContext(AuthUserContext);
        console.log("User: " + user)
        return (
            <div>
                Header {user}
            </div>
        );
    }
}