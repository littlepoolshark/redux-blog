
import React, { Component, PropTypes } from 'react';
import Hammer from 'hammerjs';
import './Slider.scss';

const SCREENWIDTH=window.screen.width;

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1,
            direction: "next",
            deltax:-SCREENWIDTH
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
        console.log("into _handleTransitionEnd")
        let className=this.refs.sliderWrapper.className;
        this.refs.sliderWrapper.className = className.replace('animate', '').trim();


        if (this.currIndex === 0) {
            this.currIndex=4;
            this.refs.sliderWrapper.style.transform=`translate3d(${ -SCREENWIDTH * 4 }px,0,0)`;
        }
        if (this.currIndex === 5) {
            this.currIndex=1;
           this.refs.sliderWrapper.style.transform=`translate3d(${ -SCREENWIDTH * 1 }px,0,0)`;
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

     getCurrentTranslateX() {
        let transfromStr = this.refs.sliderWrapper.style.transform;
        let indexOfLeftBrace = transfromStr.indexOf("(");
        let prevTranslateX = parseInt(transfromStr.slice(indexOfLeftBrace + 1, -1).split(",")[0]);

        return prevTranslateX;
    }

    _handlePan(e){ 
    //    console.log('e',e);
    //    let transfromStr= this.refs.sliderWrapper.style.transform;
    //    let indexOfLeftBrace= transfromStr.indexOf("(");
    //    let prevTranslateX=parseInt(transfromStr.slice(indexOfLeftBrace + 1,-1).split(",")[0]);
    //    let nextTranslateX=0;
    //    if(e.deltaX < 0){
    //         nextTranslateX=prevTranslateX - 2;
    //    }else{
    //         nextTranslateX=prevTranslateX + 2;
    //    }
      let nextTranslateX=this.currTranslateX + e.deltaX;
       this.refs.sliderWrapper.style.transform=`translate3d(${ nextTranslateX }px,0,0)`
    }

    render() {
        // let transformX = -this.state.index * SCREENWIDTH + "px";
        // let sliderWrapperStyle = {
        //     transform: `translate3d(${transformX},0,0)`
        // };
        // if (this.state.direction === "prev") {
        //     if (this.state.index !== 4) {
        //         sliderWrapperStyle.transitionDuration = "0.5s";
        //     }
        // }

        // if (this.state.direction === "next") {
        //     if (this.state.index !== 1) {
        //         sliderWrapperStyle.transitionDuration = "0.5s";
        //     }
        // }
        
        let transformX = this.state.deltax   + "px";
        let sliderWrapperStyle = {
            transform: `translate3d(-${SCREENWIDTH}px,0,0)`
        };


        return (  
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
        );
    }

    componentDidMount() {
        const itemsCount = 6;
        this.refs.sliderWrapper.style.width = SCREENWIDTH * itemsCount + "px";
        let lis = this.refs.sliderWrapper.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            var element = lis[i];
            element.style.width = SCREENWIDTH + "px";
        }

        this.currIndex=1;
        this.hammertime=new Hammer(this.refs.sliderWrapper);
        this.hammertime.get('swipe').set({ velocity: 0.1 ,direction:Hammer.DIRECTION_HORIZONTAL});        
        //this.hammertime.get('pan').set({ threshold: 10 ,direction:Hammer.DIRECTION_HORIZONTAL});
        //this.hammertime.get('pan').dropRecognizeWith(this.hammertime.get('swipe'));

        this.hammertime.on("panstart",(e) => {
            //debug.log('into panstart');
            let prevTranslateX=this.getCurrentTranslateX();
            this.currTranslateX=prevTranslateX + e.deltaX;
        });
        this.hammertime.on("panmove",(e) => {
            //debug.log('into panmove');
            this._handlePan(e)
        });

        this.hammertime.on("panend pancancel",(e) => {
            //debug.log('into panend');
           let precent=(Math.abs(this.getCurrentTranslateX() - this.currTranslateX ) + 10 )* 100  / SCREENWIDTH;
           if(e.deltaX < 0){
                if(precent > 20){
                    this.currIndex +=1;
                }
           }else {
                 if(precent > 20){
                    this.currIndex -=1;
                }
           }
           let nextTranslateX=-SCREENWIDTH * this.currIndex ;
           this.refs.sliderWrapper.className += " animate";
           this.refs.sliderWrapper.style.transform=`translate3d(${ nextTranslateX }px,0,0)`;

        });

        // this.hammertime.on("swipeleft",(e) => {
        //     //debug.log('into swipeleft:');
        // });
        // this.hammertime.on("swiperight",(e) => {
        //     //debug.log('into swiperight:');
        // });
    }

    componentDidUpdate() {

    }
}

Slider.propTypes = {

};

export default Slider;