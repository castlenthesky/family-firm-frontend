<template>
  <div class="row">
    <div class="col-md-12">
      <q-card dark bordered class="bg-grey-9 my-card">
        <q-card-section>
          <div class="text-h6">Transaction Input</div>
        </q-card-section>

        <q-separator dark inset />

        <q-card-section>
          <q-form
            autofocus
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-select
              outlined
              v-model="transactionCategory"
              :options="categoryOptions"
              label="Transaction Category"
              stack-label
              dense
              options-dense
              ><template v-slot:prepend> <q-icon name="event" /> </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click.stop.prevent="transactionCategory = ''"
                  class="cursor-pointer"
                /> </template
            ></q-select>

            <q-input
              outlined
              v-model="transactionSubcategory"
              label="Transaction Subcategory"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Please include a transaction subcategory',
              ]"
            />
            <q-input
              outlined
              v-model="transactionAmount"
              label="Transaction Amount"
              lazy-rules
              placeholder="2.37"
              :rules="[
                (val) => val != 0 || 'Please include a transaction amount',
              ]"
            />
            <div>
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
          Transaction to submit: {{ transaction }}
          <br />
          {{ transactionList }}
          <br />
        </q-card-section>
        <q-card-section> Chart Goes Here </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { db } from 'src/boot/services';
import {
  query,
  where,
  collection,
  onSnapshot,
  addDoc,
  DocumentData,
} from 'firebase/firestore';

const transactionCategory = ref();
const transactionSubcategory = ref();
const transactionAmount = ref();

const categoryOptions = ref<string[]>([]);
const transactionList = ref<DocumentData[]>([]);

const transaction = ref({
  category: transactionCategory,
  subcategory: transactionSubcategory,
  amount: transactionAmount,
});

const addTransaction = () => {
  addDoc(collection(db, 'transactions'), transaction.value);
};

const categoriesQuery = query(collection(db, 'categories'));

onSnapshot(categoriesQuery, (querySnapshot) => {
  categoryOptions.value = [];
  querySnapshot.forEach((doc) => {
    categoryOptions.value.push(doc.data().name);
  });
});

const transactionQuery = query(
  collection(db, 'transactions'),
  where('amount', '!=', 0)
);

const unsubTransactions = onSnapshot(transactionQuery, (querySnapshot) => {
  transactionList.value = [];
  querySnapshot.forEach((doc) => {
    transactionList.value.push(doc.data());
  });
  console.log('Current transactions in list: ', transactionList.value.length);
});

// Form Handling
const onReset = () => {
  console.log('form Reset button clicked');

  // Purge snapshot data and reset Firebase connection
  unsubTransactions();
  onSnapshot(transactionQuery, (querySnapshot) => {
    transactionList.value = [];
    querySnapshot.forEach((doc) => {
      transactionList.value.push(doc.data());
    });
    console.log('Current transactions in list: ', transactionList.value.length);
  });

  // Reset form inputs
  transactionCategory.value = null;
  transactionSubcategory.value = null;
  transactionAmount.value = null;
};

const onSubmit = () => {
  console.log('form Submit button clicked');
  if (
    transactionCategory.value == undefined ||
    transactionSubcategory.value == undefined ||
    transactionAmount.value == undefined
  ) {
    console.log('Form Data Invalid');
    // $q.notify({
    //   color: 'red-5',
    //   textColor: 'white',
    //   icon: 'warning',
    //   message: 'You need to add some transaction details',
    // });
  } else {
    addTransaction();
    onReset();

    // $q.notify({
    //   color: 'green-4',
    //   textColor: 'white',
    //   icon: 'cloud_done',
    //   message: 'Submitted',
    // });
  }
};
</script>
