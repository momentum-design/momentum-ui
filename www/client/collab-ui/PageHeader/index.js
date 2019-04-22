import React from 'react';
import PropTypes from 'prop-types';

/*
 * Tween
 * @Author: Arthus
 * @param t {num} current time
 * @param b {num} beginning value
 * @param c {num} change in value
 * @param d {num} duration
*/
const Tween={
  linear: function(t,b,c,d){
    return c*t/d + b;
  },
  easeIn: function(t,b,c,d){
    return c*(t/=d)*t + b;
  },
  easeOut: function(t,b,c,d){
    return -c *(t/=d)*(t-2) + b;
  },
  easeInOut: function(t,b,c,d){
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  }
};

const getDomPosition=function (pObj) {
  let _left = pObj.offsetLeft || 0,
    _top = pObj.offsetTop || 0;
  while (pObj === pObj.offsetParent) {
    _left += eval(pObj.offsetLeft);
    _top += pObj.offsetTop;
  }
  return { x: _left, y: _top };
};

/**
 * @category controls
 * @component button
 * @variations collab-ui-react
 */

class PageHeader extends React.Component {

  state = {
    scrollState:0, //0 top 1 shrinking 2 fixed on the top
    warpPosition:{x:0,y:0,w:0,h:0,bottom:0},
    checkDomTime:0,
    shrinkEndScrollTop:0,
    shrinkLength:0,
    leaderShrinkStartScrollTop:0
  };

  componentDidMount() {
    let me = this,
      { collapse } = this.props,
      { container } = this.props.scrollingOption;
    if(collapse){
      this.onScrollProxy = function(e){
        me.handleOnScroll(e);
      };
      container.addEventListener('scroll',this.onScrollProxy);
    }
  }

  componentWillUnmount() {
    if(this.onScrollProxy){
      this.props.scrollingOption.container.removeEventListener('scroll',this.onScrollProxy);
    }
  }

  checkDom = () => {
    let time = this.state.checkDomTime;
    if(time<2){
      let {
        pageHeader_warp
      } = this.refs,
      {
        leaderHideLength,
        shrinkStartScrollTop,
        shrinkEndFixedTop,
        ratioMin
      } = this.props.scrollingOption,
      pos = getDomPosition(pageHeader_warp),
      warpPosition={
        x:pos.x,
        y:pos.y,
        h:pageHeader_warp.clientHeight,
        w:pageHeader_warp.clientWidth,
        bottom:pos.y+pageHeader_warp.clientHeight
      },

      plusScroll = (warpPosition.h*(1-ratioMin))>>0,
      shrinkLength = warpPosition.y-shrinkEndFixedTop+plusScroll,
      leaderShrinkStartScrollTop;

      if(leaderHideLength < shrinkLength){
        leaderShrinkStartScrollTop = shrinkStartScrollTop+shrinkLength-leaderHideLength;
      }else{
        leaderShrinkStartScrollTop = parseInt(shrinkStartScrollTop+shrinkLength/4*3);
      }

      this.setState({
        checkDomTime:time+1,
        warpPosition:warpPosition,
        shrinkEndScrollTop:shrinkStartScrollTop+shrinkLength,
        shrinkLength:shrinkLength,
        leaderShrinkStartScrollTop:leaderShrinkStartScrollTop
      });
    }
  };

  //0 top 1 shrinking 2 fixed on the top
  checkScrollState = (scrollState, callback) => {
    if(scrollState!== this.state.scrollState){
      this.setState({ scrollState });
      callback && callback();
    }
  };

  setWarpFixedState = (left, top, scale, leaderOpacity) => {
    let {
      pageHeader_container_fixed,
      pageHeader_leader_fixed
    } = this.refs;
    pageHeader_container_fixed.style.left = left+'px';
    pageHeader_container_fixed.style.top = top+'px';
    pageHeader_container_fixed.style.transform = 'scale('+scale+')';
    pageHeader_leader_fixed.style.opacity = leaderOpacity;
  };

  handleOnScroll = () => {
    this.checkDom();
    let me=this,
      {
        container,
        shrinkStartScrollTop,
        shrinkEndFixedTop,
        ratioMin,
        tween
      } = this.props.scrollingOption,
      {
        warpPosition,
        shrinkEndScrollTop,
        shrinkLength,
        leaderShrinkStartScrollTop
      } = this.state,
      scrollTop = container.pageYOffset || container.scrollTop || 0;

    if(scrollTop<=shrinkStartScrollTop){
      this.checkScrollState(0,function(){
        me.setWarpFixedState(warpPosition.x,warpPosition.y,1,1);
      });
    }else if(scrollTop<= shrinkEndScrollTop){
      this.checkScrollState(1);
      let _t = scrollTop-shrinkStartScrollTop,
        _top = Tween.linear(_t,warpPosition.y,-warpPosition.y+shrinkEndFixedTop,shrinkLength),
        _scale = Tween[tween](_t,1,ratioMin-1,shrinkLength),
        _leaderOpacity = 1;

      if(_t>=leaderShrinkStartScrollTop){
        _leaderOpacity = Tween[tween](_t-leaderShrinkStartScrollTop,1,-1,shrinkLength-leaderShrinkStartScrollTop);
      }
      this.setWarpFixedState(warpPosition.x,parseInt(_top),_scale,_leaderOpacity);
    }else{
      this.checkScrollState(2,function(){
        me.setWarpFixedState(warpPosition.x,shrinkEndFixedTop,ratioMin,0);
      });
    }

  };

  createDom = (isFixed) => {
    const { title, lead} = this.props;
    let {scrollState}= this.state,
      refContainer,
      refTitle,
      refLeader,
      refPrefix='pageHeader_',
      refSuffix='',
      style;

    if(isFixed){
      refSuffix='_fixed';
      style={
        position:'fixed',
        display: scrollState==0 ? 'none':'',
        zIndex:1200,
        top:0
      };
    }else{
      style={
        visibility: scrollState==0 ? '':'hidden'
      };
    }

    refContainer=refPrefix+'container'+refSuffix;//pageHeader_container_fixed
    refTitle=refPrefix+'title'+refSuffix;//pageHeader_title_fixed
    refLeader=refPrefix+'leader'+refSuffix;//pageHeader_leader_fixed

  return (
      <div ref={refContainer} style={style} className="md-page-header__container ">
        <div ref={refTitle} className="md-page-header__title">{title}</div>
        {/* eslint-disable react/no-danger */}
        <h4 ref={refLeader} className="md-page-header__lead" dangerouslySetInnerHTML={{ __html: lead }} />
        {/* eslint-enable react/no-danger */}
      </div>
  );
};

  render(){
    const { textAlign } = this.props;
    return (
      <div ref='pageHeader_warp' className={'md-page-header ' + (textAlign === 'left' ? 'md-page-header--left' : '')}>
        {this.createDom()}
        {this.createDom(true)}
      </div>
    );
  }
}

PageHeader.propTypes = {
  /** @prop Sets whether to collapse component when scrolling | true */
  collapse: PropTypes.bool,
  /** @prop Text to display for title features | '' */
  title: PropTypes.string.isRequired,
  /** @prop Text to display for descriptions features | '' */
  lead: PropTypes.string,
  /** @prop Sets css style (text-align) for the component | 'center' */
  textAlign: PropTypes.string,
  /** @prop Sets scrolling options  */
  scrollingOption:PropTypes.shape({
    /** @prop Sets the dom to bind the onscroll event to | window */
    container:PropTypes.object,
    /** @prop shrink motion will be called when the scrollTop of the container is bigger than this value | 0 */
    shrinkStartScrollTop:PropTypes.number,
    /** @prop Sets the css top value which  the component will be fixed at finally | 20 */
    shrinkEndFixedTop:PropTypes.number,
    /** @prop Sets the range which the leader hiding motion will be called | 20 */
    leaderHideLength:PropTypes.number,
    /** @prop Sets the css transform:scale(X) for the fixed state | 0.42 */
    ratioMin:PropTypes.number,
    /** @prop Sets the easing formula for the shrinking motion | 'linear' */
    tween:PropTypes.string
  })
};

PageHeader.defaultProps = {
  collapse: true,
  title:'',
  lead: null,
  textAlign: 'center',
  scrollingOption:{
    container:window,
    shrinkStartScrollTop:0,
    shrinkEndFixedTop:20,
    leaderHideLength:20,
    ratioMin:0.42,
    tween:'linear'
  }
};

export default PageHeader;
