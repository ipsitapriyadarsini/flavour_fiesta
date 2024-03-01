"use client";
import React from "react";
import { CldVideoPlayer } from "next-cloudinary";

const HeroSection: () => React.JSX.Element = () => {
  return (
    <CldVideoPlayer
      width="1920"
      height="800"
      src="pexels-mikhail-nilov-7677876_1080p_yt8ltg"
      autoPlay="true"
    />
  );
};

export default HeroSection;
