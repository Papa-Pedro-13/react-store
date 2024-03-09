import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../../utils/constants"

//A way to get data that is different from axios. Redux toolit
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ id }) => `/products/${id}`
    })
  })
})
export const { useGetProductQuery } = apiSlice