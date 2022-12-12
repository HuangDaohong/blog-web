import { createSlice } from '@reduxjs/toolkit';
export const keywordSlice = createSlice({
  name: 'keyword',
  initialState: {
    keyword: null as string | null
  },
  reducers: {
    updatekeyword: (state, action: any) => {
      state.keyword = action.payload;
    }
  }
});

const { updatekeyword } = keywordSlice.actions;

export { updatekeyword };
