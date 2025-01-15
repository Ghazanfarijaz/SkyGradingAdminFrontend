import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Cards"], // Define tag types
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (loginData) => ({
        url: "/users/login",
        method: "POST",
        body: loginData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const token = data.token;
          if (token) {
            localStorage.setItem("authToken", token);
          }
        } catch (error) {
          console.error("Error during login:", error);
        }
      },
    }),
    fetchCards: builder.query({
      query: () => "/cards",
      providesTags: ["Cards"],
    }),
    getCardByCardNumber: builder.query({
      query: (cardNumber) => `/cards/${cardNumber}`,
      providesTags: (result, error, arg) => [{ type: "Cards", id: arg }],
    }),
    addCard: builder.mutation({
      query: (cardData) => ({
        url: "/cards/add",
        method: "POST",
        body: cardData,
      }),
      invalidatesTags: ["Cards"], // Invalidate the "Cards" tag to refetch the list
    }),
    getCardByUserId: builder.query({
      query: (userId) => `/cards/user/${userId}`,
      providesTags: (result, error, arg) => [
        { type: "Cards", id: `User-${arg}` },
      ],
    }),
    getCardByUserIdAndCardNumber: builder.query({
      query: ({ userId, cardNumber }) => `/cards/user/${userId}/${cardNumber}`,
      providesTags: (result, error, { userId, cardNumber }) => [
        { type: "Cards", id: `User-${userId}-Card-${cardNumber}` },
      ],
    }),
    // Add new endpoint to fetch all users
    getAllUsers: builder.query({
      query: () => "/users/users", // API endpoint to fetch all users
      providesTags: ["User"], // Define tags for cache management
    }),
    // Add new endpoint to fetch all users
    getAllCards: builder.query({
      query: () => "/cards", // API endpoint to fetch all users
      providesTags: ["Cards"], // Define tags for cache management
    }),
    // Update card details
    updateCard: builder.mutation({
      query: ({ cardNumber, cardData }) => ({
        url: `/cards/updateall/${cardNumber}`,
        method: "PUT",
        body: cardData,
      }),
      // After updating the card, invalidate relevant cache to refetch updated data
      // invalidatesTags: (result, error, { cardNumber }) => [{ type: "Cards", id: cardNumber }],
      invalidatesTags: ["Cards"], // Invalidate the User tag after a successful update
    }),
    // Update a user by ID
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/users/users/${id}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["User"], // Invalidate the User tag after a successful update
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useFetchCardsQuery,
  useGetCardByCardNumberQuery,
  useAddCardMutation,
  useGetCardByUserIdQuery,
  useGetCardByUserIdAndCardNumberQuery,
  useGetAllUsersQuery, // Expose the new hook for use in your components
  useGetAllCardsQuery,
  useUpdateCardMutation,
  useUpdateUserMutation,
} = apiSlice;

export default apiSlice;
