<template>
  <div>
    <h1>Auth > Login</h1>
    <p><input type="text" placeholder="Email" v-model="userInputs.email" /></p>
    <p>
      <input
        type="password"
        placeholder="Password"
        v-model="userInputs.password"
      />
    </p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p>
      <button @click="signIn(userInputs)">Submit</button>
    </p>
    <hr />
    <p><a href="/register">Click here to register</a></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { signIn } from 'src/services/users';

const userInputs = ref({
  email: '',
  password: '',
});

const errorMessage = ref('');
</script>
