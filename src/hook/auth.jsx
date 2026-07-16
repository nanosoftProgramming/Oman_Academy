import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    userArray:{},
    access_token:"",
    role:"",

  },
  reducers: {
    loginMethod: (state, action) => {
  state.userArray =action.payload.data;
  state.access_token =action.payload.access_token;
  state.role =action.payload.role;

 },
 },
});

export const { loginMethod } = authSlice.actions;
export default authSlice.reducer;
