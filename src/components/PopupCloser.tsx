import {Component} from "preact";
export default class PopupCloser extends Component<{}, {}> {

    constructor(props, state) {
        super(props, state);
        window.close();
    }

    render() {
        return (
            <div/>
        );
    }
}