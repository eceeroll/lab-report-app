import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:5000/api/reports";

const baseQueryWithToken = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) headers.set("Authorization", `Bearer ${token}`);

    return headers;
  },
});

const reportApi = createApi({
  reducerPath: "reportApi",
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    createReport: builder.mutation({
      query: (reportData) => ({
        url: "create",
        method: "POST",
        body: reportData,
      }),
    }),
    getReportById: builder.query({
      query: (id) => `${id}`,
    }),
    updateReport: builder.mutation({
      query: ({ updateData, id }) => ({
        url: `${id}`,
        method: "PUT",
        body: updateData,
      }),
    }),
    deleteReportFromDatabase: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
    }),
    getReports: builder.query({
      query: () => "my-reports",
    }),
    deleteReport: builder.mutation({
      query: ({ id }) => ({
        url: `delete/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export default reportApi;
export const {
  useCreateReportMutation,
  useDeleteReportFromDatabaseMutation,
  useGetReportByIdQuery,
  useUpdateReportMutation,
  useGetReportsQuery,
  useDeleteReportMutation
} = reportApi;
