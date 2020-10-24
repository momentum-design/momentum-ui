import React from 'react';
import PageHero from '../PageHero';
import errorBanner from '../../assets/2020/tech-error.svg';

const NotFoundPage = () => {
  return (
    <div className='site-con'>
      <PageHero
        backgroundColor='#FFE8E3'
        backgroundImage={errorBanner}
        backgroundSize="400px"
        heroTitle='404 Not Found'
      />
    </div>
  );
};

export default NotFoundPage;
