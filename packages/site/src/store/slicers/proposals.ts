/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ProposalsState = {
  proposal1: any;
};

const initialState: ProposalsState = {
  proposal1: [],
};

export const ProposalsSlicer = createSlice({
  name: 'proposals',
  initialState,
  reducers: {
    setProposals: (state, action: PayloadAction<any>) => {
      state.proposal1 = action.payload;
    },
  },
});

export const { setProposals } = ProposalsSlicer.actions;
export default ProposalsSlicer.reducer;
