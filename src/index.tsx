import {render, h} from "preact";
import "./style/styles.scss";
import App from "./components/app";
import AuthUserContext from "./components/wrappers/AuthUserContext";

render(
    <App/>,
    document.body,
);
