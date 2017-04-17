import React, { Component, PropTypes } from 'react';
import Hammer from 'react-hammerjs';
import Gestures from 'gestures';
import './Slider.scss';

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state={
            index:0
        };
        //this._next=this._next.bind(this);
    }
    _next(){
        this.setState((prevState,props) => {
            return {
                index:prevState.index + 1
            }
        })
    }

     _prev(){
        this.setState((prevState,props) => {
            return {
                index:prevState.index - 1
            }
        })
    }

   _handleTransitionEnd() {
      let currIndex=this.state.index;
      if(currIndex === 4){
            this.setState({
                index:0
            })
      }
   }
    render() {
        let transformX=-this.state.index * 100 / 5 + "%";
        let sliderWrapperStyle={
            transform:`translate3d(${transformX},0,0)`
        };
        if(this.state.index !== 0){
            sliderWrapperStyle.transitionDuration="0.5s";
        }

        return (
                <div className="slider-container" onTouchEndCapture={() => { this._next()}}>
                    <ul 
                        className="slider-wrapper" 
                        ref="sliderWrapper" 
                        style={sliderWrapperStyle} 
                        onTransitionEnd={(e) => { this._handleTransitionEnd()}}
                    >   
                        
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
        const screenWidth: string = "100%";
        const itemsCount=5;
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