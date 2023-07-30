<template>
  <div>
    <q-form autofocus>
      <h5>Login</h5>
      <div class="flex row q-col-gutter-sm">
        <div class="col-12">
          <q-input
            outlined
            dense
            type="text"
            label="Email"
            placeholder="Email"
            v-model="userInputs.email"
          />
        </div>
        <div class="col-12">
          <q-input
            outlined
            dense
            type="password"
            label="Password"
            placeholder="Password"
            v-model="userInputs.password"
          />
        </div>
        <div class="col-12">
          <div class="row justify-around">
            <div class="col-4 button-container">
              <q-btn color="positive" label="Login" @click="handleSubmit" />
            </div>
            <div class="col-4 button-container">
              <q-btn color="negative" label="Reset" type="reset" />
            </div>
          </div>
        </div>
      </div>
    </q-form>
    <hr />
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p><a href="/register">Click here to register</a></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from 'src/stores';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const userInputs = ref({
  email: '',
  password: '',
});

const errorMessage = ref('');

async function handleSubmit() {
  await authStore.userLogin(userInputs.value);
  router.push('/');
}
</script>

<style lang="scss">
.button-container > button {
  width: 100%;
}
</style>
