import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    return await getPosts();
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;

      if (state.posts.isLoading) {
        return false;
      }

      return true;
    },
  },
);

const postsSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.posts = action.payload;
    });

    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default postsSlice.reducer;

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};
