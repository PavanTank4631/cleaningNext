//* Redux
//* This feeds in the redux store useDispatch and useSelector (old way, no longer the case)
import React from 'react';
import { Icon } from '@iconify/react';
import { paramCase, sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import clockFill from '@iconify/icons-eva/clock-fill';
import client from 'src/__graphql/apolloClient_and_queries';
import roundVerified from '@iconify/icons-ic/round-verified';
import roundVerifiedUser from '@iconify/icons-ic/round-verified-user';
import { useRouter } from 'next/router';
// material
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Tab,
  Card,
  Grid,
  Divider,
  Skeleton,
  Container,
  Typography,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from 'src/otherComponents/layouts/dashboard';
import { getVariantGraphQl } from 'src/___redux/slices/product';
// routes
import { PATH_DASHBOARD } from 'src/otherComponents/routes/paths';
// hooks
import useSettings from 'src/otherComponents/hooks/useSettings';
// components
import Page from 'src/allTemplateComponents/Page';
// import Markdown from 'src/allTemplateComponents/Markdown';
import HeaderBreadcrumbs from 'src/allTemplateComponents/HeaderBreadcrumbs';
import {
  ProductDetailsSumary,
  ProductDetailsReview,
  ProductDetailsCarousel,
} from 'src/allTemplateComponents/_dashboard/e-commerce/product-details';
import { wrapperStore } from 'src/___redux/store.js';
// import CartWidget from 'src/allTemplateComponents/_dashboard/e-commerce/CartWidget';

const PRODUCT_DESCRIPTION = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: roundVerified,
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: clockFill,
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: roundVerifiedUser,
  },
];

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6} lg={7}>
      <Skeleton
        variant="rectangular"
        width="100%"
        sx={{ paddingTop: '100%', borderRadius: 2 }}
      />
    </Grid>
    <Grid item xs={12} md={6} lg={5}>
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="text" height={240} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
    </Grid>
  </Grid>
);

function EcommerceProductDetails(props) {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  const [value, setValue] = useState('1');

  const router = useRouter();
  const { id } = router.query;
  console.log(
    '🚀 🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮  ~ file: [id].js ~ line 112 ~ EcommerceProductDetails ~ id',
    id
  );
  useEffect(() => {
    if (id) {
      dispatch(getVariantGraphQl(id));
    }
  }, [dispatch, id]);
  console.log(
    '🚀 🎟🎟🎟🎟🎟🎟🎟🎟🎟🎟🎟  ~ file: [id].js ~ line 115 ~ EcommerceProductDetails ~ id',
    id
  );

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const { product, checkout, error } = useSelector((state) => state.product);
  console.log(
    ' 🍼🍼🍼🍼🍼🍼🍼🍼🍼🍼🍼🍼  ~ file: [id].js ~ line 108 ~ EcommerceProductDetails ~ product',
    product
  );

  const carmake = product && product.variant && product.variant.car_make_name;
  const carVariant = product && product.variant;
  const carMakeParamCase = product && paramCase(carmake);
  console.log('From CarDetail.js page, this is checkout: ', checkout);
  return (
    <DashboardLayout>
      <Page title="Ecommerce: Vehicle Details | Car X">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Vehicle Details"
            links={[
              { name: 'Dashboard', href: '/dashboard' },
              {
                name: 'All Vehicles',
                href: '/dashboard/shop',
              },
              {
                name: carmake,
                href: `/dashboard/shop/${carMakeParamCase}`,
              },
              {
                name: `${
                  product && product.variant && product.variant.car_name
                }`,
              },
            ]}
          />
          <Container style={{ direction: 'rtl' }}>
            {/* <CartWidget /> */}
          </Container>
          <br />
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  {!product && SkeletonLoad}
                  {product && product.variant && (
                    <ProductDetailsCarousel product={product.variant} />
                  )}
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  {product && product.variant && (
                    <ProductDetailsSumary
                      product={product.variant}
                      checkout={checkout}
                    />
                  )}
                </Grid>
              </Grid>
            </Card>

            <Card sx={{ mt: 3 }}>
              <Box
                component="div"
                sx={{ mt: 3, mb: 3, mx: 3, fontSize: '1.5rem' }}
                // sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
              >
                <Typography sx={{ mb: '5px' }} variant="h5" paragraph>
                  {carVariant.year} {carVariant.car_make_name}{' '}
                  {carVariant.car_name}
                  <br />
                  Carfax History
                </Typography>
              </Box>
              <TabContext value={value}>
                <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                  <TabList onChange={handleChangeTab}>
                    <Tab disableRipple value="1" label="Condition" />
                    <Tab
                      disableRipple
                      value="2"
                      // label={`Review (${product.reviews.length})`}
                      label="Ownership History"
                      sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                    />
                  </TabList>
                </Box>

                <Divider />

                <TabPanel value="1">
                  <Box sx={{ p: 3 }}>
                    {/* <Markdown children={name} /> */}
                    {/* Miles: {carVariant.car_odometer} */}
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <Grid container sx={{ my: 8 }}>
                    {PRODUCT_DESCRIPTION.map((item) => (
                      <Grid item xs={12} md={4} key={item.title}>
                        <Box
                          sx={{
                            my: 2,
                            mx: 'auto',
                            maxWidth: 280,
                            textAlign: 'center',
                          }}
                        >
                          <IconWrapperStyle>
                            <Icon icon={item.icon} width={36} height={36} />
                          </IconWrapperStyle>
                          <Typography variant="subtitle1" gutterBottom>
                            {item.title}
                          </Typography>
                          <Typography sx={{ color: 'text.secondary' }}>
                            {item.description}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>
              </TabContext>
            </Card>
          </>
          {/* )} */}
          {/* {error && <Typography variant="h6">404 Product not found</Typography>} */}
        </Container>
      </Page>
    </DashboardLayout>
  );
}

export const getServerSideProps = wrapperStore.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const { id } = params;
      await store.dispatch(getVariantGraphQl(id));
      const redux_store = store.getState();
      console.log(
        'This 🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️ is from the wrapper.getServerSideProps() within the redux_store = store.getState() from dashboard/shop/index.js, view https://bit.ly/next12_12 : ',
        redux_store
      );

      return {
        props: {
          initialReduxState: redux_store,
        },
      };
    }
);

export default EcommerceProductDetails;
