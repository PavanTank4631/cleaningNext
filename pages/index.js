import Link from 'next/link';

import React, { useState, useEffect } from 'react';

import Layout from 'src/__gatsby/ui/layout';

import CallToAction from 'src/__gatsby/home/CallToAction';

function IndexPage() {
  // console.log('🚀 ~ file: other.js ~ line 11 ~ IndexPage ~ Link', Link);
  // const [activeLink, setActiveLink] = useState('');

  // useEffect(() => {
  //   setActiveLink(window && window.location ? window.location.pathname : '');
  // }, []);
  // console.log(
  //   '🚀 ~ file: other.js ~ line 12 ~ IndexPage ~ activeLink',
  //   activeLink
  // );
  return (
    <Layout>
      {/* <SEO title="Home" /> */}

      <CallToAction />
    </Layout>
  );
}

export default IndexPage;
