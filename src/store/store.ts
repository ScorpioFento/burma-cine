import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/baseApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import UserReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
