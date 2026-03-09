import { baseApi } from "./baseApi";
import { toQueryString } from "../lib/globalfunctions";
import { type PaginatedResponse, type PaginationQuery } from "./pagination";
import type { Movie } from "./interface/movie";

export interface GetMovieQuery extends PaginationQuery {
  search?: string;
}

export const movieApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query<PaginatedResponse<Movie>, GetMovieQuery | void>({
      query: (params) => `title${toQueryString(params || {})}`,
    }),

    getMovieById: builder.query<Movie, number>({
      query: (id) => `movies/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Movie", id }],
    }),

    createMovie: builder.mutation<Movie, Partial<Movie>>({
      query: (body) => ({
        url: "movies",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Movie", id: "LIST" }],
    }),

    updateMovie: builder.mutation<Movie, { id: number; body: Partial<Movie> }>({
      query: ({ id, body }) => ({
        url: `movies/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Movie", id },
        { type: "Movie", id: "LIST" },
      ],
    }),

    deleteMovie: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `movies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Movie", id: "LIST" }],
    }),
  }),

  overrideExisting: false,
});
export const {
  useGetMoviesQuery,
  useGetMovieByIdQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} = movieApi;
