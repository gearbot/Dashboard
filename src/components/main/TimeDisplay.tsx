import {Component} from "preact";
import {TimeDisplayProps} from "../../utils/Interfaces";
import {Text} from "preact-i18n";

export default class TimeDisplay extends Component<TimeDisplayProps, {}>{

    render() {
        const {time, partLimit} = this.props;
        let total = Math.floor(time / 1000);
        const days = Math.floor(total / (60 * 60 * 24));
        total = total % (60 * 60 * 24);
        const hours = Math.floor(total / (60 * 60));
        total = total % (60 * 60);
        const minutes = Math.floor(total / 60);
        const seconds = total % 60;
        let parts = [];
        if (days)
            parts.push(<div class="timePart"><Text id="misc.days" plural={days} fields={{count: days}}/></div>);
        if (hours)
            parts.push(<div class="timePart"><Text id="misc.hours" plural={hours} fields={{count: hours}}/></div>);
        if (minutes)
            parts.push(<div class="timePart"><Text id="misc.minutes" plural={minutes} fields={{count: minutes}}/></div>);
        if (seconds)
            parts.push(<div class="timePart"><Text id="misc.seconds" plural={seconds} fields={{count: seconds}}/></div>);
        if (partLimit)
            parts = parts.slice(0, partLimit);
        return <div class="timeDisplay">{parts}</div>;
    }
}