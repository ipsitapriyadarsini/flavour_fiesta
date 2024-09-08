'use client';
import React from 'react';
import { CldVideoPlayer } from 'next-cloudinary';
import Recipes from '@/components/pages/Recipes';

const HeroSection: () => React.JSX.Element = () => {
  return (
    <>
      <div className="cloudnary-container">
        <CldVideoPlayer
          width="1920"
          height="800"
          src="pexels-mikhail-nilov-7677876_1080p_yt8ltg" // "ffiesta/intro-vid"
          autoPlay="always"
          controls={false}
          muted
          loop
        />
      </div>
      <Recipes />
    </>
  );
};

export default HeroSection;
