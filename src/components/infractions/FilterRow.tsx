import {Component} from "preact";
import {FilterRowProps} from "../../utils/Interfaces";
import Dropdown from "../main/Dropdown";
import {FILTER_OPTIONS, FILTER_TYPES} from "../../utils/FilterDefinitions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

export default class FilterRow extends Component<FilterRowProps, {}> {

    render() {
        const {field, type, value, setter, remover} = this.props;
        const fieldsetter = newField => {
            const override = {
                "field": newField
            };
            console.log("index", FILTER_OPTIONS[field].indexOf(type));
            if (FILTER_OPTIONS[newField].indexOf(type) == -1) {
                override["type"] = undefined;
                override["value"] = undefined
            }
            setter(override)
        };
        const C = type ? FILTER_TYPES[type].Component : undefined;
        return (
            <div style={{display: "block"}}>


                <Dropdown options={Object.keys(FILTER_OPTIONS)} selected={field}
                          setter={fieldsetter}/>
                <Dropdown options={FILTER_OPTIONS[field]} selected={type}
                          setter={newType => setter({type: newType})}/>
                {
                    type ?
                        <C setter={v => setter({value: v})} validator={FILTER_TYPES[type].validator} value={value}/>
                        : null
                }
                <div onclick={remover} style={{display: "inline-block", cursor: "pointer"}}>
                    <span style={{margin: "0.75em"}}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </div>

            </div>
        );
    }
}