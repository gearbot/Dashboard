import {Component} from "preact";
import {FilterRowFieldProps} from "../../utils/Interfaces";
import {FILTER_TYPES} from "../../utils/FilterDefinitions";

export default class NumberFilter extends Component<FilterRowFieldProps, {}> {
    render() {
        const {value, validator, setter} = this.props;
        return (
            <input value={value} type="text"
                   onchange={e => setter(e.target.value)}
                   class={`input small-input ${validator(value) ? "is-success" : "is-danger"}`}/>
        )
    }
}