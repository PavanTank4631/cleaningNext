import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'next';
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Stack,
  Link as MuiLink,
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
import { LoginForm } from 'src/allTemplateComponents/authentication/login';
import AuthFirebaseSocials from 'src/allTemplateComponents/authentication/AuthFirebaseSocial';
// import jwtIcon from '../../../public/static/auth/ic_jwt.png';
// import loginIcon from '../../../public/static/illustrations/illustration_login.png';

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

export default function Login() {
  const { method, login } = useAuth();
  // console.log(
  //   '🚀  🀄🀄🀄🀄🀄🀄🀄🀄🀄🀄 ~ file: login.js ~ line 56 ~ jwtIcon: ',
  //   jwtIcon
  // );
  // console.log(
  //   '🚀  🀄🀄🀄🀄🀄🀄🀄🀄🀄🀄 ~ file: login.js ~ line 56 ~ jwtIcon.src : ',
  //   jwtIcon.src
  // );

  const handleLoginAuth0 = async () => {
    try {
      await login();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <RootStyle title="Login | CarX">
        <AuthLayout>
          Don’t have an account? &nbsp;
          <MuiLink
            underline="none"
            variant="subtitle2"
            component={RouterLink}
            href="/dashboard/user/register"
          >
            Get started
          </MuiLink>
        </AuthLayout>
        <MHidden width="mdDown">
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            {/* <img src={loginIcon.src} alt="login" /> */}
          </SectionStyle>
        </MHidden>
        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                Don’t have an account? &nbsp;
                <MuiLink
                  underline="none"
                  variant="subtitle2"
                  component={RouterLink}
                  href="/dashboard/user/register"
                >
                  Get started
                </MuiLink>
                <Typography variant="h4" gutterBottom>
                  Sign in to Car X
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Enter your details below.
                </Typography>
              </Box>

              {/* <Tooltip title={capitalCase(method)}>
                <Image src={jwtIcon.src} width={32} height={32} />
              </Tooltip> */}
            </Stack>

            {method === 'firebase' && <AuthFirebaseSocials />}

            <Alert severity="info" sx={{ mb: 3 }}>
              Use email : <strong>demo@shopcarx.com</strong> / password :
              <strong>&nbsp;carx1234</strong>
            </Alert>

            {method !== 'auth0' ? (
              <LoginForm />
            ) : (
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={handleLoginAuth0}
              >
                Login
              </Button>
            )}

            <MHidden width="smUp">
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?&nbsp;
                <MuiLink
                  variant="subtitle2"
                  component={RouterLink}
                  href="/dashboard/user/register"
                >
                  Get started
                </MuiLink>
              </Typography>
            </MHidden>
          </ContentStyle>
        </Container>
      </RootStyle>
    </DashboardLayout>
  );
}
