// mock api
import '../src/_apis_';
import 'simplebar/src/simplebar.css';
import 'src/otherComponents/utils/highlight';
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
import { SettingsProvider } from 'src/otherComponents/contexts/SettingsContext';
import { CollapseDrawerProvider } from 'src/otherComponents/contexts/CollapseDrawerContext';
import ThemeConfig from 'src/otherComponents/theme';
import GlobalStyles from 'src/otherComponents/theme/globalStyles';
import createEmotionCache from 'src/otherComponents/utils/createEmotionCache';
import Settings from 'src/otherComponents/components/settings';
import RtlLayout from 'src/otherComponents/components/RtlLayout';
import ProgressBar from 'src/otherComponents/components/ProgressBar';
import LoadingScreen from 'src/otherComponents/components/LoadingScreen';
import ThemePrimaryColor from 'src/otherComponents/components/ThemePrimaryColor';

import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { wrapperStore } from 'src/___redux/store';
import { store, persistor } from 'src/___redux/customStore';

import { AuthProvider } from 'src/otherComponents/contexts/FirebaseContext';

// import GoogleAnalytics from 'src/allTemplateComponents/GoogleAnalytics';
import GoogleAnalytics from 'src/otherComponents/utils/GoogleAnalytics';
import NotistackProvider from 'src/otherComponents/utils/NotistackProvider';
import { BaseOptionChartStyle } from 'src/allTemplateComponents/charts/BaseOptionChart';
// import {
//   UserWrapper,
//   FeedbackWrapper,
//   CartWrapper,
// } from 'src/__gatsby/contexts';
import { ApolloWrapper } from 'src/__graphql/ApolloWrapper';

import { ThemeProvider } from '@material-ui/core/styles';
import MainLayout from 'src/otherComponents/layouts/main';
// SHOULD PROBABLY INCLUDE import MainLayout from 'src/otherComponents/layouts/navMenu';

import GlobalStateProvider from 'src/___global/store/GlobalStateProvider';
// For carfax form
import { ContextCarfaxProvider } from 'src/otherComponents/carfax/GlobalContextCarfax';
import { UserWrapper, FeedbackWrapper, CartWrapper } from 'src/otherContexts';
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
      <UserWrapper>
        <FeedbackWrapper>
          <CartWrapper>
            <GlobalStateProvider>
              {/* <ReduxProvider store={store}> */}
              <PersistGate
                // loading={<LoadingScreen />}
                persistor={persistor}
              >
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
                                      <MainLayout>
                                        <Component {...pageProps} />
                                      </MainLayout>
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
              </PersistGate>
              {/* </ReduxProvider> */}
            </GlobalStateProvider>
          </CartWrapper>
        </FeedbackWrapper>
      </UserWrapper>
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
