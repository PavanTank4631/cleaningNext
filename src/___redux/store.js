import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { createWrapper } from 'next-redux-wrapper';
//
import { createStore } from 'redux';
import { rootPersistConfig, rootReducer } from './rootReducer';

import mailSlice from './slices/mail';
import chatSlice from './slices/chat';
import blogSlice from './slices/blog';
import userSlice from './slices/user';
import productSlice from './slices/product';
import calendarSlice from './slices/calendar';
import kanbanSlice from './slices/kanban';

const makeStore = () =>
  configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
      [productSlice.name]: productSlice.reducer,
    },
    devTools: true,
  });

export const fetchSubject = (id) => async (dispatch) => {
  const timeoutPromise = (timeout) =>
    new Promise((resolve) => setTimeout(resolve, timeout));

  await timeoutPromise(200);

  dispatch(
    subjectSlice.actions.setEnt({
      [id]: {
        id,
        name: `Subject ${id}`,
      },
    })
  );
};

export const wrapperStore = createWrapper(makeStore);
