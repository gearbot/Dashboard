import {Component} from "preact";
import {Channel, ChannelSelectorProps} from "../../utils/Interfaces";
import {useContext} from "preact/hooks";
import {Guild} from "../wrappers/Context";
import {Text} from "preact-i18n"

export default class ChannelSelector extends Component<ChannelSelectorProps, {}> {

    render() {
        const {selected, selectedChannels, setter, disabled, remover, requirement} = this.props;
        const guild = useContext(Guild);
        const assembed = selected ? [] : [<option value={0}><Text id={"config.parts.select_channel"}/></option>];
        for (let channel_id in guild.text_channels) {
            const channel: Channel = guild.text_channels[channel_id];
            assembed.push(<option value={channel_id} selected={channel_id == selected}
                                  disabled={(selectedChannels.indexOf(channel_id) > -1 && channel_id != selected) || (!requirement || !channel[requirement])}>{channel.name}</option>)
        }

        for (let channel_id in guild.additional_text_channels) {
            const channel: Channel = guild.additional_text_channels[channel_id];
            assembed.push(<option value={channel_id} selected={channel_id == selected}
                                  disabled={(selectedChannels.indexOf(channel_id) > -1 && channel_id != selected) || (!requirement || !channel[requirement])}>{channel.name}</option>)
        }

        const deleter = (e) => {
            e.preventDefault();
            remover();
        };

        return (
            <div class="field is-grouped">
                <label class="label">{name}</label>
                <div class="select">
                    <select disabled={disabled} onChange={(e) => setter(e.target.value)}>
                        {assembed}
                    </select>
                </div>
                {remover ?
                    <div class="control">
                        <button class="button is-danger" onClick={deleter}>
                            <Text id="config.parts.delete"/>
                        </button>
                    </div> : <div/>}
            </div>

        );
    }
}