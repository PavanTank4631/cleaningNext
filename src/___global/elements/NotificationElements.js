// import styled from 'styled-components';
import styled from '@emotion/styled';

export const LoginNotificationWrapper = styled.div`
  display: ${(props) => (props.loggedIn ? 'none' : 'block')};
`;
