import { useContext } from "react";

import { StoreContext } from "../store/store-provider";
import RootStore from "../store/root-store";

export const useStore = (): RootStore => {
  return useContext(StoreContext);
};
