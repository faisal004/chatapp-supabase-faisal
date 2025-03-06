import { create } from "zustand";

type OpenState = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const useOpenStore = create<OpenState>((set) => ({
  open: false,
  setOpen: (value) => set({ open: value }),
}));
