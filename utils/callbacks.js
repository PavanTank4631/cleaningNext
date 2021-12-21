import {useState, useEffect} from 'react';

const isSSR = typeof window === 'undefined';

const EventTarget = isSSR ? Object : window.EventTarget;
class SharedStateTarget extends EventTarget {
  useSharedState(initialState) {
    const [state, setState] = useState(initialState);
    const setSharedState = detail => super.dispatchEvent(new CustomEvent('set', {detail}));

    useEffect(() => {
      const eventListener = ({detail}) => setState(detail);

      super.addEventListener('set', eventListener);
      return () => super.removeEventListener('set', eventListener);
    }, []);

    return [state, setSharedState];
  }
}

// shared state targets
export const USER_FAVORITE_DATA = new SharedStateTarget();

