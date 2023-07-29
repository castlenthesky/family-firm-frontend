import { defineStore, acceptHMRUpdate } from 'pinia';
import { firebaseAuth } from 'src/boot/firebase';
import { DocumentData } from 'firebase/firestore';
import { getUserData } from 'src/services/users';

const defaultState = {
  authUser: '',
  email: null,
  name: {},
  access: [],
  membership: [],
};

export const useUserStore = defineStore('user', {
  state: () => defaultState,
  getters: {},
  actions: {
    userLogin() {
      console.log('User Logging In...');
    },

    async getUserData(userEmail: string) {
      const databaseResponse = await getUserData(userEmail);
      if (!this.email && databaseResponse) {
        this.email = databaseResponse.email;
        this.name = databaseResponse.name;
        this.access = databaseResponse.access;
        this.membership = databaseResponse.membership;
        console.log('Logged in as:', this.email);
      } else {
        return;
      }
    },

    async setUserData(userData: DocumentData) {
      this.email = userData.email;
      this.name = userData.name;
      this.access = userData.access;
      this.membership = userData.membership;
      console.log('Logged in as:', this.email);
    },

    resetStore() {
      this.email = null;
      this.name = {};
      this.access = [];
      this.membership = [];
    },

    logout() {
      firebaseAuth.signOut();
      window.location.href = '/login';
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
