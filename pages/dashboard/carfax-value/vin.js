import { useEffect, useState, useRef } from 'react';

// material
import { Container, Block, Paper, Stack } from '@mui/material';
import { PATH_DASHBOARD } from 'src/otherComponents/routes/paths';
// hooks
import useSettings from 'src/otherComponents/hooks/useSettings';
// components
import Page from 'src/allTemplateComponents/Page';
import HeaderBreadcrumbs from 'src/allTemplateComponents/HeaderBreadcrumbs';
import DashboardLayout from 'src/otherComponents/layouts/dashboard';
import CarfaxStepper from 'src/otherComponents/carfax/VIN/VINStepperForm';

const CarValueEstimator = () => {
  const { themeStretch } = useSettings();
  const [openDevTool, setOpenDevTool] = useState(false);

  const handleChange = (event) => {
    setOpenDevTool(event.target.checked);
  };

  return (
    <DashboardLayout>
      <Container direction="row" sx={{ mb: 0, mt: 0, px: 15 }}>
        <Page title="CarX Trade-In | CarX">
          <Container maxWidth={themeStretch ? false : 'lg'}>
            <HeaderBreadcrumbs
              heading="Pre-Owned Price Estimator"
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                {
                  name: 'Trade-In Value',
                  href: '/dashboard/carfax-value/',
                },
                { name: 'Finding Price' },
              ]}
            />

            <Container align="center" justify="center" maxWidth="lg">
              <Stack spacing={5}>
                <CarfaxStepper />
              </Stack>
            </Container>
          </Container>
        </Page>
      </Container>
    </DashboardLayout>
  );
};
export default CarValueEstimator;
