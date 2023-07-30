import { ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { db } from 'src/boot/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useFamilyStore } from './familyStore';

export const useUserStore = defineStore('user', () => {
  const familyStore = useFamilyStore();

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

  async function userDataSet(emailInput: string | null | undefined) {
    if (emailInput) {
      user.value = (await getDoc(doc(db, 'users', emailInput))).data();
      await familyStore.familySet(emailInput);
      isReadySet(true);
    } else {
      user.value = null;
      familyStore.familySet(null);
      isReadySet(false);
    }
  }

  return {
    user,
    userDataSet,
    isReady,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
