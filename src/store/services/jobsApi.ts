
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://devapi-indexer.elevatustesting.xyz/api/v1/jobs',
    prepareHeaders: (headers)=> {
      
      headers.set("accept-account", `961c06eb-7e25-406c-87d5-d0742e09d96c`);
      headers.set("accept-company", `900a776e-a060-422e-a5e3-979ef669f16b`);

      return headers;
    }
  }),
  tagTypes: ['Jobs'],
  endpoints: (builder)=> ({
    getAllJobs: builder.query<limitedDataFetchResp<IJobListing>, {query?: string, page: number}>({
      query: ({query, page = 0})=> ({
        url: '/',
        method: 'GET',
        params: {
          language_profile_uuid: "ee5d991c-cdc6-4e83-b0b3-96f147208549",
          limit: 15,
          page: page,
          itemQuery: query
        }
      }),
      keepUnusedDataFor: 180
    })
  })
})


export const { useLazyGetAllJobsQuery } = jobsApi