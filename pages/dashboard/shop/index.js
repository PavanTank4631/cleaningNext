import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { filter, includes, orderBy } from "lodash";
// material
import {
  Backdrop,
  Container,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
// redux
import {
  useDispatch,
  useSelector,
  useStore,
  useState as useStateRedux,
} from "react-redux";
import { PATH_DASHBOARD } from "src/otherComponents/routes/paths";
import { getVariants, filterProducts } from "src/___redux/slices/product";
// utils
import fakeRequest from "src/otherComponents/utils/fakeRequest";
// hooks
import useSettings from "src/otherComponents/hooks/useSettings";
// components
import Page from "src/allTemplateComponents/Page";
import HeaderBreadcrumbs from "src/allTemplateComponents/HeaderBreadcrumbs";
import {
  ShopTagFiltered,
  ShopProductSort,
  ShopProductList,
  ShopFilterSidebar,
} from "src/allTemplateComponents/_dashboard/e-commerce/shop";
// import CartWidget from 'src/allTemplateComponents/_dashboard/e-commerce/CartWidget';
import DashboardLayout from "src/otherComponents/layouts/dashboard";
import AuthLayout from "src/otherComponents/layouts/AuthLayout";
import GuestGuard from "src/otherComponents/guards/GuestGuard";
import AuthGuard from "src/otherComponents/guards/AuthGuard";
import { wrapperStore } from "src/___redux/store.js";
import axios from "axios";
import { USER_FAVORITE_DATA } from "utils/callbacks";

//* All data here comes from src/___redux/slices/product.js lines 220+ where the getVariants function is being exported!
//* This then calls an api with Axios which is referencing to localhost:3222/api/products which itself gets data from the graphql server on https://admin.shopcarx.com/graphql which comes back and retrieves data via a graphql setup
// ----------------------------------------------------------------------

function applyFilter(products, sortBy, filters) {
  // SORT BY
  if (sortBy === "featured") {
    products = orderBy(products, ["sold"], ["desc"]);
  }
  if (sortBy === "newest") {
    products = orderBy(products, ["createdAt"], ["desc"]);
  }
  if (sortBy === "priceDesc") {
    products = orderBy(products, ["price"], ["desc"]);
  }
  if (sortBy === "priceAsc") {
    products = orderBy(products, ["price"], ["asc"]);
  }
  // FILTER PRODUCTS
  if (filters.gender.length > 0) {
    products = filter(products, (_product) =>
      includes(filters.gender, _product.gender)
    );
  }
  if (filters.category !== "All") {
    products = filter(
      products,
      (_product) => _product.category === filters.category
    );
  }
  if (filters.colors.length > 0) {
    products = filter(products, (_product) =>
      _product.colors.some((color) => filters.colors.includes(color))
    );
  }
  if (filters.priceRange) {
    products = filter(products, (_product) => {
      if (filters.priceRange === "below") {
        return _product.price < 25000;
      }
      if (filters.priceRange === "between") {
        return _product.price >= 25000 && _product.price <= 75000;
      }
      return _product.price > 75000;
    });
  }
  if (filters.rating) {
    products = filter(products, (_product) => {
      const convertRating = (value) => {
        if (value === "up4Star") return 4;
        if (value === "up3Star") return 3;
        if (value === "up2Star") return 2;
        return 1;
      };
      return _product.totalRating > convertRating(filters.rating);
    });
  }

  const newData = products.map((item) => ({ ...item, isFavourite: false }));

  return newData;
}

const EcommerceShop = (props) => {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);

  const [favouriteData, setFavouriteData] = USER_FAVORITE_DATA.useSharedState(
    []
  );

  const state_products = useSelector((state) => state.product);
  console.log(
    "This 🧘‍♂️🧘‍♂️🧘‍♂️🧘‍♂️🧘‍♂️🧘‍♂️🧘‍♂️ is state_products = useSelecotr ((state) => state.product) from pages/dashboard/shop/index.js, view https://bit.ly/next12_10 : ",
    state_products
  );

  const { products, sortBy, filters } = state_products.products.length
    ? state_products
    : props.initialReduxState.product;
  const filteredProducts = applyFilter(products, sortBy, filters);

  console.log(
    "This 🧖‍♂️🧖‍♂️🧖‍♂️🧖‍♂️🧖‍♂️ is filteredProducts = applyFilter(products, sortBy, filters); from pages/dashboard/shop/index.js, view https://bit.ly/next12_11 : ",
    filteredProducts
  );
  const formik = useFormik({
    initialValues: {
      gender: filters.gender,
      category: filters.category,
      colors: filters.colors,
      priceRange: filters.priceRange,
      rating: filters.rating,
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await fakeRequest(500);
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    },
  });

  const { values, resetForm, handleSubmit, isSubmitting, initialValues } =
    formik;

  const isDefault =
    !values.priceRange &&
    !values.rating &&
    values.gender.length === 0 &&
    values.colors.length === 0 &&
    values.category === "All";

  useEffect(() => {
    dispatch(getVariants());
    // dispatch(getVariants());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterProducts(values));
    console.log(
      "This is the dispatch of filterProducts action slice within pages/dashboard/shop/index.js : ",
      dispatch(filterProducts(values))
    );
  }, [dispatch, values]);

  const getFavouritesData = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const favorites = userData.favorites;

    filteredProducts.forEach((fItem, fIndex) => {
      favorites.forEach((vItem, vIndex) => {
        if (fItem.id === vItem.variant) {
          fItem.favoriteId = vItem.id,
          fItem.isFavourite = true;
        }
      });
      return fItem;
    });

    console.log("INDEX.JS ==>", filteredProducts);
    setFavouriteData(filteredProducts);
  };

  useEffect(() => {
    getFavouritesData();
  }, []);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  const updateFavoritesData = (variantId, id) => {
    const favData = [...favouriteData];
    favData.forEach((fItem, fIndex) => {
      if (fItem.id === variantId) {
        fItem.favoriteId = id;
        fItem.isFavourite = !fItem.isFavourite;
      }
      return fItem;
    });

    console.log('called', favData)
    setFavouriteData(favData);

  };

  console.log("This is favouriteData from index.js", favouriteData);
  return (
    // <AuthGuard>
    <DashboardLayout>
      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mb: 0, mt: 0, px: 15 }}
      >
        {/* <CartWidget /> */}
      </Stack>
      {/* {!filteredProducts && SkeletonLoad} */}
      <GuestGuard>
        <Page title="Shop: All Vehicles | CarX">
          {values && (
            <Backdrop open={isSubmitting} sx={{ zIndex: 9999 }}>
              <CircularProgress />
            </Backdrop>
          )}

          <Container maxWidth={themeStretch ? false : "lg"}>
            <HeaderBreadcrumbs
              heading="Shop: All Vehicles"
              links={[
                { name: "Dashboard", href: PATH_DASHBOARD.root },
                // {
                //   name: 'E-Commerce',
                //   href: PATH_DASHBOARD.shop.root,
                // },
                { name: "All Vehciles" },
              ]}
            />

            {!isDefault && (
              <Typography gutterBottom>
                <Typography component="span" variant="subtitle1">
                  {filteredProducts.length}
                </Typography>
                &nbsp;Products found
              </Typography>
            )}

            <Stack
              direction="row"
              flexWrap="wrap-reverse"
              alignItems="center"
              justifyContent="flex-end"
              sx={{ mb: 5 }}
            >
              <ShopTagFiltered
                filters={filters}
                formik={formik}
                isShowReset={openFilter}
                onResetFilter={handleResetFilter}
                isDefault={isDefault}
              />

              <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <ShopFilterSidebar
                  formik={formik}
                  isOpenFilter={openFilter}
                  onResetFilter={handleResetFilter}
                  onOpenFilter={handleOpenFilter}
                  onCloseFilter={handleCloseFilter}
                />
                <ShopProductSort />
              </Stack>
            </Stack>

            <ShopProductList
              //* below is different from pavan version
              updateFavoritesData={updateFavoritesData}
              products={favouriteData}
              isLoad={!filteredProducts && !initialValues}
            />
          </Container>
        </Page>
      </GuestGuard>
    </DashboardLayout>
    // </AuthGuard>
  );
};

export const getServerSideProps = wrapperStore.getServerSideProps(
  (store) =>
    async ({ params }) => {
      await store.dispatch(getVariants());
      const redux_store = store.getState();
      console.log(
        "This 🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️ is from the wrapper.getServerSideProps() within the redux_store = store.getState() from dashboard/shop/index.js, view https://bit.ly/next12_12 : ",
        redux_store
      );

      return {
        props: {
          initialReduxState: redux_store,
        },
      };
    }
);

export default EcommerceShop;
