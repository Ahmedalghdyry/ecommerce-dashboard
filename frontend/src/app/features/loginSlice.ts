import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { store } from "../store";
import axiosInstance from "../../config/Axios.config";
import { createStandaloneToast } from "@chakra-ui/react";
import ServicesCookie from "../../services/ServicesCookie";

interface IState {
  loading: boolean;
  data: LoginResponse | null;
  error: string | null;
}

type LoginData = {
  identifier: string;
  password: string;
};

type LoginResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

const { toast } = createStandaloneToast();

const initialState: IState = {
  loading: false,
  data: null,
  error: null,
};

export const userLogin = createAsyncThunk<
  LoginResponse,
  LoginData,
  { rejectValue: string }
>("auth/login", async (user, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const { data } = await axiosInstance.post<LoginResponse>(
      `/auth/local`,
      user,
    );

    return data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error?.message || "Login failed",
    );
  }
});

const loginSlice = createSlice({
  initialState,
  name: "login",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })

      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;

        const data = new Date();

        const IN_DAYS = 3;

        const IN_EXPIERS = 1000 * 60 * 60 * 24 * IN_DAYS;

        data.setTime(data.getTime() + IN_EXPIERS);

        const options = {
          path: "/",
          expires: data,
        };

        ServicesCookie.set("jwt", action.payload.jwt, options);

        toast({
          title: "login is successful",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })

      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload || "Login failed";

        toast({
          title: action.payload || "Login failed",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      });
  },
});

export const selectLogin = (state: ReturnType<typeof store.getState>) =>
  state.login;

export default loginSlice.reducer;

export type AppDispatch = typeof store.dispatch;
