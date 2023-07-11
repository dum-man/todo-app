import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const emptySplitApi = createApi({
  reducerPath: "emptySplitApi",
  tagTypes: ["Todos"],
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
});
