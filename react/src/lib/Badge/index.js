import React from 'react';
import PropTypes from 'prop-types';

/**
 * @category communication
 * @component badge
 * @variations collab-ui-react
 */

const Badge = props => {
  const { className, rounded, color, ...otherHTMLProps } = props;

  return (
    <span
      className={
        `cui-badge` +
        `${(rounded && ' cui-badge--round') || ''}` +
        `${(color && ` cui-badge--${color}`) || ''}` +
        `${(className && ` ${className}`) || ''}`
      }
      {...otherHTMLProps}
    >
      {props.children}
    </span>
  );
};

Badge.displayName = 'Badge';

Badge.propTypes = {
  /** @prop Children nodes to render inside Accordion | null */
  children: PropTypes.element,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Optional color prop type | null */
  color: PropTypes.string,
  /** @prop Optional rounded corners for the Badge | false */
  rounded: PropTypes.bool,
};

Badge.defaultProps = {
  children: null,
  className: '',
  rounded: false,
};

export default Badge;

/**
* @component badge
* @section default
* @react
import { Badge } from '@collab-ui/react';

export default function BadgeDefault() {
    return (
      <div className="row">
        <div className="example-spacing">
          <Badge>
            <div>Default</div>
          </Badge>
          <br />

          <Badge color="blue">
            <div>Blue</div>
          </Badge>
          <br />

          <Badge color="red">
            <div>Red</div>
          </Badge>
          <br />

          <Badge color="yellow">
            <div>Yellow</div>
          </Badge>
          <br />

          <Badge color="green">
            <div>Green</div>
          </Badge>
          <br />

          <Badge color="mint">
            <div>Mint</div>
          </Badge>
          <br />

          <Badge color="pastel">
            <div>Default</div>
          </Badge>
          <br />

          <Badge color="blue-pastel">
            <div>Blue</div>
          </Badge>
          <br />

          <Badge color="red-pastel">
            <div>Red</div>
          </Badge>
          <br />

          <Badge color="yellow-pastel">
            <div>Yellow</div>
          </Badge>
          <br />

          <Badge color="green-pastel">
            <div>Green</div>
          </Badge>
          <br />

          <Badge color="mint-pastel">
            <div>Mint</div>
          </Badge>
        </div>
      </div>
    );
  }

**/

/**
* @component badge
* @section round
* @react
import { Badge } from '@collab-ui/react';

export default function BadgeRound() {
    return (
      <div className="row">
        <div className="example-spacing">
          <Badge rounded>
            <div>Default</div>
          </Badge>
          <br />

          <Badge rounded color="blue">
            <div>Blue</div>
          </Badge>
          <br />

          <Badge rounded color="red">
            <div>Red</div>
          </Badge>
          <br />

          <Badge rounded color="yellow">
            <div>Yellow</div>
          </Badge>
          <br />

          <Badge rounded color="green">
            <div>Green</div>
          </Badge>
          <br />

          <Badge rounded color="mint">
            <div>Mint</div>
          </Badge>
          <br />

          <Badge rounded color="pastel">
            <div>Default</div>
          </Badge>
          <br />

          <Badge rounded color="blue-pastel">
            <div>Blue</div>
          </Badge>
          <br />

          <Badge rounded color="red-pastel">
            <div>Red</div>
          </Badge>
          <br />

          <Badge rounded color="yellow-pastel">
            <div>Yellow</div>
          </Badge>
          <br />

          <Badge rounded color="green-pastel">
            <div>Green</div>
          </Badge>
          <br />

          <Badge rounded color="mint-pastel">
            <div>Mint</div>
          </Badge>
        </div>
      </div>
    );
  }
**/
