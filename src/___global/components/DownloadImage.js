import { Button } from '@mui/material';
import React, { useContext } from 'react';
import Context from '../store/context';

export const DownloadImage = () => {
  const { globalState } = useContext(Context);
  console.log(
    'This is globalState destructured from useContext(Context) within src/___global/components/DownloadImage.js',
    globalState
  );

  return (
    <form
      method="get"
      action="https://images.ctfassets.net/clveum0ikkbk/3ZsxVyTFk2SKHWxazwJuqe/3027b2448f6b7425fd28754cbafe539a/liquid-fill.jpg"
    >
      <Button
        disabled={!globalState.isLoggedIn}
        type="submit"
        variant="outlined"
        color="primary"
      >
        Download
      </Button>
    </form>
  );
};
