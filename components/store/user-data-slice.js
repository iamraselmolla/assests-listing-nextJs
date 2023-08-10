import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refresh: 0,
  userInfo: {},
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
  },
});

export default userDataSlice;
export const userDataActions = userDataSlice.actions;
