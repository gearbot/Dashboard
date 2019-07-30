import {Component} from "preact";
import {LogChannelProps} from "../../utils/Interfaces";
import ChannelSelector from "./ChannelSelector";
import LogCategory from "./LogCategory";
import CollapsibleCard from "../main/CollapsibleCard";

export default class LogChannel extends Component<LogChannelProps, {}> {

    channel_setter = (channel) => {
        const i = this.props.info;
        i.channel = channel;
        this.props.infoSetter(i);
    };

    render() {
        return (
            <CollapsibleCard
                header={
                    <div style={{margin: "auto"}}>
                        <ChannelSelector selectedChannels={this.props.selectedChannels}
                                         disabled={this.props.disabled} setter={this.channel_setter}
                                         selected={this.props.info.channel} remover={this.props.remover} requirement="can_log"/>
                    </div>
                }
                body={
                    <LogCategory info={this.props.info} channel={this.props.info.channel}
                                 infoSetter={this.props.infoSetter} index={this.props.index}/>
                }
            />
        );
    }
}