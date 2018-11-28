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

export default function Types() {
    return (
      <div className='row'>
        <div className='example-spacing'>
          <p><span className='h3'>Default</span></p>
          <div>
            <Badge>
                <div>Default</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Blue</span><code>color='blue'</code></p>
          <div>
            <Badge color='blue'>
              <div>Blue</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Red</span><code>color='red'</code></p>
          <div>
            <Badge color='red'>
              <div>Red</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Yellow</span><code>color='yellow'</code></p>
          <div>
            <Badge color='yellow'>
              <div>Yellow</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Green</span><code>color='green'</code></p>
          <div>
            <Badge color='green'>
              <div>Green</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Mint</span><code>color='mint'</code></p>
          <div>
            <Badge color='mint'>
              <div>Mint</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Default</span><code>color='pastel'</code></p>
          <div>
            <Badge color='pastel'>
                <div>Default</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Blue</span><code>color='blue-pastel'</code></p>
          <div>
            <Badge color='blue-pastel'>
              <div>Blue</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Red</span><code>color='red-pastel'</code></p>
          <div>
            <Badge color='red-pastel'>
              <div>Red</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Yellow</span><code>color='yellow-pastel'</code></p>
          <div>
            <Badge color='yellow-pastel'>
              <div>Yellow</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Green</span><code>color='green-pastel'</code></p>
          <div>
            <Badge color='green-pastel'>
              <div>Green</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Mint</span><code>color='mint-pastel'</code></p>
          <div>
            <Badge color='mint-pastel'>
              <div>Mint</div>
            </Badge>
          </div>
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

export default function Rounded() {
    return (
      <div className='row'>
        <div className='example-spacing'>
          <p><span className='h3'>Default</span><code>rounded</code></p>
          <div>
            <Badge rounded>
                <div>Default</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Blue</span><code>rounded color='blue'</code></p>
          <div>
            <Badge color='blue' rounded>
              <div>Blue</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Red</span><code>rounded color='red'</code></p>
          <div>
            <Badge color='red' rounded>
              <div>Red</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Yellow</span><code>rounded color='yellow'</code></p>
          <div>
            <Badge color='yellow' rounded>
              <div>Yellow</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Green</span><code>rounded color='green'</code></p>
          <div>
            <Badge color='green' rounded>
              <div>Green</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Mint</span><code>rounded color='mint'</code></p>
          <div>
            <Badge color='mint' rounded>
              <div>Mint</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Default</span><code>rounded color='pastel'</code></p>
          <div>
            <Badge color='pastel' rounded>
                <div>Default</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Blue</span><code>rounded color='blue-pastel'</code></p>
          <div>
            <Badge color='blue-pastel' rounded>
              <div>Blue</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Red</span><code>rounded color='red-pastel'</code></p>
          <div>
            <Badge color='red-pastel' rounded>
              <div>Red</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Yellow</span><code>rounded color='yellow-pastel'</code></p>
          <div>
            <Badge color='yellow-pastel' rounded>
              <div>Yellow</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Green</span><code>rounded color='green-pastel'</code></p>
          <div>
            <Badge color='green-pastel' rounded>
              <div>Green</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Mint</span><code>rounded color='mint-pastel'</code></p>
          <div>
            <Badge color='mint-pastel' rounded>
              <div>Mint</div>
            </Badge>
          </div>
          <br></br>
        </div>
      </div>
    );
  }
**/
