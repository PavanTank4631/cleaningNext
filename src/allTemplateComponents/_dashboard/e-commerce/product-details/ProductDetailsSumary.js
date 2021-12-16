import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import roundAddShoppingCart from '@iconify/icons-ic/round-add-shopping-cart';
import Link from 'next/link';
import { useFormik, Form, FormikProvider, useField } from 'formik';
// material
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Link as MuiLink,
  Stack,
  Button,
  Rating,
  Tooltip,
  Divider,
  TextField,
  Typography,
  FormHelperText,
} from '@mui/material';
// redux

import { useDispatch, useSelector } from 'react-redux';
import { addCart, onGotoStep } from 'src/___redux/slices/product';
// routes
import { PATH_DASHBOARD } from 'src/otherComponents//routes/paths';
// utils
import {
  fShortenNumber,
  fCurrency,
} from 'src/otherComponents/utils/formatNumber';
//
import { MIconButton } from '../../../@material-extend';
import Label from '../../../Label';
import ColorSinglePicker from '../../../ColorSinglePicker';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <Icon icon={facebookFill} width={20} height={20} color="#1877F2" />,
  },
  {
    name: 'Instagram',
    icon: (
      <Icon icon={instagramFilled} width={20} height={20} color="#D7336D" />
    ),
  },
  {
    name: 'Linkedin',
    icon: <Icon icon={linkedinFill} width={20} height={20} color="#006097" />,
  },
  {
    name: 'Twitter',
    icon: <Icon icon={twitterFill} width={20} height={20} color="#1C9CEA" />,
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

// ----------------------------------------------------------------------

const Incrementer = (props) => {
  const [field, , helpers] = useField(props);
  // eslint-disable-next-line react/prop-types
  const { available } = props;
  const { value } = field;
  const { setValue } = helpers;

  const incrementQuantity = () => {
    setValue(value + 1);
  };
  const decrementQuantity = () => {
    setValue(value - 1);
  };

  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
      }}
    >
      <MIconButton
        size="small"
        color="inherit"
        disabled={value <= 1}
        onClick={decrementQuantity}
      >
        <Icon icon={minusFill} width={16} height={16} />
      </MIconButton>
      <Typography
        variant="body2"
        component="span"
        sx={{
          width: 40,
          textAlign: 'center',
          display: 'inline-block',
        }}
      >
        {value}
      </Typography>
      <MIconButton
        size="small"
        color="inherit"
        disabled={value >= available}
        onClick={incrementQuantity}
      >
        <Icon icon={plusFill} width={16} height={16} />
      </MIconButton>
    </Box>
  );
};

export default function ProductDetailsSumary() {
  const theme = useTheme();
  // const navigate = useNavigate();
  const router = useRouter();
  const dispatch = useDispatch();
  const { product, checkout } = useSelector((state) => state.product);
  const carVariant = product.variant;
  const {
    id,
    name,
    sizes,
    price,
    cover,
    status,
    // colors,
    available,
    priceSale,
    // totalRating,
    // totalReview,
    // inventoryType,
  } = product;
  console.log('This is product from ProductDetailsSumary', product);
  const colors = carVariant.car_colorLabel;

  const vehicleStatus = carVariant.vehicle_status;
  const alreadyProduct = checkout.cart.map((item) => item.id).includes(id);
  const isMaxQuantity =
    checkout.cart
      .filter((item) => item.id === id)
      .map((item) => item.quantity)[0] >= available;

  const onAddCart = (product) => {
    dispatch(addCart(product));
  };

  const handleBuyNow = () => {
    dispatch(onGotoStep(0));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id,
      name,
      cover,
      available,
      price,
      // color: colors[0],
      color: carVariant.car_colorLabel,
      // size: sizes[4],
      quantity: available < 1 ? 0 : 1,
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (!alreadyProduct) {
          onAddCart({
            ...values,
            subtotal: values.price * values.quantity,
          });
        }
        setSubmitting(false);
        handleBuyNow();
        // navigate(PATH_DASHBOARD.shop.checkout);
        router.push(PATH_DASHBOARD.shop.checkout);
      } catch (error) {
        setSubmitting(false);
      }
    },
  });

  const { values, touched, errors, getFieldProps, handleSubmit } = formik;

  const handleAddCart = () => {
    onAddCart({
      ...values,
      subtotal: values.price * values.quantity,
    });
  };

  return (
    <RootStyle>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Link
            style={{ cursor: 'pointer' }}
            // href={`category/${carVariant.product.name}`}
            href={`category/${carVariant.name}`}
          >
            <Typography
              variant="overline"
              style={{ cursor: 'pointer', fontSize: '36px' }}
              sx={{
                mt: 2,
                cusor: 'pointer',
                mb: 1,
                display: 'block',
                color: status === 'sale' ? 'error.main' : 'info.main',
              }}
            >
              {carVariant.name}
            </Typography>
          </Link>

          <Typography sx={{ mb: '5px' }} variant="h5" paragraph>
            {carVariant.car_vehicleStatus} {carVariant.car_name}
          </Typography>

          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={vehicleStatus == 'Pre-Owned' ? 'secondary' : 'success'}
            sx={{ textTransform: 'uppercase', mb: '5px' }}
          >
            {console.log('THIS IS vehicleStatus : ', vehicleStatus)}
            {vehicleStatus}
          </Label>
          <Typography variant="h4" sx={{ mb: 3 }}>
            <Box
              component="span"
              sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
            >
              {priceSale && fCurrency(priceSale)}
            </Box>
            &nbsp;{fCurrency(carVariant.price)}
          </Typography>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack spacing={3} sx={{ my: 3 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Vehicle Year
              </Typography>
              {/* <ColorSinglePicker
                {...getFieldProps('color')}
                colors={colors}
                // sx={{
                //   ...(colors.length > 4 && {
                //     maxWidth: 144,
                //     justifyContent: 'flex-end',
                  // }),
                // }}
              /> */}

              {carVariant.year}
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Exterior Color
              </Typography>
              {/* <ColorSinglePicker
                {...getFieldProps('color')}
                colors={colors}
                // sx={{
                //   ...(colors.length > 4 && {
                //     maxWidth: 144,
                //     justifyContent: 'flex-end',
                  // }),
                // }}
              /> */}

              {carVariant.car_exteriorColor}
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Interior Color
              </Typography>
              {carVariant.car_interiorColor}
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Size
              </Typography>
              <TextField
                select
                size="small"
                {...getFieldProps('size')}
                SelectProps={{ native: true }}
                FormHelperTextProps={{
                  sx: {
                    textAlign: 'right',
                    margin: 0,
                    mt: 1,
                  },
                }}
                helperText={
                  <MuiLink href="#" underline="always" color="text.primary">
                    Size Chart
                  </MuiLink>
                }
              >
                {/* {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))} */}
              </TextField>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Quantity
              </Typography>
              <div>
                <Incrementer name="quantity" available={available} />
                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    display: 'block',
                    textAlign: 'right',
                    color: 'text.secondary',
                  }}
                >
                  Available: {available}
                </Typography>

                <FormHelperText error>
                  {touched.quantity && errors.quantity}
                </FormHelperText>
              </div>
            </Stack>
          </Stack>
          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ mt: 5 }}
          >
            <Button
              fullWidth
              disabled={isMaxQuantity}
              size="large"
              type="button"
              color="warning"
              variant="contained"
              startIcon={<Icon icon={roundAddShoppingCart} />}
              onClick={handleAddCart}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Add to Cart
            </Button>
            <Button fullWidth size="large" type="submit" variant="contained">
              Buy Now
            </Button>
          </Stack>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            {SOCIALS.map((social) => (
              <Tooltip key={social.name} title={social.name}>
                <MIconButton>{social.icon}</MIconButton>
              </Tooltip>
            ))}
          </Box>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}
