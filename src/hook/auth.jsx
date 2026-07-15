import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    userArray:{},
    access_token:""
  },
  reducers: {
    loginMethod: (state, action) => {
  state.userArray =action.payload.data;
  state.access_token =action.payload.access_token;

 },
 },
});

export const { loginMethod } = authSlice.actions;
export default authSlice.reducer;
