import { Commit } from "vuex";
import eth from "@/services/eth";
import { GetterTree, ActionTree, MutationTree } from "vuex";
import { IEthState } from "~/contracts/IEth";

export const state = (): IEthState => ({
  address: "",
});

export const getters: GetterTree<IEthState, IEthState> = {
  address: (state: any) => state.address,
  isLoggedIn: (state: any) => (state.address ? true : false),
};

export const mutations: MutationTree<IEthState> = {
  setAddress(state: any, address: string) {
    state.address = address;
  },
};

export const actions: ActionTree<IEthState, IEthState> = {
  async connectWallet({ commit }: { commit: Commit }) {
    try {
      const accounts = await eth.connectWallet();
      commit("setAddress", accounts[0]);
      return accounts;
    } catch (error) {
      console.log(error);
    }
  },
  async checkConnect({ commit }: { commit: Commit }) {
    try {
      const address = eth.getAddress();
      commit("setAddress", address);
    } catch (error) {
      console.log(error);
    }
  },
};
