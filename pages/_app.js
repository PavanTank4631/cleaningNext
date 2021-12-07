// mock api
import '../src/_apis_';

// i18n
// import '../src/locales/i18n';

// highlight
// import '../src/utils/highlight';
// read the blog here: https://sunde.dev/blog/Beautify_your_markdown_Nextjs_blog_with_Highlightjs
// scroll bar
import 'simplebar/src/simplebar.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// lightbox
import 'react-image-lightbox/style.css';

// editor
import 'react-quill/dist/quill.snow.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

// next
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
// material
import { NoSsr } from '@mui/material';
// contexts
import { SettingsProvider } from 'src/contexts/SettingsContext';
import { CollapseDrawerProvider } from 'src/contexts/CollapseDrawerContext';
// theme
import ThemeConfig from 'src/theme';
import GlobalStyles from 'src/theme/globalStyles';
// utils
import createEmotionCache from 'src/utils/createEmotionCache';
// components
import Settings from 'src/components/settings';
import RtlLayout from 'src/components/RtlLayout';
import ProgressBar from 'src/components/ProgressBar';
import LoadingScreen from 'src/components/LoadingScreen';

import ThemePrimaryColor from 'src/components/ThemePrimaryColor';

//! ----------------------------------------------------------------------
//! all imports below are from index.js full javascript version... not sure about relevancy for next.js for some...
//! ----------------------------------------------------------------------

import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
// import { PersistGate } from 'redux-persist/lib/integration/react';
// material
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// redux
import { store, persistor } from 'src/___redux/store';
// contexts
//* already imported above
// import { SettingsProvider } from 'src/contexts/SettingsContext';
//* already imported above
// import { CollapseDrawerProvider } from 'src/contexts/CollapseDrawerContext';
// components
//* already imported above
// import LoadingScreen from 'src/minimalComponents/LoadingScreen';

// import { AuthProvider } from 'src/contexts/Auth0Context';

// import { AuthProvider } from 'src/contexts/JWTContext';
import { AuthProvider } from 'src/contexts/FirebaseContext';
// import { AuthProvider } from 'src/contexts/AwsCognitoContext';
//! below is from App.js within javascript version...
import GoogleAnalytics from 'src/minimalComponents/GoogleAnalytics';
import NotistackProvider from 'src/minimalComponents/NotistackProvider';
import ThemeLocalization from 'src/minimalComponents/ThemeLocalization';
import { BaseOptionChartStyle } from 'src/minimalComponents/charts/BaseOptionChart';

import { ApolloWrapper } from 'src/__graphql/ApolloWrapper';
//! All imports from full javascript version end here ...
//! below is from root-wrapper.js within gatsby version...
import { ThemeProvider } from '@material-ui/core/styles';
import MainLayout from 'src/layouts/main';
import { wrapperStore } from 'src/___redux/store.js';
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
      {/* <ReduxProvider store={store}> */}
      {/* <PersistGate loading={<LoadingScreen />} persistor={persistor}> */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SettingsProvider>
          <CollapseDrawerProvider>
            <CacheProvider value={emotionCache}>
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

                          <AuthProvider>
                            <MainLayout>
                              <Component {...pageProps} />
                            </MainLayout>
                          </AuthProvider>
                        </NotistackProvider>
                      </ApolloWrapper>
                    </ThemeProvider>
                  </RtlLayout>
                </ThemePrimaryColor>
              </ThemeConfig>
            </CacheProvider>
          </CollapseDrawerProvider>
        </SettingsProvider>
      </LocalizationProvider>
      {/* </PersistGate> */}
      {/* </ReduxProvider> */}
    </HelmetProvider>
  );
};

export default wrapperStore.withRedux(MyApp);
