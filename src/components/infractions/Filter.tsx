import {Component} from "preact";
import {Text} from "preact-i18n";
import {FilterProps} from "../../utils/Interfaces";
import Dropdown from "../main/Dropdown";
import {FILTER_OPTIONS, BLANK_FILTER} from "../../utils/FilterDefinitions";
import FilterRow from "./FilterRow";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import "../../style/infractions/filter.scss"

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

            const setProp = (override) => {
                const newSet = JSON.parse(JSON.stringify(set));
                newSet[i] = {...newSet[i], ...override};
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
            <div class="filter" style={{paddingLeft: `${2 * level}em`, position: "relative"}}>
                <div style={{verticalAlign: "center"}}>
                    {set.length + subFilters.length >= 2 ?
                        <>
                            <Text id={"infractions.mode"}/>
                            <Dropdown
                                options={{
                                    AND: <Text id={"infractions.AND"}/>,
                                    OR: <Text id={"infractions.OR"}/>
                                }}
                                selected={mode}
                                setter={
                                    (newMode) => {
                                        this.set({mode: newMode})
                                    }}
                            />
                        </> : null
                    }
                </div>
                {assembledSetFilters}
                {
                    set.length < 5 ?
                        <div>
                            <Dropdown options={Object.keys(FILTER_OPTIONS)} selected={null}
                                      setter={
                                          (field) => {
                                              this.set({set: [...set, {field: field}]})
                                          }
                                      }/>
                        </div>
                        : null
                }

                {assembledSubFilters}

                {level < 3 && subFilters.length < 5 ?
                    <div class="field" style={{marginTop: "1em"}}>
                        <div class="control">
                            <div class="filter-button" onClick={() => {
                                this.set({subFilters: [...subFilters, BLANK_FILTER]})
                            }}><Text id="infractions.add_filter"/></div>
                        </div>
                    </div>
                    : null}
                {remover ?
                    <div style={{
                        display: "inline-block",
                        margin: "0.75em",
                        position: "absolute",
                        top: 0,
                        right: 0
                    }}>
                        <span onClick={remover} style={{cursor: "pointer"}}>
                        <FontAwesomeIcon icon={faTimes}/>
                        </span>
                    </div>
                    : null}
            </div>

        )
    }
}