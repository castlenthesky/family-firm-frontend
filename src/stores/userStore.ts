import { DocumentData } from 'firebase/firestore';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { getUserData } from 'src/services/users';

const defaultState = {
  email: null,
  name: {},
  access: [],
  membership: [],
};

export const useUserStore = defineStore('user', {
  state: () => defaultState,
  getters: {},
  actions: {
    getUserData: (userEmail: string) => {
      useUserStore().setUserData(getUserData(userEmail));
    },

    async setUserData(userData: DocumentData) {
      this.email = userData.email;
      this.name = userData.name;
      this.access = userData.access;
      this.membership = userData.membership;
    },

    resetState() {
      Object.assign(this, defaultState);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
