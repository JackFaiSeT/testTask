import { IHeader } from "@/contracts/IHeader";
import { Commit } from "vuex";
import { GetterTree, ActionTree, MutationTree } from "vuex";

export const state = (): IHeader => ({
  navigationMenu: [],
});

export const getters: GetterTree<IHeader, IHeader> = {
  navigationMenu: (state) => state.navigationMenu,
};

export const mutations: MutationTree<IHeader> = {
  updateNavigationMenu(state: IHeader) {
    state.navigationMenu.push({
      route: "/",
      text: "Wallet",
      name: "wallet",
    });
    state.navigationMenu.push({
      route: "/three",
      text: "Three.js",
      name: "three",
    });
  },
};

export const actions: ActionTree<IHeader, IHeader> = {
  initNavigationMenu({ commit }: { commit: Commit }) {
    commit("updateNavigationMenu");
  },
};
