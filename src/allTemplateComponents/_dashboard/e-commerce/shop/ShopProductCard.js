import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
// ? replaced already
import { Link as RouterLink } from 'next/link';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// routes
import { PATH_DASHBOARD } from 'src/otherComponents/routes/paths';
// utils
import { fCurrency } from 'src/otherComponents/utils/formatNumber';
//
import Label from '../../../Label';
// import ColorPreview from '../../../ColorPreview';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const {
    id,
    name,
    cover,
    price,
    colors,
    status,
    priceSale,
    images,
    car_make_name,
  } = product;

  console.log(
    '🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄 This is from ShopProductCard.js, it is the product which is passed in from props and destructured, view at https://bit.ly/next12_18',
    product
  );
  // console.log(
  //   '🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄 ShopProductCard.js this is the make name: ',
  //   product.product.name
  // );
  console.log(
    '🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄 ShopProductCard.js this is the make name: ',
    product.car_make_name
  );
  // const makeName = product.product.name
  const makeName = car_make_name;
  const makeNameParamCase = paramCase(makeName);
  // const makeNameParamCase = makeName;
  // const linkTo = `/dashboard/shop/${id}`;
  const linkTo = `/dashboard/shop/${makeNameParamCase}/${id}`;
  const linkToMakeName = `/dashboard/shop/${makeNameParamCase}`;

  const stringPrice = product.car_price;
  console.log('This is the stringPrice: ', stringPrice);
  const intPrice = parseInt(stringPrice);
  console.log('This is the intPrice: ', intPrice);
  console.log('This is the price: ', price);
  console.log('This is the product.image_url : ', product.image_url);
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {product.car_make_name && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {product.vehicle_status}
          </Label>
        )}
        <Link href={linkTo} color="inherit" component={RouterLink}>
          <ProductImgStyle alt={name} src={product.image_url} />
        </Link>
      </Box>

      <Stack spacing={2} sx={{ p: 1.5 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Link href={linkToMakeName} color="inherit" component={RouterLink}>
            <Typography variant="subtitle1">
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }}
              />

              {/* {product.product.name} */}
              {product.car_make_name}
            </Typography>
          </Link>
        </Stack>
        <Link href={linkTo} color="inherit" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {product.car_name}
          </Typography>
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp;
            {fCurrency(intPrice)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
