import React, { Component, PropTypes } from 'react';
import Hammer from 'react-hammerjs';
import Gestures from 'gestures';
import './Slider.scss';

class Slider extends Component {
    constructor(props) {
        super(props);
        this._moveHandler=this._moveHandler.bind(this);
    }
    _moveHandler(){
        console.log("asdfsadf")
    }
    render() {
        return (
            <Gestures 
                onMove={this._moveHandler}
                >
                <div className="slider-container" onTouchEndCapture={(e) => {console.log(e)}}>
                    <ul className="slider-wrapper" ref="sliderWrapper">
                        <li onClick={() => {console.log("你点击了我")}}></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </Gestures>
        );
    }

    componentDidMount() {
        let screenWidth: number = window.screen.width;
        this.refs.sliderWrapper.style.width = screenWidth * 4 + "px";
        let lis = this.refs.sliderWrapper.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            var element = lis[i];
            element.style.width = screenWidth + "px";
        }



    }
}

Slider.propTypes = {

};

export default Slider;