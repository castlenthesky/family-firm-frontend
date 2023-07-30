import { ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { db } from 'src/boot/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const useUserStore = defineStore('user', () => {
  // State
  const isReady = ref(false);
  const user = ref();
  const activeFamily = ref<{ id: string; name: string }>();

  // Getters / Computed
  // const userAge = computed(() => 1 + 1);

  // Actions
  async function isReadySet(readyState: boolean) {
    isReady.value = readyState;
  }

  async function setUserData(emailInput: string | null | undefined) {
    if (emailInput) {
      user.value = (await getDoc(doc(db, 'users', emailInput))).data();
      isReadySet(true);
      console.log(user.value);
    } else {
      user.value = emailInput;
      isReadySet(false);
    }
  }

  return {
    user,
    isReady,
    activeFamily,
    setUserData,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
