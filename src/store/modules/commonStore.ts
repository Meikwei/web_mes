import { defineStore } from "pinia";
import { store } from "/@/store";
import { commonType } from "./types";
import { bomSelect } from "/@/api/bom";
import { getToken, setToken, removeToken } from "/@/utils/auth";

const data = getToken();

export const commonStore = defineStore({
  id: "pure-comnon",
  state: (): commonType => ({
    lf: null
  }),
  actions: {
    // 登入
    setlf(lf) {
      this.lf = lf;
    }
  }
});

export function commonStoreHook() {
  return commonStore(store);
}
