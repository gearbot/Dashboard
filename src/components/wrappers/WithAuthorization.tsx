import {Component as preact_component} from "preact";
import {useContext} from "preact/hooks";
import {AuthUser} from "./Context";
import {route} from "preact-router";
import ROUTES from "../../utils/routes";

const withAuthorization = condition => Component => {
    class WithAuthorization extends preact_component<{}, {}> {

        render(props) {
            const user = useContext(AuthUser);
            return condition(user) ? <Component {...props} /> : <p>Please login first</p>
            ;
        }
    }
    return WithAuthorization;
};

export default withAuthorization