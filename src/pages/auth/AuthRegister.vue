<template>
  <div>
    <h1>Auth > Register</h1>
    <p><input type="text" placeholder="Email" v-model="userInput.email" /></p>
    <p>
      <input
        type="password"
        placeholder="Password"
        v-model="userInput.password"
      />
    </p>
    <p><button @click="register">Submit</button></p>
    <hr />
    <p>Already have a login? <a href="/login">Click here</a> to log in.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores';

const authStore = useAuthStore();

const router = useRouter();
const userInput = ref({
  email: '',
  password: '',
});

const register = async () => {
  await authStore.userRegister(userInput.value);
  router.push('/');
};
</script>
