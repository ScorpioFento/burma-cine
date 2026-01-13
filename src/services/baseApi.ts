import type { RootState } from "../store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const SERVER_API = import.meta.env.VITE_APP_SERVER_API;

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_API,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.access_token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['Movie'],
  endpoints: () => ({}),
});
