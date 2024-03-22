import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  import.meta.env.VITE_ENVIRONMENT === "development"
    ? ""
    : import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({ baseUrl: baseUrl }); // TODO: fix proxy server not replacing in vite.config.ts

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Game"],
  endpoints: (/*builder*/) => ({}),
});
