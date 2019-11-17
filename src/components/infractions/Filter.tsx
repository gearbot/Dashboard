import {Component} from "preact";
import {Text} from "preact-i18n";
import {FilterProps} from "../../utils/Interfaces";
import Dropdown from "../Configuration/Dropdown";
import {FILTER_OPTIONS, FILTER_TYPES} from "../../utils/FilterDefinitions";
import FilterRow from "./FilterRow";

export default class Filter extends Component<FilterProps, {}> {

    set(override): void {
        const {filter, setter} = this.props;
        setter({
            ...filter,
            ...override
        })
    }

    render() {

        const {filter, setter} = this.props;
        const {mode, set, subFilters} = filter;
        console.log(set);

        const assembledSubFilters = [];
        for (let i = 0; i < subFilters.length; i++) {
            const updater = (newSubfilter) => {
                const newSubFilters = [...subFilters];
                newSubfilter[i] = newSubfilter;
                this.set({subFilters: newSubFilters})
            };
            assembledSubFilters.push(<Filter filter={subFilters[i]} setter={updater}/>)
        }

        const assembledSetFilters = [];
        for (let i = 0; i < set.length; i++) {
            const {field, type, value} = set[i];

            const setProp = (prop, v) => {
                const newSet = [...set];
                newSet[i][prop] = v;
                this.set({set: newSet})
            };

            const remover = () => {
                const newSet = [...set];
                newSet.splice(i, 1);
                this.set({set: newSet})
            };

            assembledSetFilters.push(<FilterRow field={field} type={type} value={value} setter={setProp} remover={remover}/>);
        }
        return (
            <div class="filter">
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
            </div>
        )
    }
}