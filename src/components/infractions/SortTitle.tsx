import {Component} from "preact";
import {SortTitleProps} from "../../utils/Interfaces";
import {Text} from 'preact-i18n';
import {removeFromArray} from "../../utils/Utils";
import GearIcon from "../main/GearIcon";

export default class SortTitle extends Component<SortTitleProps, {}> {

    toggleSort = () => {
        const {sorting, name, setter} = this.props;
        switch (this.getCurrentSort()) {
            case -1:
                const index = sorting.indexOf(`-${name}`);
                sorting[index] = (name);
                break;
            case 0:
                sorting.push(`-${name}`);
                break;
            case 1:
                removeFromArray(sorting, name);
                break;

        }
        setter(sorting);
    }

    getCurrentSort(): number {
        const {sorting, name} = this.props;
        if (sorting.indexOf(name) == -1)
            return (sorting.indexOf(`-${name}`) == -1) ? 0 : -1;
        return 1
    }

    render() {
        const {langPrefix, name, sorting} = this.props;
        const direction = this.getCurrentSort();
        return (
            <div onclick={this.toggleSort}>
                <Text id={`${langPrefix}.${name}`}/>
                {direction != 0 ?
                    <> ({sorting.indexOf(`${direction == 1? "": "-"}${name}`) + 1}
                        <GearIcon name={direction == 1 ? "Up" : "Down"}/>)
                    </>
                    : null}
            </div>
        )
    }
}