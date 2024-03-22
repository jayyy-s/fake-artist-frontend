import { apiSlice } from "./apiSlice";
const GAME_URL =
  import.meta.env.VITE_ENVIRONMENT === "development" ? "/dev/game" : "/api/game";

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
    updatePrompt: builder.mutation({
      query: ({ prompt, gameId }) => ({
        url: `${GAME_URL}/${gameId}`,
        method: "PUT",
        body: { prompt },
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
  useUpdatePromptMutation,
  useAddPlayerMutation,
  useFetchGameByIdMutation,
} = gamesApiSlice;
