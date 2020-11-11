import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

export default class Bounce extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      intervalVar: null,
      start: false,
      xDir: null,
      yDir: null
    };
    this.bounceRef = React.createRef();
    this.updateXDir = this.updateXDir.bind(this);
    this.updateYDir = this.updateYDir.bind(this);
  }

  componentDidMount() {
    const {
      parentContainer
    } = this.props;
    const bounceElement = this.bounceRef;
    let self = this;

    const bounceMechanism = () => {
      if (!bounceElement.current || !parentContainer.current) {console.log("helllo"); return;}
      const MOVE_RATE = 2;
      let posX = bounceElement.current.offsetLeft;
      let posY = bounceElement.current.offsetTop;
      const elmWidth = bounceElement.current.offsetWidth;
      const elmHeight = bounceElement.current.offsetHeight;
      const parentWidth = parentContainer.current.offsetWidth;
      const parentHeight = parentContainer.current.offsetHeight;
      const {
        start,
        xDir,
        yDir
      } = self.state;

      if (xDir === null || yDir === null) {
        self.updateXDir(Math.random() > 0.5 ? 1 : -1);
        self.updateYDir(Math.random() > 0.5 ? 1 : -1);
      } else if (posX > 10 && !start) {
        self.startBounce();
      } else if (start) {
        // Update X trajectory
        if ((posX + elmWidth) >= parentWidth) {
          self.updateXDir(-1);
        } else if (posX <= 0) {
          self.updateXDir(1);
        }

        // Update Y trajectory
        if ((posY + elmHeight) >= parentHeight) {
          self.updateYDir(-1);
        } else if (posY <= 0) {
          self.updateYDir(1);
        }

        // Update x and y positions
        bounceElement.current.style.left = posX + (xDir * MOVE_RATE) + 'px';
        bounceElement.current.style.top = posY + (yDir * MOVE_RATE) + 'px';
      }
    }

    let intervalVar = setInterval(bounceMechanism, 50);
    this.setState({ intervalVar: intervalVar });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalVar);
  }

  updateXDir = (newXDir) => {
    this.setState({ xDir: newXDir });
  }

  updateYDir = (newYDir) => {
    this.setState({ yDir: newYDir });
  }

  startBounce = () => {
    this.setState({ start: true });
  }

  render() {
    const {
      children,
      className
    } = this.props;

    return (
      <div className={className} ref={this.bounceRef}>
        {children}
      </div>
    );
  }
}

Bounce.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
  parentContainer: PropTypes.object,
};

Bounce.defaultProps = {
  className: '',
  children: null,
  parentContainer: null,
};