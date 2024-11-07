import React from 'react';
import Color from '../../containers2020/Color';
import Elevation from '../../containers2020/Elevation';
import Icons from '../../containers2020/Icons';
import Space from '../../containers2020/Space';
import Typography from '../../containers2020/Typography';
import { Route, withRouter, Switch } from 'react-router-dom';
import TokenSquares from '../../components2020/TokenSquares';
import SectionHeader from '../../components2020/SectionHeader';
import PageHero from '../../components2020/PageHero';
import NotFound from '../../components2020/NotFound';

class Tokens extends React.Component {

  render() {

    return (
      <Switch>
        <Route path='/tokens' exact component={TokensLanding} />
        <Route path='/tokens/color' exact component={Color} />
        <Route path='/tokens/elevation' exact component={Elevation} />
        <Route path='/tokens/space' exact component={Space} />
        <Route path='/tokens/typography' exact component={Typography} />
        <Route component={NotFound} />
      </Switch>
    );
  }

}

class TokensLanding extends React.PureComponent {
  render() {

    return (
      <div className='site-con'>
        <PageHero
          backgroundColor='#EDEDED'
          figmaURL='https://www.figma.com/file/zktddifdcJ47X9m12xVVfy/Core-Styles?node-id=421%3A531'
          githubURL='https://github.com/momentum-design/momentum-ui/tree/main/tokens'
          heroTitle='Tokens'
        />
        <div className='site-warp'>
          <SectionHeader
            title="Tokens"
            leadStr="Design tokens are the core visual properties of the design system that define our experiences' style. Tokens include color values, typography, sizing units (pixels, rems, etc.), and spacing."
          />
          <TokenSquares />
        </div>
      </div>
    )
  }
}

export default Tokens;
