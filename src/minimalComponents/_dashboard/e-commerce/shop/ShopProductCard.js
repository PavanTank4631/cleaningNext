import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
// ? replaced already
import { Link as RouterLink } from 'next/link';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
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
  const { id, name, cover, price, colors, status, priceSale, images } = product;
  console.log(
    '🚀 ~ file: ShopProductCard.js ~ line 34 ~ ShopProductCard ~ images[0]',
    images[0]
  );
  console.log(
    '🚀 🎠🎠🎠🎠🎠🎠🎠🎠🎠🎠🎠🎠   ~ file: ShopProductCard.js ~ line 34 ~ ShopProductCard ~ product',
    product
  );
  // const linkTo = `${PATH_DASHBOARD.shop.root}/product/${paramCase(name)}`;
  const linkTo = `/dashboard/shop/${id}`;
  console.log(
    '🚀 🎠🎠🎠🎠🎠🎠🎠🎠🎠🎠🎠🎠   ~ file: ShopProductCard.js ~ line 34 ~ ShopProductCard ~ product.product.name',
    product.product.name
  );
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {product.product.category.name && (
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
            {product.product.category.name}
          </Label>
        )}

        <ProductImgStyle alt={name} src={images[0].url} />
      </Box>

        <Stack spacing={2} sx={{ p: 1.5 }}>
            <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >

          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >

            </Typography>

{product.product.name}
          </Typography>
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
            {fCurrency(price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
