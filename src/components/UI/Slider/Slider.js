//@flow
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
                    onTransitionEnd={(e) => { /*this._handleTransitionEnd()*/ }}
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

        this.hammertime=new Hammer(this.refs.sliderWrapper);
        //this.hammertime.get('swipe').set({ velocity: 0.1 ,direction:Hammer.DIRECTION_HORIZONTAL});        
        //this.hammertime.get('pan').set({ threshold: 50 ,direction:Hammer.DIRECTION_HORIZONTAL});
        this.hammertime.get('pan').dropRecognizeWith(this.hammertime.get('swipe'));

        this.hammertime.on("panstart",(e) => {
            let transfromStr= this.refs.sliderWrapper.style.transform;
            let indexOfLeftBrace= transfromStr.indexOf("(");
            let prevTranslateX=parseInt(transfromStr.slice(indexOfLeftBrace + 1,-1).split(",")[0]);
            this.currTranslateX=prevTranslateX + e.deltaX;
        });
        this.hammertime.on("panmove",(e) => {
            //alert('panmove');
            this._handlePan(e)
        });
        // this.hammertime.on("swipeleft",(e) => {
        //     alert('into swipeleft:');
        // });
        // this.hammertime.on("swiperight",(e) => {
        //     alert('into swiperight:');
        // });
    }

    some(){


        var reqAnimationFrame = (function() {
            return window[Hammer.prefixed(window, "requestAnimationFrame")] || function(callback) {
                setTimeout(callback, 1000 / 60);
            }
        })();

        function dirProp(direction, hProp, vProp) {
            return (direction & Hammer.DIRECTION_HORIZONTAL) ? hProp : vProp
        }


        /**
         * Carousel
         * @param container
         * @param direction
         * @constructor
         */
        function HammerCarousel(container, direction) {
            this.container = container;
            this.direction = direction;

            this.panes = Array.prototype.slice.call(this.container.children, 0);
            this.containerSize = this.container[dirProp(direction, 'offsetWidth', 'offsetHeight')];

            this.currentIndex = 0;

            this.hammer = new Hammer.Manager(this.container);
            this.hammer.add(new Hammer.Pan({ direction: this.direction, threshold: 10 }));
            this.hammer.on("panstart panmove panend pancancel", Hammer.bindFn(this.onPan, this));

            this.show(this.currentIndex);
        }


        HammerCarousel.prototype = {
            /**
             * show a pane
             * @param {Number} showIndex
             * @param {Number} [percent] percentage visible
             * @param {Boolean} [animate]
             */
            show: function(showIndex, percent, animate){
                showIndex = Math.max(0, Math.min(showIndex, this.panes.length - 1));
                percent = percent || 0;

                var className = this.container.className;
                if(animate) {
                    if(className.indexOf('animate') === -1) {
                        this.container.className += ' animate';
                    }
                } else {
                    if(className.indexOf('animate') !== -1) {
                        this.container.className = className.replace('animate', '').trim();
                    }
                }

                var paneIndex, pos, translate;
                for (paneIndex = 0; paneIndex < this.panes.length; paneIndex++) {
                    pos = (this.containerSize / 100) * (((paneIndex - showIndex) * 100) + percent);
                    if(this.direction & Hammer.DIRECTION_HORIZONTAL) {
                        translate = 'translate3d(' + pos + 'px, 0, 0)';
                    } else {
                        translate = 'translate3d(0, ' + pos + 'px, 0)'
                    }
                     this.panes[paneIndex].style.transform = translate;
                     this.panes[paneIndex].style.mozTransform = translate;
                     this.panes[paneIndex].style.webkitTransform = translate;
                }

                this.currentIndex = showIndex;
            },

            /**
             * handle pan
             * @param {Object} ev
             */
            onPan : function (ev) {
                var delta = dirProp(this.direction, ev.deltaX, ev.deltaY);
                var percent = (100 / this.containerSize) * delta;
                var animate = false;

                if (ev.type == 'panend' || ev.type == 'pancancel') {
                    if (Math.abs(percent) > 20 && ev.type == 'panend') {
                        this.currentIndex += (percent < 0) ? 1 : -1;
                    }
                    percent = 0;
                    animate = true;
                }

                this.show(this.currentIndex, percent, animate);
            }
        };

        // the horizontal pane scroller
        var outer = new HammerCarousel(document.querySelector(".panes.wrapper"), Hammer.DIRECTION_HORIZONTAL);

        // each pane should contain a vertical pane scroller
        Hammer.each(document.querySelectorAll(".pane .panes"), function(container) {
            // setup the inner scroller
            var inner = new HammerCarousel(container, Hammer.DIRECTION_VERTICAL);

            // only recognize the inner pan when the outer is failing.
            // they both have a threshold of some px
            outer.hammer.get('pan').requireFailure(inner.hammer.get('pan'));
        });

    
    }

    componentDidUpdate() {

    }
}

Slider.propTypes = {

};

export default Slider;