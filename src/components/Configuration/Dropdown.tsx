import {Component} from "preact";
import {DropdownProps} from "../../utils/Interfaces";
import {useState} from "preact/hooks";

export default class Dropdown extends Component<DropdownProps, {}> {

    render() {
        const {options, selected, setter} = this.props;
        const assembled = [];
        for (let option in options) {
            assembled.push(<a onclick={() => setter(options[option])}
                              class={`dropdown-item ${options[option] == selected ? "is-active" : ""}`}>{option}</a>)
        }
        return (
            <>
                <div class={`dropdown is-hoverable is-up`}>
                    <div class="dropdown-trigger">
                        <button class="button" aria-haspopup="true" aria-controls="mydropdown">
                            <span>{selected}</span>
                            <span class="icon is-small">
                            <i class="fas fa-angle-down" aria-hidden="true"/>
                        </span>
                        </button>
                    </div>
                    <div class="dropdown-menu" id="mydropdown" role="menu">
                        <div class="dropdown-content">
                            {assembled}
                        </div>
                    </div>
                </div>
            </>


    //<select onchange={(event) => {setter(event.target.value)}}>
            // {assembled}
            // </select>
    )
    }

    }