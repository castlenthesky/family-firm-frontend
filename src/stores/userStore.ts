import { DocumentData } from 'firebase/firestore';
import { defineStore, acceptHMRUpdate } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    email: {},
    name: {},
    access: [],
    membership: [],
  }),
  getters: {},
  actions: {
    setUserData(userData: DocumentData) {
      this.email = userData.email;
      this.name = userData.name;
      this.access = userData.access;
      this.membership = userData.membership;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
