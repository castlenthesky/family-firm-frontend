<template>
  Home Page
  <!-- <q-btn v-for="family in familyList"></q-btn> -->
  <q-btn
    v-model="user.userActiveFamily"
    v-for="family in familyList"
    :key="family.id"
    :value="family"
    @click="setActiveFamily({ id: family.id, name: family.name })"
  >
    {{ family.name }}
  </q-btn>
  <p>Active Family: {{ familyStore.activeFamily }}</p>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getUserFamilies } from 'src/services/families';
import { useUserStore } from 'src/stores';
import { useFamilyStore } from 'src/stores/familyStore';

const user = useUserStore();
const familyStore = useFamilyStore();

const familyList = ref<{ id: string; name: string }[]>();

function setActiveFamily(family: { id: string; name: string }) {
  user.userActiveFamily = family;
  familyStore.getActiveFamilyData(family.id);
}

onMounted(async () => {
  familyList.value = await getUserFamilies(user.userEmail);
});
</script>
