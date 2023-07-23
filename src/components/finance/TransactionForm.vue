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
            <div class="row form">
              <div class="col-4">
                <q-date v-model="transaction.date" minimal />
              </div>
              <div class="col-8">
                <div class="row">
                  <div class="col-12">
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
                  <div class="col-12">
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
                  <div class="col-12">
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
              </div>
            </div>

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
        </q-card-section>
        <div class="row">
          <div class="col-12">Transaction to submit: {{ transaction }}</div>
        </div>
        <q-card-section> Chart Goes Here </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { db } from 'src/boot/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const categoryOptions = ref<string[]>([]);

// Add transaction to the transactions collection
const transaction = ref({
  date: new Date().toISOString().slice(0, 10).replace(/-/g, '/'),
  category: null,
  subcategory: null,
  amount: null,
});

const addTransaction = () => {
  addDoc(collection(db, 'transactions'), transaction.value);
};

getDocs(collection(db, 'categories')).then((querySnapshot) => {
  categoryOptions.value = [];
  querySnapshot.forEach((doc) => {
    categoryOptions.value.push(doc.data().name);
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
