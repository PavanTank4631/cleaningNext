// mock api
import '../src/_apis_';
import 'simplebar/src/simplebar.css';
import 'src/utils/highlight';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-image-lightbox/style.css';
import 'react-quill/dist/quill.snow.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import Head from 'next/head';
// import { CacheProvider } from '@emotion/react';
import { NoSsr } from '@mui/material';
import { SettingsProvider } from 'src/contexts/SettingsContext';
import { CollapseDrawerProvider } from 'src/contexts/CollapseDrawerContext';
import ThemeConfig from 'src/theme';
import GlobalStyles from 'src/theme/globalStyles';
import createEmotionCache from 'src/utils/createEmotionCache';
import Settings from 'src/components/settings';
import RtlLayout from 'src/components/RtlLayout';
import ProgressBar from 'src/components/ProgressBar';
import LoadingScreen from 'src/components/LoadingScreen';
import ThemePrimaryColor from 'src/components/ThemePrimaryColor';

import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { persistor, makeStore, wrapperStore } from 'src/___redux/store';
import { AuthProvider } from 'src/contexts/FirebaseContext';

// import GoogleAnalytics from 'src/minimalComponents/GoogleAnalytics';
import GoogleAnalytics from 'src/utils/GoogleAnalytics';
import NotistackProvider from 'src/utils/NotistackProvider';
import { BaseOptionChartStyle } from 'src/allTemplateComponents/charts/BaseOptionChart';
// import {
//   UserWrapper,
//   FeedbackWrapper,
//   CartWrapper,
// } from 'src/__gatsby/contexts';
import { ApolloWrapper } from 'src/__graphql/ApolloWrapper';

import { ThemeProvider } from '@material-ui/core/styles';
// SHOULD PROBABLY INCLUDE import MainLayout from 'src/layouts/navMenu';

import GlobalStateProvider from 'src/___global/store/GlobalStateProvider';
// For carfax form
import { ContextCarfaxProvider } from 'src/carfax/GlobalContextCarfax';
import theme from '../theme';

require('dotenv').config();

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  console.log(
    'This is from _app.js, here is the props of the root function of the entire application: ',
    props
  );

  return (
    <HelmetProvider>
      <GlobalStateProvider>
        <ContextCarfaxProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SettingsProvider>
              <CollapseDrawerProvider>
                {/* <CacheProvider value={emotionCache}> */}
                <Head>
                  <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                  />
                </Head>

                <ThemeConfig>
                  <ThemePrimaryColor>
                    <RtlLayout>
                      <NoSsr>
                        <Settings />
                      </NoSsr>
                      <ThemeProvider theme={theme}>
                        <ApolloWrapper>
                          <NotistackProvider>
                            <GlobalStyles />
                            <ProgressBar />
                            {/* <LoadingScreen /> */}
                            <BaseOptionChartStyle />
                            <GoogleAnalytics />
                            {/* <UserWrapper> */}
                            {/* <FeedbackWrapper> */}
                            {/* <CartWrapper> */}
                            <AuthProvider>
                              {/* <MainLayout> */}
                              <Component {...pageProps} />
                              {/* </MainLayout> */}
                            </AuthProvider>
                            {/* </CartWrapper> */}
                            {/* </FeedbackWrapper> */}
                            {/* </UserWrapper> */}
                          </NotistackProvider>
                        </ApolloWrapper>
                      </ThemeProvider>
                    </RtlLayout>
                  </ThemePrimaryColor>
                </ThemeConfig>
                {/* </CacheProvider> */}
              </CollapseDrawerProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </ContextCarfaxProvider>
      </GlobalStateProvider>
    </HelmetProvider>
  );
};

// MyApp.getInitialProps = async (appContext) => {
//   console.log(
//     'This is from _app.js where I have MyApp.getInitialProps = async (appContext) => { ... }, here is the appContext, view https://bit.ly/next12_9 : ',
//     appContext
//   );
//   const appProps = await App.getInitialProps(appContext);
//   console.log(
//     'This is from _app.js where I have MyApp.getInitialProps, appProps = await App.getInitialProps(appContext), here is appProps, view https://bit.ly/next12_9 : ',
//     appContext
//   );
//   appProps.pageProps = {
//     ...appProps.pageProps,
//   };

//   return appProps;
// };

export default wrapperStore.withRedux(MyApp);
