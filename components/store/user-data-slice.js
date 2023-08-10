import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refresh: 0,
  userInfo: {},
  allProperties: [],
  userProperty: [],
  propertyFetching: false
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
    setUserProperty: (state, action) => {
      state.userProperty = action.payload;
    },
    setPropertyFetching: (state, action) => {
      state.propertyFetching = action.payload
    }
  },
});

export default userDataSlice;
export const userDataActions = userDataSlice.actions;
