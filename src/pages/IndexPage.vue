<template>
  <div class="row">
    <div class="q-pa-md col-12">
      <q-table
        color="primary"
        :dense="$q.screen.lt.md"
        flat
        bordered
        title="Transactions"
        :rows="rows"
        :columns="columns"
        row-key="id"
        :loading="loadingState"
        :rows-per-page-options="paginationOptions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const loadingState = ref(true);

import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  Timestamp,
} from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { useFamilyStore } from 'src/stores';
import { onUnmounted, ref } from 'vue';

const familyStore = useFamilyStore();

function convertTimestamp(timestamp: Timestamp) {
  return new Date(timestamp.seconds * 1000)
    .toISOString()
    .split('T')[0]
    .replace(/-/g, '/');
}

const paginationOptions = [25, 50, 100, 400, 0];

const columns = [
  {
    required: true,
    name: 'date',
    label: 'Date',
    field: 'date',
    sortable: true,
    align: 'left',
    format: (val: Timestamp) => `${convertTimestamp(val)}`,
  },
  {
    name: 'account',
    label: 'Account',
    field: 'account',
    sortable: true,
    align: 'center',
  },
  {
    name: 'amount',
    label: 'Amount',
    field: 'amount',
    sortable: true,
    align: 'center',
    format: (val: number) => `$${val}`,
    sort: (a: number, b: number) => a - b,
  },
  {
    name: 'category',
    label: 'Category',
    field: 'category',
    sortable: true,
    align: 'center',
  },
  {
    name: 'subcategory',
    label: 'Subcategory',
    field: 'subcategory',
    sortable: true,
    align: 'center',
  },
  {
    name: 'vendor',
    label: 'Vendor',
    field: 'vendor',
    sortable: true,
    align: 'center',
  },
  {
    name: 'notes',
    label: 'Notes',
    field: 'note',
    sortable: true,
    align: 'left',
  },
];

const rows = ref<DocumentData[]>([]);

const transactionQuery = query(
  collection(db, 'families', familyStore.family.id, 'transactions')
);

const unsubscribe = onSnapshot(transactionQuery, (querySnapshot) => {
  rows.value = querySnapshot.docs.map((transaction) => ({
    id: transaction.id,
    ...transaction.data(),
  }));
  loadingState.value = false;
});

onUnmounted(() => {
  unsubscribe();
});
</script>
