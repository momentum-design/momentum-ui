import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@momentum-ui/react';
import SectionHeader from '../../components2020/SectionHeader';
import locale from './locale';

// Import page images
import colorTokenImage from '../../assets/2020/banner-color.svg';
import typographyTokenImage from '../../assets/2020/banner-typography.svg';
import elevationTokenImage from '../../assets/2020/banner-elevation.svg';
import spaceTokenImage from '../../assets/2020/banner-space.svg';

class HomePage extends React.PureComponent {

  state = {
    mainImage: '',
    description: '',
    displayName: '',
    homeSections: [],
  }

  componentDidMount = () => {

  }

  render() {

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

    const square_icon = (
      <div className="site-con site-bg-slate site-home-icon">
        <div className='site-warp site-responsive-row'>
          <div className='site-home-sub-banner'>
            <h1>Icons</h1>
            <p>Momentum icons are simple and consistent across platforms. They follow our attributes of focused, familiar, and inclusive in metaphor and design. Our icons act as visual support to help people move through the experience more effectively.</p>
            <NavLink to="/2020/icons">
              <Button
                ariaLabel='Icon library'
                className='site-home-sub-button'
                size={52}
              >Icon library</Button>
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
            <h1>Personality</h1>
            <p>Our personality is a fundamental piece
            of our experiences. It ensures our products feel genuinely Webex and show users who we are and what our products stand for. See some
of the ways our personality comes to life in: <strong>Copy, Illustration, and Motion</strong></p>
            <NavLink to="/2020/personality">
              <Button
                ariaLabel='Show me personality'
                className='site-home-sub-button'
                size={52}
              >Show me personality</Button>
            </NavLink>
          </div>
        </div>
      </div>
    );

    const square_developers = (
      <div className='site-responsive-row home-developers-guide'>
        <div className='site-home-banner3 site-home-github'>
          <h1>Github</h1>
          <p>Browse our latest repos and release notes.</p>
          <a href="https://github.com/momentum-design">
            <Button
              ariaLabel='Browse repos'
              className="md-button--white"
              size={52}
            >Browse repos</Button>
          </a>
        </div>
        <div className='site-home-banner3 site-home-cisco'>
          <h1>Cisco Webex for developers</h1>
          <p>Start building apps right on the Webex platform.</p>
          <a href="https://developer.webex.com/">
            <Button
              ariaLabel='Start building'
              className="md-button--white"
              size={52}
            >Start building</Button>
          </a>
        </div>
      </div>
    );

    const square_designers = (
      <div className='site-home-banner3 site-home-figma fix-margin'>
        <h1>Figma</h1>
        <p>Figma is where we store and distribute all our guidelines, components, and tokens.</p>
        <a href="https://www.figma.com/file/WHcIjwJZRBzxWAx4TSDhQHBT/Momentum.design?node-id=2337%3A14517">
          <Button
            ariaLabel='Open Figma'
            className="md-button--blue"
            size={52}
          >Open Figma</Button>
        </a>
      </div>
    );

    return (
      <div className="site-con page-body-buffer">
        <div className="site-con site-bg-black">
          <div className="site-responsive-row site-warp">
            <div className='fix-margin site-banner-home'>
              <h1>{locale.header.title}</h1>
              <p>{locale.header.body}</p>
              <NavLink to="/2020/system">
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
          {tokenSquares}
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
