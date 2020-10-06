import React from 'react';
import Color from '../../containers2020/Color';
import Elevation from '../../containers2020/Elevation';
import Icons from '../../containers2020/Icons';
import Space from '../../containers2020/Space';
import Typography from '../../containers2020/Typography';
import { Route, withRouter, Switch } from 'react-router-dom';

// Import page images
import colorTokenImage from '../../assets/2020/banner-color.svg';
import typographyTokenImage from '../../assets/2020/banner-typography.svg';
import elevationTokenImage from '../../assets/2020/banner-elevation.svg';
import spaceTokenImage from '../../assets/2020/banner-space.svg';

class Tokens extends React.Component {

  render() {

    return (
      <Switch>
        <Route path='/2020/tokens' exact component={TokensLanding} />
        <Route path='/2020/tokens/color' exact component={Color} />
        <Route path='/2020/tokens/elevation' exact component={Elevation} />
        <Route path='/2020/tokens/space' exact component={Space} />
        <Route path='/2020/tokens/typography' exact component={Typography} />
        <Route path='/2020/tokens/*' exact component={Icons} />
      </Switch>
    );
  }

}

class TokensLanding extends React.PureComponent {
  render() {
    const subTitle = (
      <div className='flex-con-row site-subtitle site-subtitle-home'>
        <div className='flex-item'>
          <h1>Tokens</h1>
        </div>
        <div className='flex-item flex-margin'>
          <p>Design tokens are the core visual properties of the design system that define our experiences' style. Tokens include color values, typography, sizing units (pixels, rems, etc.), and spacing.</p>
        </div>
      </div>
    );

    const tokenSquares = (
      <div className='site-responsive-row site-home-subcon'>
        <a href="/2020/tokens/color">
          <div className='site-home-subcon-item site-home-color'>
            <div className="site-home-subcon-item__image">
              <img src={colorTokenImage} /> 
            </div>
            <p>Color</p>
            <div className='arrow'></div>
          </div>
        </a>
        <a href="/2020/tokens/typography">
          <div className='site-home-subcon-item site-home-typography'>
            <div className="site-home-subcon-item__image">
              <img src={typographyTokenImage} />
            </div>
            <p>Typography</p>
            <div className='arrow'></div>
          </div>
        </a>
        <a href="/2020/tokens/elevation">
          <div className='site-home-subcon-item site-home-elevation'>
            <div className="site-home-subcon-item__image">
              <img src={elevationTokenImage} />
            </div>
            <p>Elevation</p>
            <div class='arrow'></div>
          </div>
        </a>
        <a href="/2020/tokens/space">
          <div className='site-home-subcon-item site-home-space'>
            <div className="site-home-subcon-item__image">
              <img src={spaceTokenImage} />
            </div>
            <p>Space</p>
            <div className='arrow'></div>
          </div>
        </a>
      </div>
    );

    return (
      <div className='site-con'>
        <div className='site-warp' style={{marginTop: '100px'}}>
          {tokenSquares}
        </div>
      </div>
    )
  }
}

export default Tokens;
