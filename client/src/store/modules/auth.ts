import { createSlice } from "@reduxjs/toolkit";

export interface IAuthData {
  token: string;
  user: { id: string; name: string };
}

interface IAuthState {
  token: string | undefined;
  user:
    | {
        id: string;
        name: string;
      }
    | undefined;
  login: string;
  password: string;
  errors: {
    login: boolean;
    password: boolean;
  };
}

const initialState: IAuthState = {
  token: undefined,
  user: undefined,
  login: "",
  password: "",
  errors: {
    login: false,
    password: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStateAuthData: (
      state,
      action: {
        payload: IAuthData;
      }
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    removeStateAuthData: (state) => {
      state.token = undefined;
      state.user = undefined;
    },
    setStateAuthLogin: (state, action: { payload: string }) => {
      state.login = action.payload;
    },
    setStateAuthPassword: (state, action: { payload: string }) => {
      state.password = action.payload;
    },
    setStateAuthErrors: (state, action: { payload: IAuthState["errors"] }) => {
      state.errors = action.payload;
    },
    clearStateLoginData: (state) => {
      state.login = "";
      state.password = "";
      state.errors = {
        login: false,
        password: false,
      }
    },
  },
});

export const {
  setStateAuthData,
  removeStateAuthData,
  setStateAuthLogin,
  setStateAuthPassword,
  setStateAuthErrors,
  clearStateLoginData,
} = authSlice.actions;

export const auth = authSlice.reducer;
