import { create } from "zustand";

interface RiderSearchInputState {
  pickupLocationInput: string;
  dropoffLocationInput: string;
  pickupLong: number;
  pickupLat: number;
  dropoffLong: number;
  dropoffLat: number;
  pickupStartTime: string;
  pickupEndTime: string;
  tips: number;
}

interface RiderSearchInputStateStore {
  inputState: RiderSearchInputState | undefined;
  setInputState: (newState: RiderSearchInputState) => void;
}

export const useRiderSearchInput = create<RiderSearchInputStateStore>()(
  (set) => ({
    inputState: undefined,
    setInputState: (newState) => set((state) => ({ inputState: newState })),
  })
);
