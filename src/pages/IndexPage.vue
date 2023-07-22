<template>
  <div class="row">
    <div class="col-md-12">
      <q-card dark bordered class="bg-grey-9 my-card">
        <q-card-section>
          <div class="text-h6">Your Custom Data</div>
          <!-- <div class="text-subtitle2">by John Doe</div> -->
        </q-card-section>

        <q-separator dark inset />

        <q-card-section>
          <q-input v-model="newMemberName" label="Standard" />
          Text to submit: {{ newMemberName }}
          <br />
          {{ remoteData }}
        </q-card-section>
        <q-card-actions align="around">
          <q-btn @click="refreshSnapshot" color="primary">Refresh</q-btn>
          <q-btn @click="writeRecord" color="positive">Submit</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { db } from 'src/boot/services';
import { collection, onSnapshot, doc, addDoc } from 'firebase/firestore';
import { ref } from 'vue';

const remoteData = ref();
const newMemberName = ref();

const unsubFamily = onSnapshot(
  doc(db, 'families', 'RO7guHaddUaDB4Q0eOLS'),
  (doc) => {
    const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
    console.log(source, 'data: ', doc.data());
    remoteData.value = doc.data();
  }
);

const refreshSnapshot = () => {
  unsubFamily();
  onSnapshot(doc(db, 'families', 'RO7guHaddUaDB4Q0eOLS'), (doc) => {
    const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
    console.log(source, 'data: ', doc.data());
    remoteData.value = doc.data();
  });
};
const writeRecord = () => {
  addDoc(collection(db, 'categories'), {
    name: newMemberName.value,
  });
};
</script>
