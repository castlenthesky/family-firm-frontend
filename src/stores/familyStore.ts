import { computed, ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { getfamilyById, getUserFamilies } from 'src/services/families';
import { DocumentData } from 'firebase/firestore';

export const useFamilyStore = defineStore('family', () => {
  // State
  const availableFamilyList = ref<DocumentData[]>([]);
  const family = ref();

  // Getters
  const availableFamilyCount = computed(() => availableFamilyList.value.length);

  // Actions
  async function familySet(userEmail: string | null | undefined) {
    if (userEmail) {
      console.log('Setting family data for', userEmail);
      await getAvailableFamilyList(userEmail);
      if (availableFamilyCount.value == 1) {
        family.value = getActiveFamilyData(availableFamilyList.value[0].id);
      }
      return;
    } else {
      availableFamilyList.value = [];
      family.value = undefined;
    }
  }

  async function getAvailableFamilyList(userEmail: string) {
    availableFamilyList.value = await getUserFamilies(userEmail);
    return availableFamilyList.value;
  }

  async function getActiveFamilyData(familyId: string) {
    const familyData = await getfamilyById(familyId);
    family.value = {
      id: familyData.id,
      ...familyData.data(),
    };
  }

  // async function setActiveFamily(family)

  return {
    familySet,
    availableFamilyList,
    family,
    availableFamilyCount,
    getAvailableFamilyList,
    getActiveFamilyData,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFamilyStore, import.meta.hot));
}
