import { createSlice } from "@reduxjs/toolkit"; //for generating action creators and action types that correspond to the reducers and state

const savedInitialState = {
  firstname: "g",
  lastname: "g",
  email: "g",
  loggedIn: false,
  role: "g",
  profilepicture: "g",
  vehicle: "g",
};
//information for slice name, initial values for state, and all the reducers
export const userSlice = createSlice({
  name: "user",
  initialState: { value: savedInitialState },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state, action) => {
      state.value = savedInitialState;
    },
  },
});

export const { login, logout } = userSlice.actions; //export the actions, in this case the login function

export default userSlice.reducer; //how we export our reducer functions to be used externally
