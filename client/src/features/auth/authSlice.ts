import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }) => {
    const res = await api.post("/auth/login", data);
    console.log(res.data);
    return res.data.user;
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await api.post("/auth/logout");
});

export const fetchMe = createAsyncThunk(
  "auth/me",
  async () => {
    const res = await api.get("/auth/me");
    console.log(res);
    return res.data;
  }
);

type AuthState = {
  user: any;
  loading: boolean;
};

const initialState: AuthState = {
  user: null,
  loading: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (s) => {
        s.loading = true;
      })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload;
      })
      .addCase(logoutUser.fulfilled, (s) => {
        s.user = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default slice.reducer;