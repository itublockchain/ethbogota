/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PageState = {
  page: 'bridge' | 'snapshot';
};

const initialState: PageState = {
  page: 'snapshot',
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<PageState['page']>) => {
      state.page = action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;
