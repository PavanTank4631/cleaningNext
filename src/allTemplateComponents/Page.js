import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { useRouter } from 'next/router';
import { forwardRef, useEffect, useCallback } from 'react';
// material
import { Box } from '@mui/material';
// utils
import track from 'src/otherComponents/utils/analytics';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', ...other }, ref) => {
  const router = useRouter();

  useEffect(() => {
    console.log(
      '🚀  From src/allTemplateComponents/Page.js where router',
      router
    );
  }, [router]);

  useEffect(() => {
    console.log(
      '🚀  From src/allTemplateComponents/Page.js where router.asPath is as follows:',
      router.asPath
    );
  }, [router.asPath]);
  const sendPageViewEvent = useCallback(() => {
    track.pageview({
      page_path: router.asPath,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sendPageViewEvent();
  }, [sendPageViewEvent]);

  return (
    <Box ref={ref} {...other}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
