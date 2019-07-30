import {Component} from "preact";
import {LogCategoryProps} from "../../utils/Interfaces";
import {useContext} from "preact/hooks";
import {GeneralInfo} from "../wrappers/Context";
import {removeFromArray} from "../../utils/Utils";
import {Text} from 'preact-i18n';
import CollapsibleCard from "../main/CollapsibleCard";

export default class LogCategory extends Component<LogCategoryProps, {}> {


    cat_switcher = (e) => {
        const i = this.props.info;
        if (e.target.checked)
            i.CATEGORIES.push(e.target.name);
        else
            removeFromArray(i.CATEGORIES, e.target.name);

        const loggingInfo = useContext(GeneralInfo).logging;
        for (let l in loggingInfo[e.target.name]) {
            removeFromArray(i.DISABLED_KEYS, loggingInfo[e.target.name][l]);
        }

        this.props.infoSetter(i);
    };

    key_switcher = (e) => {
        const i = this.props.info;
        const subkey = e.target.getAttribute("data-subkey");
        const cat = e.target.getAttribute("data-category");
        if (e.target.checked) {
            //check if the category was enabled, if not enable it and disable all other keys so only this one is active
            if (i.CATEGORIES.indexOf(cat) > -1)
                removeFromArray(i.DISABLED_KEYS, subkey);
            else {
                i.CATEGORIES.push(cat);
                const loggingInfo = useContext(GeneralInfo).logging;
                for (let index in loggingInfo[cat]) {
                    const key = loggingInfo[cat][index];
                    if (key != subkey)
                        i.DISABLED_KEYS.push(key)
                }
            }
        } else {
            const loggingInfo = useContext(GeneralInfo).logging;
            // disable this one
            i.DISABLED_KEYS.push(subkey);
            //disable category if all keys are disabled
            let allDisabled = true;
            for (let index in loggingInfo[cat]) {
                const key = loggingInfo[cat][index];
                if (i.DISABLED_KEYS.indexOf(key) === -1) {
                    allDisabled = false;
                    break
                }
            }

            if (allDisabled) {
                removeFromArray(i.CATEGORIES, cat);
                for (let index in loggingInfo[cat]) {
                    removeFromArray(i.DISABLED_KEYS, loggingInfo[cat][index]);
                }
            }
        }
        this.props.infoSetter(i);

    };


    render() {
        const loggingInfo = useContext(GeneralInfo).logging;
        const assembled = [];
        const info = this.props.info;
        for (let i in loggingInfo) {
            const inner = [];
            for (let ii in loggingInfo[i]) {
                const name = loggingInfo[i][ii];
                inner.push(
                    <div class="field">
                        <input id={`${i}_${name}_${this.props.index}`} type="checkbox" data-subkey={name} data-category={i} class="switch"
                               checked={info.CATEGORIES.indexOf(i) > -1 && info.DISABLED_KEYS.indexOf(name) === -1}
                               onclick={this.key_switcher}/>
                        <label for={`${i}_${name}_${this.props.index}`}>
                            <Text
                                id={`config.log_channels.${i.toLowerCase()}.${name.toLocaleLowerCase()}`}>{`config.log_channels.${i.toLowerCase()}.${name.toLocaleLowerCase()}`}</Text>
                        </label>
                    </div>
                )
            }

            const active = this.props.info.CATEGORIES.indexOf(i) > -1;
            assembled.push(
                <div style={{display: "flex", alignItems: "center"}}>
                <CollapsibleCard
                    header={
                        <div class="field" style={{margin: "0.5em", marginRight: "2em"}}>
                            <input id={`${i}_${this.props.index}`} type="checkbox" name={i} class="switch"
                                   checked={active} onclick={this.cat_switcher}/>
                            <label for={`${i}_${this.props.index}`}><Text id={`config.log_channels.${i.toLowerCase()}.category`}/></label>
                        </div>
                    }
                    body={
                        Object.keys(inner).length > 0 ? inner : false
                    }

                    style={{width: "100%"}}
                />
                </div>
            )
        }

        return (
            <div class="cardgridlogs cardgrid">
                {assembled}
            </div>
        );


    }
}