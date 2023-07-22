<template>
  <div>
    <h1>Auth > Login</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>
    <hr />
    <p><a to="/register">Click here to register</a></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const register = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      console.log('Successfully signed in!');
      router.push('/');
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage.value = 'Invalid email';
          break;
        default:
          errorMessage.value = 'Wrong username and/or password';
          break;
      }
    });
  return;
};

const signInWithGoogle = () => {
  return;
};
</script>
