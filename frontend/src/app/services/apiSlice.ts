import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ServicesCookie from "../../services/ServicesCookie";
interface IGetProductDashboardParams {
  page: number;
}
// interface IProductQuery {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
// }
export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
  endpoints: (build) => ({
    getProductDashboard: build.query({
      query: ({ page }: IGetProductDashboardParams) => {
        return {
          url: `/api/products?populate=categories&populate=thumbnail&pagination[page]=${page}&pagination[pageSize]=10`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: { id: number }) => ({
                type: "products" as const,
                id,
              })),
              "products",
            ]
          : ["products"],
    }),

     createProductDashboard: build.mutation({
      query: ({  body }) => ({
        url: `/api/products`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${ServicesCookie.git("jwt")}`,
        },
        body,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getProductDashboard", id, (draft) => {
            Object.assign(draft, patch);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      invalidatesTags: ["products"],
    }),

    updateProductDashboard: build.mutation({
      query: ({ documentId, body }) => ({
        url: `/api/products/${documentId}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${ServicesCookie.git("jwt")}`,
        },
        body,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getProductDashboard", id, (draft) => {
            Object.assign(draft, patch);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      invalidatesTags: ["products"],
    }),

    deletProductDashboard: build.mutation({
      query(documentId) {
        return {
          url: `/api/products/${documentId}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${ServicesCookie.git("jwt")}`,
          },
        };
      },
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetProductDashboardQuery,
  useDeletProductDashboardMutation,
  useUpdateProductDashboardMutation,
  useCreateProductDashboardMutation
} = apiSlice;
