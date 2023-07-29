import { computed, ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { getUserFamilies } from 'src/services/families';

export const useFamilyStore = defineStore('family', () => {
  // State
  const availableFamilyList = ref<string[]>([]);
  const activeFamily = ref();

  // Getters
  const availableFamilyCount = computed(() => availableFamilyList.value.length);

  // Actions
  async function getAvailableFamilyList(userEmail: string) {
    availableFamilyList.value = await getUserFamilies(userEmail);
    return availableFamilyList.value;
  }

  return {
    availableFamilyList,
    activeFamily,
    availableFamilyCount,
    getAvailableFamilyList,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFamilyStore, import.meta.hot));
}
