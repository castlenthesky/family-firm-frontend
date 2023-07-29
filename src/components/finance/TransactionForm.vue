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
            class="q-gutter-md transaction-form"
          >
            <div class="fit row justify-evenly" id="test">
              <div class="col-6 q-gutter-md">
                <div class="my-content">
                  <q-input
                    outlined
                    dense
                    v-model="transaction.date"
                    mask="date"
                    :rules="['date']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="transaction.date">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="col-6 q-gutter-md">
                <div class="my-content">
                  <q-input
                    outlined
                    dense
                    v-model.number="transaction.amount"
                    label="Transaction Amount"
                    lazy-rules
                    prefix="$"
                    placeholder="2.37"
                    :rules="[
                      (val) =>
                        (typeof val == 'number' && val != 0) ||
                        'Please include a transaction amount',
                    ]"
                  />
                </div>
              </div>
              <div class="col-6 q-gutter-md">
                <div class="my-content">
                  <q-select
                    outlined
                    v-model="transaction.category"
                    :options="categoryOptions"
                    label="Transaction Category"
                    stack-label
                    hint=""
                    dense
                    options-dense
                    ><template v-slot:prepend>
                      <q-icon name="event" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        name="close"
                        @click.stop.prevent="transaction.category = null"
                        class="cursor-pointer"
                      /> </template
                  ></q-select>
                </div>
              </div>
              <div class="col-6 q-gutter-md">
                <div class="my-content">
                  <q-input
                    outlined
                    dense
                    v-model="transaction.subcategory"
                    label="Transaction Subcategory"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Please include a transaction subcategory',
                    ]"
                  />
                </div>
              </div>
            </div>

            <div class="row justify-evenly">
              <q-btn label="Reset" type="reset" color="negative" />
              <q-btn label="Submit" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
        <q-card-section>
          <div class="row justify-evenly">
            <TransactionChart />
            <div class="col-12" align="center">
              Transaction to submit: {{ transaction }}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import TransactionChart from './TransactionChart.vue';
import { ref } from 'vue';
import { db } from 'src/boot/firebase';
import {
  query,
  collection,
  getDocs,
  addDoc,
  orderBy,
} from 'firebase/firestore';

const categoryOptions = ref<string[]>([]);

const currentDate = () => {
  const currentTimestamp = new Date();
  const offset = currentTimestamp.getTimezoneOffset();
  const today = new Date(currentTimestamp.getTime() - offset * 60 * 1000);
  return today.toISOString().split('T')[0].replace(/-/g, '/');
};

// Add transaction to the transactions collection
const transaction = ref({
  date: currentDate(),
  category: null,
  subcategory: null,
  amount: null,
});

const addTransaction = () => {
  addDoc(
    collection(db, 'families', 'henson', 'transactions'),
    transaction.value
  );
};

const categoriesQuery = query(
  collection(db, 'categories'),
  orderBy('sort', 'asc')
);

getDocs(categoriesQuery).then((querySnapshot) => {
  categoryOptions.value = [];
  querySnapshot.forEach((doc) => {
    categoryOptions.value.push(doc.id);
  });
});

// Form Handling
const onReset = () => {
  console.log('form Reset button clicked');

  // Reset form inputs --> Leaving the date
  transaction.value.category = null;
  transaction.value.subcategory = null;
  transaction.value.amount = null;
};

const onSubmit = () => {
  console.log('form Submit button clicked');
  if (
    transaction.value.category == null ||
    transaction.value.subcategory == undefined ||
    transaction.value.amount == undefined
  ) {
    console.log('Form Data Invalid');
  } else {
    addTransaction();
    onReset();
  }
};
</script>

<style lang="sass"></style>
