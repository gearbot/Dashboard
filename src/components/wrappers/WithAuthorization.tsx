import {Component as preact_component} from "preact";
import {useContext} from "preact/hooks";
import {AuthUser} from "./Context";
import {route} from "preact-router";
import ROUTES from "../../utils/routes";

const withAuthorization = condition => Component => {
    class WithAuthorization extends preact_component<{}, {}> {

        componentDidMount() {
            const user = useContext(AuthUser);
            if (!condition(user)) {
                route(ROUTES.HOME, true);
            }
        }

        render(props) {
            return (
                <Component {...props} />
            );
        }
    }
    return WithAuthorization;
};

export default withAuthorization