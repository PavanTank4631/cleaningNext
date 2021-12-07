import { useEffect } from 'react';

import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

export default function ScrollToTop() {
  const { pathname } = useRouter();
  console.log(
    '🚀 ~ file: ScrollToTop.js ~ line 9 ~ ScrollToTop ~ pathname',
    pathname
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
