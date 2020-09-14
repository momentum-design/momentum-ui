import React from 'react';
import Color from '../../containers2020/Color';
import Elevation from '../../containers2020/Elevation';
import Icons from '../../containers2020/Icons';
import Space from '../../containers2020/Space';
import Typography from '../../containers2020/Typography';
import { Route, withRouter, Switch } from 'react-router-dom';

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

    const squares1 = (
      <div className='flex-con-row site-home-subcon'>
        <div className='flex-item site-home-subcon-item site-home-color'>
          <p>Color</p>
          <a className='arrow' href='/2020/tokens/color'></a>
        </div>
        <div className='flex-item site-home-subcon-item site-home-typography flex-margin'>
          <p>Typography</p>
          <a className='arrow' href='/2020/tokens/typography'></a>
        </div>
      </div>
    );

    const squares2 = (
      <div className='flex-con-row site-home-subcon'>
        <div className='flex-item site-home-subcon-item site-home-elevation'>
          <p>Elevation</p>
          <a className='arrow' href='/2020/tokens/elevation'></a>
        </div>
        <div className='flex-item site-home-subcon-item site-home-space flex-margin'>
          <p>Space</p>
          <a className='arrow' href='/2020/tokens/space'></a>
        </div>
      </div>
    );

    return (
      <div className='site-con'>
        <div className='site-warp' style={{marginTop: '100px'}}>
          {squares1}
          {squares2}
        </div>
      </div>
    )
  }
}

export default Tokens;
