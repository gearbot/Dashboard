import {Component} from "preact";
import {Text} from "preact-i18n";
import {FilterProps} from "../../utils/Interfaces";
import Dropdown from "../Configuration/Dropdown";
import {FILTER_OPTIONS, BLANK_FILTER} from "../../utils/FilterDefinitions";
import FilterRow from "./FilterRow";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

export default class Filter extends Component<FilterProps, {}> {

    set(override): void {
        const {filter, setter} = this.props;
        setter({
            ...filter,
            ...override
        })
    }

    render() {

        const {filter, level, remover} = this.props;
        const {mode, set, subFilters} = filter;
        const assembledSubFilters = [];
        for (let i = 0; i < subFilters.length; i++) {
            const updater = (newSubfilter) => {
                const newSubFilters = [...subFilters];
                newSubFilters[i] = newSubfilter;
                this.set({subFilters: newSubFilters})
            };

            const remover = () => {
                const newSubFilters = [...subFilters];
                newSubFilters.splice(i, 1);
                this.set({subFilters: newSubFilters})
            };

            assembledSubFilters.push(<Filter filter={subFilters[i]} setter={updater} remover={remover}
                                             level={level + 1}/>)
        }

        const assembledSetFilters = [];
        for (let i = 0; i < set.length; i++) {
            const {field, type, value} = set[i];

            const setProp = (prop, v) => {
                const newSet = JSON.parse(JSON.stringify(set));
                newSet[i][prop] = v;
                this.set({set: newSet})
            };

            const remover = () => {
                const newSet = [...set];
                newSet.splice(i, 1);
                this.set({set: newSet})
            };

            assembledSetFilters.push(<FilterRow field={field} type={type} value={value} setter={setProp}
                                                remover={remover}/>);
        }
        return (
            <div class="filter" style={{marginLeft: `${2 * level}em`, position: "relative"}}>
                <div style={{verticalAlign: "center"}}>
                    <Text id={"infractions.mode"}/>
                    <Dropdown options={{
                        AND: <Text id={"infractions.AND"}/>,
                        OR: <Text id={"infractions.OR"}/>
                    }}
                              selected={mode}
                              setter={
                                  (newMode) => {
                                      this.set({mode: newMode})
                                  }}
                    />
                </div>
                {assembledSetFilters}
                <div>
                    <Dropdown options={Object.keys(FILTER_OPTIONS)} selected={null}
                              setter={
                                  (field) => {
                                      this.set({set: [...set, {field: field}]})
                                  }
                              }/>
                </div>

                {assembledSubFilters}

                {level < 3 && subFilters.length < 5 ?
                    <div class="field" style={{marginTop: "1em"}}>
                        <div class="control">
                            <button class="button is-link" onclick={() => {
                                this.set({subFilters: [...subFilters, BLANK_FILTER]})
                            }}><Text id="infractions.add_filter"/></button>
                        </div>
                    </div>
                    : null}
                {remover ?
                    <div onclick={remover} style={{display: "inline-block", cursor: "pointer", margin: "0.75em", position: "absolute", top: 0, right: 0}}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                    : null}
            </div>

        )
    }
}