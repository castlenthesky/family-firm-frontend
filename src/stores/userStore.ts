import { defineStore, acceptHMRUpdate } from 'pinia';
import { DocumentData } from 'firebase/firestore';
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
      console.log('Logged in as:', this.email);
    },

    logout() {
      this.email = null;
      this.name = {};
      this.access = [];
      this.membership = [];
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
