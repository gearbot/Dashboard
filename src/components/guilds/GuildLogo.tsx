import {Component} from "preact";
import {GuildLogoProps} from "../../utils/Interfaces";
import {useContext} from "preact/hooks";
import {Guild} from "../wrappers/Context";

export default class GuildLogo extends Component<GuildLogoProps, {}> {

    render() {
        const {guild_info, size} = this.props;
        const style = {
            width: `${size}em`,
            height: `${size}em`,
        };
        const gi = guild_info || useContext(Guild);
        if (!gi)
            return null;
        const animated = gi.icon && gi.icon.startsWith("a_");
        const icon_url = `https://cdn.discordapp.com/icons/${gi.id}/${gi.icon}.${animated ? "gif" : "png"}?size=256`;

        return (
            <div class="guild-icon" style={style}>
                {gi.icon ?
                    <img src={icon_url} style={style}/>
                    :
                    <div class="servericon-alt" style={{lineHeight: `${size}em`}}>
                        {gi.name.split(" ").map(s => s[0]).join("").substr(0, Math.floor(size))}
                    </div>
                }
            </div>
        );
    }
}