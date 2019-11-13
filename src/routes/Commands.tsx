import {Component} from "preact";
import {useContext} from "preact/hooks";
import {WS} from "../components/wrappers/Context";
import {CommandsState} from "../utils/Interfaces";

export default class Commands extends Component<{}, CommandsState> {

    componentDidMount(): void {
        useContext(WS).ask_the_api("commands", null, (data) => {

        });
    }


    render() {
        return (
            <>
            </>
        )
    }
}