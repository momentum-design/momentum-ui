import React from 'react';

// Import page images
import colorTokenImage from '../../assets/2020/banner-color.svg';
import typographyTokenImage from '../../assets/2020/banner-typography.svg';
import elevationTokenImage from '../../assets/2020/banner-elevation.svg';
import spaceTokenImage from '../../assets/2020/banner-space.svg';

class TokenSquares extends React.PureComponent {

  render() {
    return (
      <div className='site-responsive-row token-squares-container'>
        <a href="/2020/tokens/color">
          <div className='token-squares-container__item token-squares-container__item-color'>
            <div className="token-squares-container__item-image">
              <img src={colorTokenImage} /> 
            </div>
            <p>Color</p>
            <div className='arrow'></div>
          </div>
        </a>
        <a href="/2020/tokens/typography">
          <div className='token-squares-container__item token-squares-container__item-typography'>
            <div className="token-squares-container__item-image">
              <img src={typographyTokenImage} />
            </div>
            <p>Typography</p>
            <div className='arrow'></div>
          </div>
        </a>
        <a href="/2020/tokens/elevation">
          <div className='token-squares-container__item token-squares-container__item-elevation'>
            <div className="token-squares-container__item-image">
              <img src={elevationTokenImage} />
            </div>
            <p>Elevation</p>
            <div className='arrow'></div>
          </div>
        </a>
        <a href="/2020/tokens/space">
          <div className='token-squares-container__item token-squares-container__item-space'>
            <div className="token-squares-container__item-image">
              <img src={spaceTokenImage} />
            </div>
            <p>Space</p>
            <div className='arrow'></div>
          </div>
        </a>
      </div>
    );
  }

}

TokenSquares.displayName = 'TokenSquares';

export default TokenSquares;
