import { selector } from "recoil";
import { initFrameSize } from "./atom";
export const frameSizeSelect = selector({
  key: "frameSizeSelect",
  get: ({ get }) => get(initFrameSize),
  set: ({ set }, newChange) => {
    set(initFrameSize, newChange);
  },
});
