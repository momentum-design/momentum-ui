import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '@momentum-ui/react';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import IconViewer from './IconViewer';
import IconAnimationHelper from './IconAnimationHelper';

class IconsList extends React.Component {
  constructor(props) {
    super(props);
    this.refIconList = React.createRef();
    this.refIconView0 = React.createRef();
    this.refIconView1 = React.createRef();
  }

  state = {
    arrowPosition0: 0,
    arrowPosition1: 0,
    currentIcon0: null,
    currentIcon1: null,
  };

  componentDidMount() {
    this.IconHelper = new IconAnimationHelper(this.refIconList.current, [
      this.refIconView0.current.rootNode.current,
      this.refIconView1.current.rootNode.current,
    ]);
    this._reset();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.iconsList !== this.props.iconsList) {
      this._reset();
    }
  }

  componentWillUnmount() {
    this.IconHelper.release();
  }

  _reset = () => {
    this.IconHelper.reset(
      this.refIconList.current.querySelectorAll('.docs-icons__list-item')
    );
    this.IconHelper.sel(-1);
  }

  getClosest = (array, target) => {
    const sizeArray = map(array, val => [val, Math.abs(val - target)]);
    return reduce(
      sizeArray,
      (memo, val) => {
        return memo[1] < val[1] ? memo : val;
      },
      [-1, 999]
    )[0];
  };

  openViewer = (idx, icon) => {
    if (!this.IconHelper.Lock) {
      const { nextPopIndex, arrowPosition } = this.IconHelper.getNextPopIndex(idx);

      this.setState({
        ['arrowPosition' + nextPopIndex]: arrowPosition,
        ['currentIcon' + nextPopIndex]: icon,
      });

      this.IconHelper.sel(idx, [
        this.refIconView0.current.rootNode.current,
        this.refIconView1.current.rootNode.current,
      ]);
    }
  };

  closeViewer = () => {
    if (!this.IconHelper.Lock) {
      this.IconHelper.sel(-1);
    }
  };

  render() {
    const { iconsList, loading } = this.props;
    const {
      arrowPosition0,
      arrowPosition1,
      currentIcon0,
      currentIcon1,
    } = this.state;

    return (
      <div className="docs-icons__list" ref={this.refIconList}>
        {loading
          ? [...Array(20)].map((ele, idx) => {
              return (
                <div
                  className="docs-icons__list-item"
                  key={`${loading}-${idx}`}
                >
                  <div className="docs-icons__list-item--icon">
                    <Spinner size={20} />
                  </div>
                  <div className="docs-icons__list-item--name">
                    {'...Loading'}
                  </div>
                </div>
              );
            })
          : iconsList.map((icon, idx) => {
              const modifiedIcon = {
                ...icon,
                defaultSize: this.getClosest(icon.colors.default, 36),
              };

              return (
                <button
                  className="md-button--none docs-icons__list-item"
                  key={idx}
                  onClick={() => this.openViewer(idx, modifiedIcon)}
                >
                  <div className={`docs-icons__list-item--icon icon-${icon.name}_${modifiedIcon.defaultSize} icon-${icon.name}`} />
                  <div className="docs-icons__list-item--name">{icon.name}</div>
                </button>
              );
            })}
        <IconViewer
          arrowPosition={arrowPosition0}
          onClose={this.closeViewer}
          ref={this.refIconView0}
          currentIcon={currentIcon0}
        />
        <IconViewer
          arrowPosition={arrowPosition1}
          onClose={this.closeViewer}
          ref={this.refIconView1}
          currentIcon={currentIcon1}
        />
      </div>
    );
  }
}

IconsList.propTypes = {
  iconsList: PropTypes.array,
  loading: PropTypes.bool,
};

IconsList.defaultProps = {
  iconsList: [],
  loading: false,
};

IconsList.displayName = 'IconsList';

export default IconsList;
