import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  access_token: string;
  id: string | number | false;
  name: string;
  email: string;
}

export type PartialUserState = Partial<UserState>;

const originalFormat: UserState = {
  access_token: "",
  id: false,
  name: "",
  email: "",
};

const SESSION_KEY = "user";

function saveSession(user: UserState) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

function loadSession(): UserState {
  const session = sessionStorage.getItem(SESSION_KEY);

  if (!session) return originalFormat;

  try {
    return JSON.parse(session) as UserState;
  } catch (error) {
    clearSession();
    return originalFormat;
  }
}

const initialState: UserState = loadSession();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<PartialUserState>) => {
      Object.assign(state, action.payload);
      saveSession(state);
    },

    clearState: (state) => {
      clearSession();
      Object.assign(state, originalFormat, { id: false });
    },
  },
});

export const { setState, clearState } = userSlice.actions;
export default userSlice.reducer;
