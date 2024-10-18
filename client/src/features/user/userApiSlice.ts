import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:5000/api";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    // register
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "users/register",
        method: "POST",
        body: userData,
      }),
    }),
    // login
    loginUser: builder.mutation({
      query: (loginData) => ({
        url: "users/login",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export default userApi;
export const { useRegisterUserMutation, useLoginUserMutation } = userApi;
