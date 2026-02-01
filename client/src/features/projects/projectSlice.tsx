import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export const fetchAllProjects = createAsyncThunk(
  "projects/fetchAll",
  async () => {
    const res = await api.get("/admin/projects");
    return res.data;
  }
);

type ProjectState = {
  projects: any[];
  loading: boolean;
};

const initialState: ProjectState = {
  projects: [],
  loading: false,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      });
  },
});

export default projectSlice.reducer;