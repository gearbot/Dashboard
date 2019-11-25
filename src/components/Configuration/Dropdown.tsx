import {Component} from "preact";
import {DropdownProps, DropdownState} from "../../utils/Interfaces";
import {Text} from "preact-i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import OutsideAlerter from "../wrappers/OutsideAlerter";

export default class Dropdown extends Component<DropdownProps, DropdownState> {
    mounted = true;

    constructor(state, props){
        super(state, props)
    }


    componentWillUnmount(): void {
        this.mounted = false
    }

    render() {
        const {options, selected, setter, direction} = this.props;

        const assembled = [];
        if (Array.isArray(options)) {
            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                assembled.push(<a onclick={() => setter(option)}
                                  class={`dropdown-item ${option == selected ? "is-active" : ""}`}>{option}</a>)
            }
        } else {
            for (let option in options) {
                assembled.push(<a onclick={() => setter(option)}
                                  class={`dropdown-item ${option == selected ? "is-active" : ""}`}>{options[option]}</a>)
            }

        }
        return (
            <OutsideAlerter clicker={() => this.setState({open: false})}>
                <div class={`dropdown ${this.state.open ? 'is-active' : ""} ${direction == "UP" ? "is-up" : ""}`} style={{marginLeft: "0.5em", marginRight: "0.5em", marginBottom: "0.2em"}} onclick={() => this.mounted && this.setState({open: !this.state.open})}>
                    <div class="dropdown-trigger">
                        <button class="button" aria-haspopup="true" aria-controls="mydropdown">
                            <span>{selected? selected : <Text id={"misc.select_option"}/>}</span>
                            <span class="icon is-small">
                                <FontAwesomeIcon icon={faAngleDown}/>
                        </span>
                        </button>
                    </div>
                    <div class="dropdown-menu" id="mydropdown" role="menu">
                        <div class="dropdown-content" style={{overflowY: "auto", maxHeight: "25vh"}}>
                            {assembled}
                        </div>
                    </div>
                </div>
            </OutsideAlerter>
        )
    }

}