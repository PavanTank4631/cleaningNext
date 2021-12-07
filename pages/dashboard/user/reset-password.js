import { useState } from 'react';
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
import useAuth from 'src/hooks/useAuth';
import Page from 'src/allTemplateComponents/Page';
import DashboardLayout from 'src/layouts/dashboard';
import Image from 'next/image';
import LogoOnlyLayout from 'src/layouts/LogoOnlyLayout';
import { MHidden } from 'src/allTemplateComponents/@material-extend';
import { LoginForm } from 'src/allTemplateComponents/authentication/login';
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import { ResetPasswordForm } from 'src/allTemplateComponents/authentication/reset-password';
import { SentIcon } from 'src/assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <DashboardLayout>
      <RootStyle title="Reset Password | CarX">
        <LogoOnlyLayout />

        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            {!sent ? (
              <>
                <Typography variant="h3" paragraph>
                  Forgot your password?
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                  Please enter the email address associated with your account
                  and We will email you a link to reset your password.
                </Typography>

                <ResetPasswordForm
                  onSent={() => setSent(true)}
                  onGetEmail={(value) => setEmail(value)}
                />

                <Button
                  fullWidth
                  size="large"
                  component={RouterLink}
                  href="/dashboard/user/login"
                  sx={{ mt: 1 }}
                >
                  Back
                </Button>
              </>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                <Typography variant="h3" gutterBottom>
                  Request sent successfully
                </Typography>
                <Typography>
                  We have sent a confirmation email to &nbsp;
                  <strong>{email}</strong>
                  <br />
                  Please check your email.
                </Typography>

                <Button
                  size="large"
                  variant="contained"
                  component={RouterLink}
                  href="/dashboard/user/login"
                  sx={{ mt: 5 }}
                >
                  Back
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      </RootStyle>
    </DashboardLayout>
  );
}
