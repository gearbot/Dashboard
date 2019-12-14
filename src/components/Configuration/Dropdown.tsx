import {Component} from "preact";
import {DropdownProps, DropdownState} from "../../utils/Interfaces";
import {Text} from "preact-i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import OutsideAlerter from "../wrappers/OutsideAlerter";

export default class Dropdown extends Component<DropdownProps, DropdownState> {
    mounted = true;

    componentWillUnmount(): void {
        this.mounted = false
    }

    render() {
        const {options, selected, setter, direction} = this.props;

        const assembled = [];
        if (Array.isArray(options)) {
            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                assembled.push(<a onClick={() => setter(option)}
                                  class={`dropdown-item ${option == selected ? "is-active" : ""}`}>{option}</a>)
            }
        } else {
            for (let option in options) {
                assembled.push(<a onClick={() => setter(option)}
                                  class={`dropdown-item ${option == selected ? "is-active" : ""}`}>{options[option]}</a>)
            }

        }
        return (
            <OutsideAlerter clicker={() => this.setState({open: false})}>
                <div class={`dropdown ${this.state.open ? 'is-open' : ""} ${direction == "UP" ? "is-up" : ""}`}
                     onClick={() => this.mounted && this.setState({open: !this.state.open})}>
                    <div class="dropdown-top">
                        <div class="dropdown-selected">{selected ? selected : <Text id={"misc.select_option"}/>}</div>
                        <div class="dropdown-icon">
                            <FontAwesomeIcon icon={faAngleDown}/>
                        </div>
                    </div>

                    <div class="dropdown-menu">
                        <div class="dropdown-content">
                            <div class="dropdown-wrapper">
                                {assembled}
                            </div>
                        </div>
                    </div>
                </div>
            </OutsideAlerter>
        )
    }

}