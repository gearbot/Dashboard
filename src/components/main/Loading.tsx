import {Component} from "preact";
import "../../style/main/loading.scss"

export default class Loading extends Component<{}, {}> {


    render() {
        return (
            <div class="loadingcontainer">
                <div class="loading">
                    <img src="/assets/gear.png" class="gear"/>
                    <div class="loadingtext">
                        LOADING..
                    </div>
                </div>
            </div>
        );
    }
}