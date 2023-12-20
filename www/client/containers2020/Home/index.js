import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@momentum-ui/react';
import SectionHeader from '../../components2020/SectionHeader';
import TokenSquares from '../../components2020/TokenSquares';
import locale from './locale';

import gitHubBanner from '../../assets/2020/banner-github.svg';
import developerBanner from '../../assets/2020/banner-developers.svg';
import figmaBanner from '../../assets/2020/banner-figma.svg';
import AppHeader2020 from '../../components2020/AppHeader';

class HomePage extends React.PureComponent {

  state = {
    displayPop: true,
  }

  hidePop = ()=> {
    this.setState({displayPop:false})
    this.render();
  }

  render() {

    const {
      displayPop,
    } = this.state;

    console.log('render', displayPop);

    const square_icon = (
      <div className="site-con site-bg-slate site-home-icon">
        <div className='site-warp site-responsive-row'>
          <div className='site-home-sub-banner'>
            <h1>{locale.squareContainers.icons.title}</h1>
            <p>{locale.squareContainers.icons.body}</p>
            <NavLink to="/icons">
              <Button
                ariaLabel='Icon library'
                className='site-home-sub-button site-home-sub-button-icon'
                size={52}
              >{locale.squareContainers.icons.button}</Button>
            </NavLink>
          </div>
          <div className='site-home-sub-banner-bg'></div>
        </div>
      </div>
    );

    const square_personality = (
      <div className="site-con site-home-personality">
        <div className='site-warp site-responsive-row'>
          <div className='site-home-sub-banner-bg'></div>
          <div className='site-home-sub-banner'>
            <h1>{locale.squareContainers.personality.title}</h1>
            <p>{locale.squareContainers.personality.body}</p>
            <NavLink to="/personality">
              <Button
                ariaLabel='Show me personality'
                className='site-home-sub-button site-home-sub-button-personality'
                size={52}
              >{locale.squareContainers.personality.button}</Button>
            </NavLink>
          </div>
        </div>
      </div>
    );

    const square_developers = (
      <div className='site-responsive-row home-developers-guide'>
        <div className='site-home-banner3 site-home-github'>
          <img src={gitHubBanner} />
          <h1>{locale.squareContainers.github.title}</h1>
          <p>{locale.squareContainers.github.body}</p>
          <a href="https://github.com/momentum-design">
            <Button
              ariaLabel='Browse repos'
              className="site-home-sub-button-github"
              size={52}
            >{locale.squareContainers.github.button}</Button>
          </a>
        </div>
        <div className='site-home-banner3 site-home-cisco'>
          <img src={developerBanner} />
          <h1>{locale.squareContainers.webexDevs.title}</h1>
          <p>{locale.squareContainers.webexDevs.body}</p>
          <a href="https://developer.webex.com/">
            <Button
              ariaLabel='Start building'
              className="site-home-sub-button-developers"
              size={52}
            >{locale.squareContainers.webexDevs.button}</Button>
          </a>
        </div>
      </div>
    );

    const square_designers = (
      <div className='site-home-banner3 site-home-figma fix-margin'>
        <img src={figmaBanner} />
        <h1>{locale.squareContainers.figma.title}</h1>
        <p>{locale.squareContainers.figma.body}</p>
        <a href="https://www.figma.com/file/WHcIjwJZRBzxWAx4TSDhQHBT/Momentum.design?node-id=2337%3A14517">
          <Button
            ariaLabel='Open Figma'
            className="site-home-sub-button-figma"
            size={52}
          >{locale.squareContainers.figma.button}</Button>
        </a>
      </div>
    );

    return (
      <div className="site-con page-body-buffer">
        <div className={`docs-home-pop ${displayPop ? "" : "docs-home-pop-hide"}`}>
          <div className='docs-home-pop-padding'></div>
          <div className='docs-home-pop-content'>
            <div className='docs-home-pop-content-img'></div>
            <h1>Pardon our dust</h1>
            <p>Momentum Design website is currently under construction.</p>
            <p>The information you're about to access at https://momentum.design/ is outdated.</p>
            <p>You can access the latest documentation in Figma until the new website goes live in early 2024.</p>
            <a className='docs-home-pop-content-figma' href='https://www.figma.com/files/787107147284489960/team/788811036705382453'>Lastest <span>Documentation</span></a>
            <a className='docs-home-pop-content-close' onClick={() => this.hidePop()}>Proceed to website</a>
            <div className='docs-home-pop-content-logo'></div>            
          </div>
          <div className='docs-home-pop-padding'></div>
        </div>
        <div className="site-con site-bg-black">
          <div className="site-responsive-row site-warp">
            <div className='fix-margin site-banner-home'>
              <h1>{locale.header.title}</h1>
              <p>{locale.header.body}</p>
              <NavLink to="/system">
                <Button
                  ariaLabel='Learn about the system'
                  className="site-banner-home-button md-button--blue"
                  size={52}
                >Learn about the system</Button>
              </NavLink>
            </div>
            <div className="site-banner-home-image"></div>
          </div>
        </div>
        <div className='site-warp'>
          <SectionHeader
            title={locale.sectionHeaders.tokens.title}
            leadStr={locale.sectionHeaders.tokens.body}
          />
          <TokenSquares />
        </div>
        {square_icon}
        {square_personality}
        <div className='site-warp'>
          <h1 className='site-home-banner3-title'>Help for developers</h1>
          {square_developers}
          <h1 className='site-home-banner3-title'>Help for designers</h1>
          {square_designers}
        </div>
      </div>
    );
  }

}

export default HomePage;
