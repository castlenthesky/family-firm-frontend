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
              <div class="col-12 q-gutter-md">
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

              <div class="col-12 q-gutter-md">
                <q-select
                  outlined
                  v-model="transaction.account"
                  label="Transaction Account"
                  stack-label
                  hint=""
                  dense
                  options-dense
                  emit-value
                  :options="accountList"
                  ><template v-slot:prepend>
                    <q-icon name="wallet" />
                  </template>
                </q-select>
              </div>

              <div class="col-12 q-gutter-md">
                <q-select
                  outlined
                  v-model="activeCategory"
                  label="Transaction Category"
                  stack-label
                  hint=""
                  dense
                  options-dense
                  :options="categoryOptions"
                  :option-label="
                    (categoryOptions) =>
                      categoryOptions === null ? '' : categoryOptions.category
                  "
                  :option-value="
                    (categoryOptions) =>
                      categoryOptions === null ? '' : categoryOptions.category
                  "
                  @update:model-value="selectTransactionCategory()"
                  ><template v-slot:prepend>
                    <q-icon :name="activeCategoryIcon" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      name="close"
                      @click.stop.prevent="transaction.category = null"
                      class="cursor-pointer"
                    />
                  </template>
                </q-select>
              </div>
              <div class="col-12 q-gutter-md">
                <q-select
                  outlined
                  dense
                  options-dense
                  v-model="transaction.subcategory"
                  label="Transaction Subcategory"
                  :options="activeCategory?.subcategories"
                  hint=""
                  ><template v-slot:prepend>
                    <q-icon name="subdirectory_arrow_right" />
                  </template>
                </q-select>
              </div>

              <div class="col-12 q-gutter-md">
                <q-input
                  outlined
                  dense
                  v-model.number="transaction.amount"
                  label="Transaction Amount"
                  lazy-rules
                  placeholder="2.37"
                  :rules="[
                    (val) =>
                      (typeof val == 'number' && val != 0) ||
                      'Please include a transaction amount',
                  ]"
                  ><template v-slot:prepend>
                    <q-icon name="attach_money" />
                  </template>
                </q-input>
              </div>

              <div class="col-12 q-gutter-md">
                <q-input
                  outlined
                  dense
                  v-model.number="transaction.vendor"
                  label="Transaction Vendor"
                  lazy-rules
                  placeholder="McDonald's"
                  hint=""
                  ><template v-slot:prepend>
                    <q-icon name="store_mall_directory" />
                  </template>
                </q-input>
              </div>

              <div class="col-12 q-gutter-md">
                <q-input
                  outlined
                  dense
                  v-model.number="transaction.note"
                  label="Transaction Note"
                  placeholder="Short description goes here"
                  ><template v-slot:prepend>
                    <q-icon name="subject" />
                  </template>
                </q-input>
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
import { collection, addDoc } from 'firebase/firestore';
import { useAuthStore, useFamilyStore } from 'src/stores';

const authStore = useAuthStore();
const familyStore = useFamilyStore();

const accountList = ref();
const activeCategory = ref();
const activeCategoryIcon = ref<string>('category');
const categoryOptions = ref<string[]>(
  familyStore.family.transactionCategorization
);

accountList.value = familyStore.family.accounts.map(
  (account: { name: string; number: number }) => {
    return {
      label: `${account.name} (${account.number})`,
      value: `${account.name} (${account.number})`,
    };
  }
);

const currentDate = () => {
  const currentTimestamp = new Date();
  const offset = currentTimestamp.getTimezoneOffset();
  const today = new Date(currentTimestamp.getTime() - offset * 60 * 1000);
  return today.toISOString().split('T')[0].replace(/-/g, '/');
};

// Add transaction to the transactions collection
const transaction = ref({
  date: currentDate(),
  account: null,
  category: null,
  subcategory: null,
  amount: null,
  vendor: null,
  entered_by: authStore.auth?.email,
  note: null,
});

const addTransaction = () => {
  addDoc(collection(db, 'families', familyStore.family.id, 'transactions'), {
    ...transaction.value,
    category: activeCategory.value.category,
    date: new Date(transaction.value.date),
  });
};

const selectTransactionCategory = () => {
  transaction.value.category = activeCategory.value.category;
  activeCategoryIcon.value = activeCategory.value.icon;
  transaction.value.subcategory = activeCategory.value.subcategories[0];
};

// Form Handling
const onReset = () => {
  console.log('form Reset button clicked');

  // Reset form inputs --> Leaving the date
  activeCategory.value = null;
  activeCategoryIcon.value = 'category';
  transaction.value.category = null;
  transaction.value.subcategory = null;
  transaction.value.amount = null;
  transaction.value.vendor = null;
  transaction.value.note = null;
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
