import {Component} from "preact";
export default class TODOComponent extends Component<{}, {}> {

    constructor(props, state) {
        super(props, state);
        window.close();
    }

    render() {
        return (
            <div>TODO: make this thing</div>
        );
    }
}