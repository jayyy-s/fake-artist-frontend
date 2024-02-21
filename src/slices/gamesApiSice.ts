import { apiSlice } from "./apiSlice";
const GAME_URL = "/api/game";

export const gamesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGame: builder.mutation({
      query: (data) => ({
        url: `${GAME_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateImage: builder.mutation({
      query: ({ canvasState, gameId }) => ({
        url: `${GAME_URL}/${gameId}`,
        method: "PUT",
        body: { canvasState },
      }),
    }),
    addPlayer: builder.mutation({
      query: ({ gameId }) => ({
        url: `${GAME_URL}/${gameId}`,
        method: "PUT",
      }),
    }),
    fetchGameById: builder.mutation({
      query: ({ gameId }) => ({
        url: `${GAME_URL}/${gameId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateGameMutation,
  useUpdateImageMutation,
  useAddPlayerMutation,
  useFetchGameByIdMutation,
} = gamesApiSlice;
