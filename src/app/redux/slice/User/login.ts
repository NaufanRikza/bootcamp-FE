import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ILoginInput,
  ILoginResponse,
  IUserLoginAttributes,
  LoginResponse,
} from "../../../../data/user/interfaces";
import { login } from "../../../../api/user";
import { AxiosError } from "axios";

interface ILoginState {
  emailValue: string | undefined;
  passwordValue: string | undefined;
  token: string | undefined;
  loginState: "idle" | "pending" | "done" | "rejected";
  loginResp: LoginResponse | undefined;
  isAuthenticated: boolean;
  role: string;
  permission: string[];
  user: IUserLoginAttributes | null;
}

export const userLogin = createAsyncThunk<
  LoginResponse,
  ILoginInput,
  { rejectValue: LoginResponse }
>("login/login", async (payload, thunkApi) => {
  try {
    const res = await login(payload.email, payload.password);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return thunkApi.rejectWithValue({
        statusCode: e.response?.status,
        message: e.response?.data.message,
      });
    }
    return thunkApi.rejectWithValue(e as LoginResponse);
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    emailValue: "",
    passwordValue: "",
    token: "",
    loginState: "idle",
    loginResp: {},
    isAuthenticated: false,
    role: "",
    permission: [],
    user: null,
  } as ILoginState,
  reducers: {
    resetUserLoginCredential: (state) => {
      state.emailValue = "";
      state.passwordValue = "";
      state.loginState = "idle";
    },
    resetToken: (state) => {
      state.token = "";
    },
    setLoginEmail: (state, action) => {
      state.emailValue = action.payload;
    },
    setLoginPassword: (state, action) => {
      state.passwordValue = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setPermission: (state, action) => {
      state.permission = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      if (action.payload.statusCode?.toString().startsWith("2")) {
        state.loginResp = action.payload;
        const data = action.payload.data as ILoginResponse;
        state.token = data.token;
        state.loginState = "done";
        state.user = data.user;
        state.isAuthenticated = true;
        state.role = data.user.role as string;
        state.permission = data.user.permission!;
      }
    });
    builder.addCase(userLogin.pending, (state) => {
      state.loginState = "pending";
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loginResp = action.payload;
      state.loginState = "rejected";
    });
  },
});

export const {
  resetUserLoginCredential,
  resetToken,
  setLoginEmail,
  setLoginPassword,
  setAuthenticated,
  setPermission,
  setRole,
  setUser,
  setToken,
} = loginSlice.actions;

export default loginSlice.reducer;
