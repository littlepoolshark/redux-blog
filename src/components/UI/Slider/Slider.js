//@flow
import React, { Component, PropTypes } from 'react';
import Hammer from 'hammerjs';
import './Slider.scss';

const SCREENWIDTH: number = window.screen.width;
let timer=null;

class Slider extends Component {
    props: {
        defaultIndex: number,
        durationTime: string,
        isAutoPlay: boolean,
        iShowDot: boolean
    }

    static defaultProps = {
        defaultIndex: 1,
        durationTime: "0.5s",
        isAutoPlay: true,
        iShowDot: false
    }

    state: {
        activeIndex: number,
        isAnimating: boolean
    }

    constructor(props: Object) {
        super(props);
        this.state = {
            activeIndex: props.defaultIndex || 1,
            isAnimating: false
        };
    }

    _goPrev() {
        this._enableAnimation();
        this.setState((prevState, prevProps) => {
            return {
                activeIndex: prevState.activeIndex - 1,
                isAnimating: true
            }
        });
    }

    _goNext() {
        this._enableAnimation();
        this.setState((prevState, prevProps) => {
            return {
                activeIndex: prevState.activeIndex + 1,
                isAnimating: true
            }
        });
    }

    _autoPlay() {
        this.timer = setInterval(() => {
            this._goNext();
        }, 4000);
    }

    _enableAnimation() {
        let className: string = this.refs.sliderWrapper.className;
        if (className.indexOf("animate") === -1) {
            this.refs.sliderWrapper.className += " animate";
        };
    }

    _disableAnimation() {
        let className: string = this.refs.sliderWrapper.className;
        if (className.indexOf("animate") > -1) {
            this.refs.sliderWrapper.className = className.replace('animate', '').trim();
        };
    }

    _recover() {
        let nextTranslateX = this.state.activeIndex * (-SCREENWIDTH);
        this._setTranslateXTo(nextTranslateX);
    }

    _handleTransitionEnd() {
        this._disableAnimation();

        if (this.state.activeIndex === 0) {
            this.setState({
                activeIndex: 4
            }, () => {
                this.setState({
                    isAnimating: false
                }, () => {
                    console.log("into first if");
                    if (!this.timer && this.props.isAutoPlay) {
                        this._autoPlay();
                    }
                })
            });
        } else if (this.state.activeIndex === 5) {
            this.setState({
                activeIndex: 1
            }, () => {
                this.setState({
                    isAnimating: false
                }, () => {
                    console.log("into second if");
                    if (!this.timer && this.props.isAutoPlay) {
                        this._autoPlay();
                    }
                })
            });
        } else {
            this.setState({
                isAnimating: false
            }, () => {
                console.log("into third if");
                console.log('this.timer:',this.timer)
                if (!this.timer && this.props.isAutoPlay) {
                    this._autoPlay();
                }
            });
        }
    }

    _getCurrentTranslateX(): number {
        let transfromStr: string = this.refs.sliderWrapper.style.transform;
        let indexOfLeftBrace: number = transfromStr.indexOf("(");
        let prevTranslateX: number = parseInt(transfromStr.slice(indexOfLeftBrace + 1, -1).split(",")[0]);

        return prevTranslateX;
    }

    _setTranslateXTo(translateX: number) {
        this.refs.sliderWrapper.style.transform = `translate3d(${translateX}px,0,0)`
    }

    render() {

        let transformX = this.state.activeIndex * (-SCREENWIDTH);
        let sliderWrapperStyle = {
            transform: `translate3d(${transformX}px,0,0)`
        };

        return (
            <div className="slider-container" >
                <ul
                    className="slider-wrapper"
                    ref="sliderWrapper"
                    style={sliderWrapperStyle}
                    onTransitionEnd={(e) => { this._handleTransitionEnd() }}
                >
                    <li>4</li>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>1</li>
                </ul>
            </div>
        );
    }

    componentDidMount() {
        const itemsCount = 6;
        this.refs.sliderWrapper.style.width = SCREENWIDTH * itemsCount + "px";
        let lis = this.refs.sliderWrapper.getElementsByTagName("li");
        Array.prototype.map.call(lis, (ele, index) => {
            ele.style.width = SCREENWIDTH + "px";
        })

        if(this.props.isAutoPlay){
            this._autoPlay();
        }
        
        this.hammertime = new Hammer(this.refs.sliderWrapper);
        this.hammertime.get('pan').set({ threshold: 10, direction: Hammer.DIRECTION_HORIZONTAL });

        this.hammertime.on("panstart", (e: Object) => {
            if (this.state.isAnimating) return;
            if (timer) {
                
                clearInterval(timer);
                console.log('timer:',this.timer)
            };
            this._disableAnimation();
            let prevTranslateX: number = this._getCurrentTranslateX();
            this.currTranslateX = prevTranslateX + e.deltaX;
        });
        this.hammertime.on("panmove", (e) => {
            if (this.state.isAnimating) return;
            let nextTranslateX: number = this.currTranslateX + e.deltaX;
            this._setTranslateXTo(nextTranslateX);
        });

        this.hammertime.on("panend pancancel", (e: Object) => {
            if (this.state.isAnimating) return;
            this._enableAnimation();
            let precent: number = (Math.abs(this._getCurrentTranslateX() - this.currTranslateX) + 10) * 100 / SCREENWIDTH;

            if (e.deltaX < 0) {
                if (precent > 20) {
                    this._goNext();
                } else {
                    this._recover();
                }
            } else {
                if (precent > 20) {
                    this._goPrev();
                } else {
                    this._recover();
                }
            }
        });

    }

    componentWillUnmount() {
        this.hammertime = null;
        this.currTranslateX = null;
        this.timer && clearInterval(this.timer);
    }
}


export default Slider;