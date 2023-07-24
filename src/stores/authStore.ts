import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    getUserData: () => {
      console.log('Getting User Data');
    },
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
