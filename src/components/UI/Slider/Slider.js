import React, { Component, PropTypes } from 'react';
import Hammer from 'react-hammerjs';
import Gestures from 'gestures';
import './Slider.scss';

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1,
            direction: "next",
            scrollable: false
        };
    }
    _next() {
        this.setState((prevState, props) => {
            return {
                index: prevState.index + 1,
                direction: "next"
            }
        })
    }

    _prev() {
        this.setState((prevState, props) => {
            return {
                index: prevState.index - 1,
                direction: "prev"
            }
        })
    }

    _handleTransitionEnd() {
        let {
         index,
            direction
     } = this.state;

        if (direction === "prev" && index === 0) {
            this.setState({
                index: 4
            })
        }
        if (direction === "next" && index === 5) {
            this.setState({
                index: 1
            })
        }
    }

    _enableScroll() {
        this.setState({
            scrollable:true
        })
    }

    _handleSwipe(e){
        if(e.deltaX > 0){
            this._prev();
        }else {
            this._next();
        }
    }

    render() {
        let transformX = -this.state.index * (100 / 6) + "%";
        let sliderWrapperStyle = {
            transform: `translate3d(${transformX},0,0)`
        };
        if (this.state.direction === "prev") {
            if (this.state.index !== 4) {
                sliderWrapperStyle.transitionDuration = "0.5s";
            }
        }

        if (this.state.direction === "next") {
            if (this.state.index !== 1) {
                sliderWrapperStyle.transitionDuration = "0.5s";
            }
        }

                // onTouchEndCapture={() => { this._prev() }} 
                // onTouchMoveCapture={(e) => { this._enableScroll() }} 


        return (
            <Hammer onSwipe={ (e) => { this._handleSwipe(e) }}>    
            <div  className="slider-container" >
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
            </Hammer>
        );
    }

    componentDidMount() {
        const screenWidth: string = "100%";
        const itemsCount = 6;
        this.refs.sliderWrapper.style.width = parseInt(screenWidth) * itemsCount + "%";
        let lis = this.refs.sliderWrapper.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            var element = lis[i];
            element.style.width = parseInt(screenWidth) / itemsCount + "%";
        }
    }

    componentDidUpdate() {

    }
}

Slider.propTypes = {

};

export default Slider;