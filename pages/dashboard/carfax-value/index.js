import { useEffect, useState, useRef } from 'react';

// material
import { Container, Block, Paper, Stack } from '@mui/material';
import { PATH_DASHBOARD } from 'src/routes/paths';
// hooks
import useSettings from 'src/hooks/useSettings';
// components
import Page from 'src/minimalComponents/Page';
import HeaderBreadcrumbs from 'src/minimalComponents/HeaderBreadcrumbs';
import DashboardLayout from 'src/layouts/dashboard';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ShellForm from 'src/carfax/ShellForm';
import MakeForm from 'src/carfax/Make/MakeForm';
import { MHidden } from 'src/components/@material-extend';

const CarValueEstimator = () => {
  //* Below is media query
  const theme = useTheme();
  const MyPhone = useMediaQuery(theme.breakpoints.down('sm'));
  const MyDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  //* Above is media query
  const { themeStretch } = useSettings();
  const [openDevTool, setOpenDevTool] = useState(false);

  const handleChange = (event) => {
    setOpenDevTool(event.target.checked);
  };
  if (MyPhone) {
    return (
      <DashboardLayout>
        {/* <Container> */}
        <Page title="CarX Trade-In | CarX">
          {/* <Container maxWidth={themeStretch ? false : 'lg'}> */}
          <HeaderBreadcrumbs
            heading="Pre-Owned Price Estimator"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Trade-In Value' },
            ]}
            sx={{ paddingLeft: '3px' }}
          />
          {/* <Container align="center" justify="center" maxWidth="lg"> */}
          {/* <Stack spacing={5}> */}
          <ShellForm />
          {/* </Stack> */}
          {/* </Container> */}
          {/* </Container> */}
        </Page>
        {/* </Container> */}
      </DashboardLayout>
    );
  }
  {
    return (
      <DashboardLayout>
        <Container direction="row" sx={{ mb: 0, mt: 0, px: 15 }}>
          <Page title="CarX Trade-In | CarX">
            <Container maxWidth={themeStretch ? false : 'lg'}>
              <HeaderBreadcrumbs
                heading="Pre-Owned Price Estimator"
                links={[
                  { name: 'Dashboard', href: PATH_DASHBOARD.root },
                  { name: 'Trade-In Value' },
                ]}
              />
              <Container align="center" justify="center" maxWidth="lg">
                <Stack spacing={5}>
                  <ShellForm />
                </Stack>
              </Container>
            </Container>
          </Page>
        </Container>
      </DashboardLayout>
    );
  }
};
export default CarValueEstimator;
