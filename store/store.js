import {create} from "zustand";

export const useAppStore = create((set) => ({
  isFirstTimeLoggingIn: true,
  toggleFirstTimeLoggingIn: () =>
    set((state) => ({isFirstTimeLoggingIn: !state.isFirstTimeLoggingIn})),

  userData: null,
  setUserData: (data) => set(() => ({userData: data})),
}));
