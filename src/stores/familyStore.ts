import { computed, ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { getfamilyById, getUserFamilies } from 'src/services/families';

export const useFamilyStore = defineStore('family', () => {
  // State
  const availableFamilyList = ref<{ id: string; name: string }[]>([]);
  const activeFamily = ref();

  // Getters
  const availableFamilyCount = computed(() => availableFamilyList.value.length);

  // Actions
  async function getAvailableFamilyList(userEmail: string) {
    availableFamilyList.value = await getUserFamilies(userEmail);
    return availableFamilyList.value;
  }

  async function getActiveFamilyData(familyId: string) {
    activeFamily.value = await getfamilyById(familyId);
  }

  // async function setActiveFamily(family)

  return {
    availableFamilyList,
    activeFamily,
    availableFamilyCount,
    getAvailableFamilyList,
    getActiveFamilyData,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFamilyStore, import.meta.hot));
}
