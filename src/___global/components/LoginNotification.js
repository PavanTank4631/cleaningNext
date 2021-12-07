import React, { useContext } from 'react';
import { LoginNotificationWrapper } from '../elements';
import Context from '../store/context';

export const LoginNotification = () => {
  const { globalState } = useContext(Context);
  console.log(
    'This is globalState destructured from useContext(Context) within src/___global/components/LoginNotification.js',
    globalState
  );
  return (
    <>
      <LoginNotificationWrapper loggedIn={globalState.isLoggedIn}>
        <p>Please login to download image</p>
      </LoginNotificationWrapper>
    </>
  );
};
