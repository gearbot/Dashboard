import {Component} from "preact";
import { Text } from 'preact-i18n';

export default class Home extends Component<{}, {}> {

    render() {
        return (
            <Text id="home.content" />
        );
    }
}