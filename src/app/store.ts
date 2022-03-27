import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import programReducer from '../features/programs/programsSlice'

export const store = configureStore({
  reducer: {
    programs: programReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
