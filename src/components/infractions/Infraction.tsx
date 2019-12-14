import {Component} from "preact";
import {InfractionProps, InfractionState} from "../../utils/Interfaces";
import UserDisplay from "../main/UserDisplay";
import {Text, translate} from "preact-i18n"
import GearIcon from "../main/GearIcon";
import TimeDisplay from "../main/TimeDisplay";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faChevronDown, faHamburger} from "@fortawesome/free-solid-svg-icons";

const ICONS = {
    kick: "boot",
    unban: "innocent",
    unmute: "innocent",
    forced_ban: "ban",
    tempban: "ban",
    "softban": "ban"
};

const INITIAL_STATE = {
    open: false
};

export default class Infraction extends Component<InfractionProps, InfractionState> {

    constructor(props, state) {
        super(props, state);
        this.state = {...INITIAL_STATE};

    }

    render() {
        const {open} = this.state;
        const {id, user_id, active, start, reason, type, mod_id, guild_id, end} = this.props.infraction;
        const t = type.toLocaleLowerCase().replace(" ", "_");
        const start_parsed = new Date(`${start}+00:00`);
        let end_parsed = undefined;
        let duration = undefined;
        if (end) {
            end_parsed = new Date(`${end}+00:00`);
            duration = end_parsed.getTime() - start_parsed.getTime();
        }
        return (
            <div class="sliding infraction">
                <div class={`infraction-header ${open ? "infraction-header-opened" : ""}`}>
                    <a class="opener" onClick={() => this.setState({open: !open})}>
                        <FontAwesomeIcon icon={open ? faChevronDown : faHamburger}/>
                    </a>
                        <div class="icon">
                            <GearIcon name={ICONS[t] || t} size={1.5}/>
                        </div>
                        <UserDisplay id={mod_id}/> <Text id={`infractions.${t}`}/> <UserDisplay
                        id={user_id}/> {end ? <>(<TimeDisplay time={duration} partLimit={1}/>)</> : null}
                        <div class="reason">
                            {reason}
                        </div>

                </div>
                <div class={`sliding infraction-body ${open ? "infraction-body-opened" : ""}`}>
                    <div class="infraction-body-inner">
                        <div class="infraction-info">
                            <FontAwesomeIcon icon={faArrowRight}/>
                            <div class="detail">
                                <Text id="misc.date"/><span class="detail-value">{start_parsed.toDateString()}</span>
                            </div>
                        </div>

                        <div class="infraction-info">
                            <FontAwesomeIcon icon={faArrowRight}/>
                            <div class="detail">
                                <Text id="misc.time"/><span class="detail-value">{start_parsed.toTimeString()}</span>
                            </div>
                        </div>

                        <div class="infraction-info">
                            <FontAwesomeIcon icon={faArrowRight}/>
                            <div class="detail">
                                <Text id="misc.user_id"/><span class="detail-value">{user_id}</span>
                            </div>
                        </div>

                        <div class="infraction-info">
                            <FontAwesomeIcon icon={faArrowRight}/>
                            <div class="detail">
                                <Text id="misc.mod_id"/><span class="detail-value">{mod_id}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}