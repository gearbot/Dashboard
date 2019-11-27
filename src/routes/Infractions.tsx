import {Component} from "preact";
import {Text} from 'preact-i18n';
import {InfractionsRouteProps, InfractionsRouteState, Filter as F} from "../utils/Interfaces";
import {useContext} from "preact/hooks";
import {Guild, WS} from "../components/wrappers/Context";
import Loading from "../components/main/Loading";
import Username from "../components/main/Username";
import SortTitle from "../components/infractions/SortTitle";
import Pagination from "../components/navigation/Pagination";
import GearIcon from "../components/main/GearIcon";
import ROUTES from "../utils/routes";
import {areArraysSame} from "../utils/Utils";
import Dropdown from "../components/Configuration/Dropdown";
import Filter from "../components/infractions/Filter";
import {FILTER_TYPES, BLANK_FILTER} from "../utils/FilterDefinitions";


const separators = [
    ["🍇", "🍈", "🍉", "🍊"],
    ["🍋", "🍌", "🍍", "🥭"],
    ["🍎", "🍏", "🍐", "🍑"]
];

const INITIAL_STATE = {
    selected_infraction: null,
    page: 1,
    infraction_list: [],
    infraction_count: 0,
    loading: true,
    filter: BLANK_FILTER,    order_by: ["-id"],
    per_page: 10,
    updating: true,
    validFilter: true
};

export default class Infractions extends Component<InfractionsRouteProps, InfractionsRouteState> {
    unmounting = false;

    constructor(props, state) {
        super(props, state);
        const tempState = {...INITIAL_STATE};

        //load some props from the url if they are present
        if (props.page)
            tempState.page = parseInt(props.page) || 1;

        if (props.order_by)
            tempState.order_by = props.order_by.split("|");

        if (props.per_page)
            tempState.per_page = parseInt(props.per_page) || 10; //TODO: per user defaults?

        if (props.filter)
            tempState.filter = this.unwrapFilter(props.filter);

        this.state = tempState;

        const websocket = useContext(WS);
        const guild = useContext(Guild);
        websocket.subscribe({
            channel: "guild_infractions",
            subkey: guild.id,
            handler: (data) => {
                //TODO: HANDLE NEW INFRACTIONS
            }
        });
        this.updateInfractions();

    }

    componentWillUnmount(): void {
        const websocket = useContext(WS);
        websocket.unsubscribe("guild_infractions");
        this.unmounting = true;

    }

    updateUrl(): void {
        const guild = useContext(Guild);
        let url = ROUTES.GUILD_INFRACTIONS.replace(":gid", guild.id);
        if (this.state.selected_infraction)
            url += `/${this.state.selected_infraction}`;
        history.pushState(history.state, document.title, url + this.getQueryParams())
    }


    urlifyFilter(filter: F, layer = 0): string {
        const {mode, set, subFilters} = filter;
        let out = `${mode}${separators[layer][0]}`;
        for (let i = 0; i < set.length; i++) {
            const {field, type, value} = set[i];
            out += `${field}${separators[layer][1]}${type}${separators[layer][1]}${value}`;
            if (i < set.length-1)
                out += separators[layer][2]
        }
        out += separators[layer][0];
        for (let i = 0; i < subFilters.length; i++) {
            out += `${this.urlifyFilter(subFilters[i], layer + 1)}`;
            if (i < subFilters.length-1)
                out += separators[layer][3]
        }
        return out;
    }

    unwrapFilter(input: string, layer = 0): F {
        const rootParts = input.split(separators[layer][0]);
        const set = [];
        console.log("rootparts", rootParts);
        const rawSets = rootParts[1].split( separators[layer][2]);
        if (rootParts[0] != "AND" && rootParts[0] != "OR")
            return BLANK_FILTER;
        for (let i = 0; i < rawSets.length; i++) {
            const setParts = rawSets[i].split(separators[layer][1]);
            set.push({
                field: setParts[0],
                type: setParts[1],
                value: setParts[2]
            } as const);
        }

        const subfilters = [];
        if (layer < 2 && rootParts[2] != "") {
            const rawFilters = rootParts[2].split(separators[layer][3]);
            for (let i = 0; i < rawFilters.length; i++) {
                subfilters.push(this.unwrapFilter(rawFilters[i], layer + 1))
            }
        }

        return {
            mode: rootParts[0] as "AND" | "OR",
            set: set,
            subFilters: subfilters
        } as const;

    }

    getQueryParams(): string {
        let params = [];
        const {page, order_by, per_page, filter} = this.state;
        if (page != 1)
            params.push(`page=${page}`);
        if (!areArraysSame(order_by, ["-id"]))
            params.push(`order_by=${order_by.join("|")}`);
        if (per_page != 10)
            params.push(`per_page=${per_page}`);
        if (JSON.stringify(filter) != JSON.stringify(BLANK_FILTER))
            params.push(`filter=${this.urlifyFilter(filter)}`);

        return params.length ? `?${params.join("&")}` : "";
    }


    componentDidUpdate(previousProps: Readonly<InfractionsRouteProps>, previousState: Readonly<InfractionsRouteState>, snapshot: any): void {
        const {filter, order_by, page, per_page} = this.state;
        if ((JSON.stringify(filter) != JSON.stringify(previousState.filter) || !areArraysSame(order_by, previousState.order_by) || page != previousState.page || per_page != previousState.per_page) && this.isFilterValid(filter) && !this.unmounting)
            this.updateInfractions()
    }

    isFilterValid(filter: F): boolean {
        for (let i = 0; i < filter.set.length; i++) {
            const s = filter.set[i];
            if (!s.value || !s.field || !s.type)
                return false;
            if (!FILTER_TYPES[s.type].validator(s.value))
                return false
        }
        for (let i = 0; i < filter.subFilters.length; i++) {
            if (!this.isFilterValid(filter.subFilters[i]))
                return false
        }
        return true
    }

    updateInfractions(): void {
        this.updateUrl();
        const {filter, order_by, page, per_page} = this.state;
        const websocket = useContext(WS);
        const guild = useContext(Guild);
        this.setState({updating: true});

        websocket.ask_the_api("infraction_search",
            {
                question: filter,
                guild_id: guild.id,
                order_by: order_by,
                page: page,
                per_page: per_page
            },
            (data) => {
                this.setState({
                    loading: false,
                    updating: false,
                    ...data
                })
            })
    }

    set_sort = (newSort) => {
        this.setState({order_by: newSort});
    };

    setPage = (newPage) => {
        this.setState({page: newPage});
    };

    setPerPage = (value) => {
        this.setState({per_page: parseInt(value), page: 1})
    };

    setFilter = (newFilter) => {
        this.setState({filter: newFilter, validFilter: this.isFilterValid(newFilter), page: 1})
    };


    render() {
        const {loading, infraction_list, order_by, page, infraction_count, per_page, filter, validFilter} = this.state;

        const pages = [];
        for (let p = 1; p <= Math.ceil(infraction_count / per_page); p++) {
            pages.push(p);
        }
        if (loading)
            return <Loading/>;

        const rows = infraction_list.map((i) => (
                <tr>
                    <td>{i.id}</td>
                    <td><Username id={i.user_id}/></td>
                    <td><Username id={i.mod_id}/></td>
                    <td>{i.type}</td>
                    <td>{i.reason}</td>
                    <td>{i.start}</td>
                    <td>{i.end}</td>
                    <td><GearIcon name={i.active ? "yes" : "no"} size={2}/></td>
                </tr>
            )
        );

        const parts = [];

        parts.push(<Filter filter={filter} setter={this.setFilter} level={1}/>);

        if (validFilter)
            if (rows.length == 0)
                if (filter.subFilters.length == 0 && filter.set.length == 0)
                    parts.push(
                        <div style={{verticalAlign: "top", display: "block", textAlign: "center"}}><GearIcon
                            name={"innocent"} size={10}/>
                            <div style={{display: "block"}}><Text id={"infractions.no_infractions"}/></div>
                        </div>
                    );
                else
                    parts.push(
                        <div style={{verticalAlign: "top", display: "block", textAlign: "center"}}><GearIcon
                            name={"search"} size={10}/>
                            <div style={{display: "block"}}><Text id={"infractions.no_results"}/></div>
                        </div>
                    );
            else
                parts.push(
                    <table class="inf_table">
                        <thead>
                        <tr>
                            <th>
                                <SortTitle name="id" sorting={order_by} langPrefix="infractions"
                                           setter={this.set_sort}/>
                            </th>
                            <th>
                                <SortTitle name="user_id" sorting={order_by} langPrefix={"infractions"}
                                           setter={this.set_sort}/></th>
                            <th>
                                <SortTitle name="mod_id" sorting={order_by} langPrefix={"infractions"}
                                           setter={this.set_sort}/></th>
                            <th>
                                <SortTitle name="type" sorting={order_by} langPrefix="infractions"
                                           setter={this.set_sort}/>
                            </th>
                            <th>
                                <SortTitle name="reason" sorting={order_by} langPrefix="infractions"
                                           setter={this.set_sort}/></th>
                            <th>
                                <SortTitle name="start" sorting={order_by} langPrefix="infractions"
                                           setter={this.set_sort}/>
                            </th>
                            <th>
                                <SortTitle name="end" sorting={order_by} langPrefix="infractions"
                                           setter={this.set_sort}/>
                            </th>
                            <th><
                                SortTitle name="active" sorting={order_by} langPrefix="infractions"
                                          setter={this.set_sort}/>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                );
        else
            parts.push(
                <div style={{verticalAlign: "top", display: "block", textAlign: "center"}}><GearIcon
                    name={"search"} size={10}/>
                    <div style={{display: "block"}}><Text id={"infractions.invalid_filter"}/></div>
                </div>
            );

        if (validFilter) {
            if (infraction_count > per_page)
                parts.push(
                    <Pagination page={page} pages={Math.ceil(infraction_count / per_page)}
                                mover={this.setPage}/>
                );
            parts.push(
                <div class={"level"} style={{marginTop: "0.5em"}}>
                    <div class="level-left">
                        <div class="level-item">
                            <Text id="infractions.per_page"/>
                            <Dropdown options={[10, 20, 30, 40, 50]} selected={per_page}
                                      setter={this.setPerPage} direction="UP"/>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <Text id="infractions.to_page"/>
                            <Dropdown options={pages} selected={page} setter={this.setPage}
                                      direction="UP"/>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <>
                {parts}
            </>
        );
    }
}