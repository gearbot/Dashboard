import {Component} from "preact";
import {DropdownProps} from "../../utils/Interfaces";

export default class Dropdown extends Component<DropdownProps, {}> {

    render() {
        const {options, selected, setter} = this.props;
        const assembled = [];
        for (let option in options) {
            assembled.push(<option value={options[option]} selected={selected == option}>{option}</option>)
        }
        return (
            <select onchange={(event) => {setter(event.target.value)}}>
                {assembled}
            </select>
        )
    }

}