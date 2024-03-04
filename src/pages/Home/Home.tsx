import Banner from '../../layouts/components/banner/Banner';
import Blog from '../../layouts/components/blog/Blog';
import Slide from '../../layouts/components/slide/Silde';
import React from 'react';

const Home = () => {
  return (
    <>
      <Slide />
      <Banner />
      <Blog />
    </>
  );
};

export default Home;
