import {Component} from "preact";
import {DocsProps, DocsState} from "../utils/Interfaces";
export default class Docs extends Component<DocsProps, DocsState> {

    constructor(props, state) {
        super(props, state);
        const {category, folder, page} = this.props;
        let target = category;
        target = this.assemble(target, folder);
        target = this.assemble(target, page);
        target = target || "index";
        this.state = {
            target: target
        }
    }

    assemble = (old, part) => {
        if (old && part)
            old += "/";
        return old + part;
    };

    componentDidMount(): void {
        const {target} = this.state;
        if (!process.env.PRERENDER) {
            fetch(`/assets/docs/${target}.${localStorage.getItem("LANG")}.md`).then(
                r => {
                    if (r.status == 404)
                        throw "not found";
                    r.text().then(
                        text =>
                            this.setState({content: text})
                    )
                }
            ).catch(
                //probably in dev request on that location
                () => {
                    fetch(`/docs/pages/${target}.md`).then(
                        r => {
                            r.text().then(
                                text =>
                                    this.setState({content: text})
                            )
                        }
                    )
                }
            )
        }
    }

    render() {
        const {content, target} = this.state;
        return (
            <div class={`documentation ${target.replace("/", "_")}`}>
                {process.env.PRERENDER ? require(`../../Docs/pages/${target}.md`).default : content}
            </div>
        )
    }
}