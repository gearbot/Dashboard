import {Component} from "preact";
import {FilterRowProps} from "../../utils/Interfaces";
import Dropdown from "../Configuration/Dropdown";
import {FILTER_OPTIONS, FILTER_TYPES} from "../../utils/FilterDefinitions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

export default class FilterRow extends Component<FilterRowProps, {}> {

    render() {
        const {field, type, value, setter, remover} = this.props;
        return (
            <div style={{display: "block"}}>
                <Dropdown options={Object.keys(FILTER_OPTIONS)} selected={field}
                          setter={newField => setter("field", newField)}/>
                <Dropdown options={FILTER_OPTIONS[field]} selected={type}
                          setter={newType => setter("type", newType)}/>
                {
                    type ?
                        <input value={value} type={FILTER_TYPES[type].type}
                               onchange={e => setter("value", e.target.value)}
                               class={`input small-input ${FILTER_TYPES[type].validator(value) ? "is-success" : "is-danger"}`}/>
                        : null}
                <div onclick={remover} style={{display: "inline-block", cursor: "pointer"}}>
                    <span style={{margin: "0.75em"}}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </div>

            </div>
        );
    }
}