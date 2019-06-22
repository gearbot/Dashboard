import {Component} from "preact";
import {RangedIntComponentProps} from "../../utils/Interfaces";
export default class RangedIntField extends Component<RangedIntComponentProps, {}> {

    constructor(props, state) {
        super(props, state);
    }



    render() {
        const {value, setter, name, info, changed, api_name, min, max} = this.props;
        const error = value > max ? `This value can not be greater then ${max}` : value < min ? `This value can not be smaller then ${min}` : true;
        const valid = error === true;
        const c = "input " +( changed ? (valid ? "is-success" : "is-danger") : "");
        return (
            <div class="field">
                <label class="label">{name}</label>
                <div class="control">
                    <input class={c} type="number" step={1} value={value} onchange={(event) => setter(api_name, event.target.value)} title={info}/>
                </div>
                <p class="help is-danger">{valid ? " " : error}</p>
            </div>

        );
    }
}