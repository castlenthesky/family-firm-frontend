import { computed, ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

export const useFamilyStore = defineStore('family', () => {
  const familyName = ref('');
  const nameLength = computed(() => familyName.value.length);
  function getName() {
    return familyName.value;
  }

  return { familyName, nameLength, getName };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFamilyStore, import.meta.hot));
}
