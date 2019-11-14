import {Component} from "preact";
import {CollapsibleCardProps, CollapsibleCardState} from "../../utils/Interfaces";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronCircleUp} from "@fortawesome/free-solid-svg-icons";

export default class CollapsibleCard extends Component<CollapsibleCardProps, CollapsibleCardState> {

    toggle = () => {
        this.setState({expanded: !this.state.expanded})
    }


    render() {
        const {header, body, style} = this.props;
        const {expanded} = this.state;
        return (
            <div class="card mycard sliding" style={style}>
                <div class="card-header" style={expanded ? {padding: "0.3em"} : {padding: "0.3em", borderBottom: "0"}}>
                    {header}
                    {
                        body ?
                            <a onClick={this.toggle} style={{
                                height: "fit-content",
                                paddingTop: "0.3em",
                                right: "0.5em",
                                position: "absolute"
                            }}>
                                <FontAwesomeIcon icon={faChevronCircleUp} rotation={expanded ? 180 : 270}/>
                            </a>
                            : <div/>
                    }
                </div>
                <div class="card-content sliding" style={expanded ? {} : {display: "none"}}>
                    {body}
                </div>
            </div>
        );
    }
}