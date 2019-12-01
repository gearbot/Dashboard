import {Component, createRef, Ref, VNode} from "preact";
import {CarouselProps, CarouselState} from "../../utils/Interfaces";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltLeft, faLongArrowAltRight, faSortDown} from "@fortawesome/free-solid-svg-icons";

export default class Carousel extends Component<CarouselProps, CarouselState> {
    divRef;

    constructor(props, state) {
        super(props, state);
        this.divRef = createRef();
    }

    updateScroll = () => {
        const c = this.divRef.current
        const currentScroll = c.scrollLeft;
        const width = c.children[0].children[0].offsetWidth;
        this.setState({
            leftDisabled: currentScroll == 0,
            rightDisabled: (c.offsetWidth + currentScroll) >= c.scrollWidth
        })
    };


    componentDidMount(): void {
        this.updateScroll();
    }

    moveRight = () => {
        this.divRef.current.scrollBy({left: this.divRef.current.scrollWidth / this.props.items.length, behavior: "smooth"})
    };

    moveLeft = () => {
        this.divRef.current.scrollBy({left: -this.divRef.current.scrollWidth / this.props.items.length, behavior: "smooth"})
    };

    render() {
        const {items, title} = this.props;
        const {leftDisabled, rightDisabled} = this.state;
        return (
            <div class="carousel-outer">
                <div class="carousel-title">
                    {title}
                </div>

                {!leftDisabled || !rightDisabled ?
                    <div class="carousel-buttons">
                        <div class={`button ${leftDisabled ? "disabled": ""}`} onClick={this.moveLeft}><FontAwesomeIcon
                            icon={faSortDown} rotation={90} size={"2x"}/></div>
                        <div class={`button ${rightDisabled ? "disabled": ""}`}  disabled={rightDisabled} onClick={this.moveRight}><FontAwesomeIcon
                            icon={faSortDown} rotation={270} size={"2x"}/>
                        </div>
                    </div>
                    :null
                }
                <div class="carousel-wrapper" >
                    <div class="carousel-inner" ref={this.divRef} onScroll={this.updateScroll}>
                        <div class="carousel">
                            {items}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}