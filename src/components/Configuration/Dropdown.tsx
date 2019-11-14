import {Component} from "preact";
import {DropdownProps} from "../../utils/Interfaces";
import {useState} from "preact/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";

export default class Dropdown extends Component<DropdownProps, {}> {

    render() {
        const {options, selected, setter} = this.props;
        const assembled = [];
        if (Array.isArray(options)) {
            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                assembled.push(<a onclick={() => setter(option)}
                                  class={`dropdown-item ${option == selected ? "is-active" : ""}`}>{option}</a>)
            }
        } else {
            for (let option in options) {
                assembled.push(<a onclick={() => setter(options[option])}
                                  class={`dropdown-item ${options[option] == selected ? "is-active" : ""}`}>{option}</a>)
            }

        }
        return (
                <div class={`dropdown is-hoverable is-up`}>
                    <div class="dropdown-trigger">
                        <button class="button" aria-haspopup="true" aria-controls="mydropdown">
                            <span>{selected}</span>
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
        )
    }

}