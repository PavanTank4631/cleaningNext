import { capitalCase } from 'change-case';
// import Link from 'next/link';
import { Link as RouterLink } from 'next';
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Stack,
  Link,
  Alert,
  Tooltip,
  Container,
  Typography,
  Button,
} from '@mui/material';
import useAuth from 'src/otherComponents/hooks/useAuth';
import Page from 'src/allTemplateComponents/Page';
import DashboardLayout from 'src/otherComponents/layouts/dashboard';
import Image from 'next/image';
import AuthLayout from 'src/otherComponents/layouts/AuthLayout';
import { MHidden } from 'src/allTemplateComponents/@material-extend';
import { RegisterForm } from 'src/allTemplateComponents/authentication/register';
import AuthFirebaseSocials from 'src/allTemplateComponents/authentication/AuthFirebaseSocial';
// import jwtIcon from '../../../public/static/auth/ic_jwt.png';
// import registerIcon from '../../../public/static/illustrations/illustration_register.png';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  const { method } = useAuth();

  return (
    <DashboardLayout>
      <RootStyle title="Register | Minimal-UI">
        <AuthLayout />

        <MHidden width="mdDown">
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Make your car shopping experience easier than ever with Car X.
            </Typography>
            {/* <img alt="register" src={registerIcon.src} /> */}
          </SectionStyle>
        </MHidden>

        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <div style={{ marginBottom: '10px' }}>
                  Already have an account? &nbsp;
                  <Link
                    underline="none"
                    variant="subtitle2"
                    component={RouterLink}
                    href="/dashboard/user/login"
                  >
                    Login
                  </Link>
                </div>
                <Typography variant="h4" gutterBottom>
                  Get started absolutely free.
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Free forever. No credit card needed.
                </Typography>
              </Box>
              {/* <Tooltip title={capitalCase(method)}> */}
              {/* <Box
                  component="img"
                  // src={`../../../../static/auth/ic_${method}.png`}
                  src={jwtIcon.src}
                  sx={{ width: 32, height: 32 }}
                /> */}
              {/* </Tooltip> */}
            </Box>

            {method === 'firebase' && <AuthFirebaseSocials />}

            <RegisterForm />

            <Typography
              variant="body2"
              align="center"
              sx={{ color: 'text.secondary', mt: 3 }}
            >
              By registering, I agree to Car X&nbsp;
              <Link underline="always" color="text.primary" href="#">
                Terms of Service
              </Link>
              &nbsp;and&nbsp;
              <Link underline="always" color="text.primary" href="#">
                Privacy Policy
              </Link>
              .
            </Typography>

            <MHidden width="smUp">
              <Typography
                variant="subtitle2"
                sx={{ mt: 3, textAlign: 'center' }}
              >
                Already have an account?&nbsp;
                <Link href="/dashboard/user/login">Login</Link>
              </Typography>
            </MHidden>
          </ContentStyle>
        </Container>
      </RootStyle>
    </DashboardLayout>
  );
}
