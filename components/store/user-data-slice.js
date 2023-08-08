import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refresh: 0,
  userInfo: {},
  allProperties: [],
};

const userDataSlice = createSlice({
  name: "userdata",
  initialState: initialState,
  reducers: {
    refreshItem: (state, action) => {
      state.refresh++;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setALlProperties: (state, action) => {
      state.allProperties = action.payload;
    },
  },
});

export default userDataSlice;
export const userDataActions = userDataSlice.actions;
