import {Component} from "preact";
import withAuthorization from "../components/wrappers/WithAuthorization";
import {GuildInfoRouteProps} from "../utils/Interfaces";

class GuildInfoRoute extends Component<GuildInfoRouteProps, {}> {

    constructor(props, state) {
        super(props, state);
    }

    render() {
        return (

            <div>
                {this.props.gid}
            </div>

        );
    }
}

export default withAuthorization(user => user != null)(GuildInfoRoute);