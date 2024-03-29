import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

const baseQuery = fetchBaseQuery({ baseUrl: baseUrl }); // TODO: fix proxy server not replacing in vite.config.ts

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Game"],
  endpoints: (/*builder*/) => ({}),
});
