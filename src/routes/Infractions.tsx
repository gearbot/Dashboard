import {Component} from "preact";
import {Text} from 'preact-i18n';
import {InfractionsRouteProps, InfractionsRouteState} from "../utils/Interfaces";
import {useContext} from "preact/hooks";
import {Guild, WS} from "../components/wrappers/Context";
import Loading from "../components/main/Loading";
import InfractionTable from "../components/infractions/InfractionTable";
import Username from "../components/main/Username";
import SortTitle from "../components/infractions/SortTitle";

const INITIAL_STATE = {
    selected_infraction: null,
    pages: 1,
    new_filter: "",
    infraction_list: [],
    loading: true,
    current_filter: null,
    order_by: ["-id"]
};

export default class Infractions extends Component<InfractionsRouteProps, InfractionsRouteState> {

    constructor(props, state) {
        super(props, state);
        this.state = {...INITIAL_STATE, new_filter: this.props.filter};
        //TODO: load sort order from props
        const websocket = useContext(WS);
        const guild = useContext(Guild);
        websocket.subscribe({
            channel: "guild_infractions",
            subkey: guild.id,
            handler: (data) => {
            }
        });
        this.updateInfractions();

    }

    componentWillUnmount(): void {
        const websocket = useContext(WS);
        websocket.unsubscribe("guild_infractions")
    }


    // shouldComponentUpdate(nextProps: Readonly<InfractionsRouteProps>, nextState: Readonly<InfractionsRouteState>, nextContext: any): boolean {
    //     return this.state != nextState || nextContext;
    // }

    updateInfractions(): void {
        const websocket = useContext(WS);
        const guild = useContext(Guild);
        websocket.ask_the_api("infraction_search",
            {
                question: this.state.current_filter,
                guild_id: guild.id,
                order_by: this.state.order_by
            },
            (data) => {
                this.setState({
                    loading: false,
                    ...data
                })
            })
    }

    set_sort = (new_sort) => {
        this.setState({order_by: new_sort});
        this.updateInfractions();
    };


    render() {
        const {loading, infraction_list, order_by} = this.state;
        if (loading)
            return (<Loading/>);
        const rows = infraction_list.map((i) => (
                <tr>
                    <td>{i.id}</td>
                    <td><Username id={i.user_id}/></td>
                    <td><Username id={i.mod_id}/></td>
                    <td>{i.type}</td>
                    <td>{i.reason}</td>
                    <td>{i.start}</td>
                    <td>{i.end}</td>
                    <td>{i.active}</td>
                </tr>
            )
        );

        return (
                <>
                    {/*<InfractionTable infractions={infraction_list} />*/}
                    <table class="inf_table">
                        <thead>
                        <tr>
                            <th><SortTitle name="id" sorting={order_by} langPrefix="infractions" setter={this.set_sort}/></th>
                            <th><SortTitle name="user_id" sorting={order_by} langPrefix={"infractions"} setter={this.set_sort}/></th>
                            <th><SortTitle name="mod_id" sorting={order_by} langPrefix={"infractions"} setter={this.set_sort}/></th>
                            <th><SortTitle name="type" sorting={order_by} langPrefix="infractions" setter={this.set_sort}/></th>
                            <th><SortTitle name="reason" sorting={order_by} langPrefix="infractions" setter={this.set_sort}/></th>
                            <th><SortTitle name="start" sorting={order_by} langPrefix="infractions" setter={this.set_sort}/></th>
                            <th><SortTitle name="end" sorting={order_by} langPrefix="infractions" setter={this.set_sort}/></th>
                            <th><SortTitle name="active" sorting={order_by} langPrefix="infractions" setter={this.set_sort}/></th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                </>
        );
    }
}