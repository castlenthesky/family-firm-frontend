<template>
  <div>
    <h1>Auth > Register</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const router = useRouter();
const email = ref('');
const password = ref('');

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      console.log('Successfully registered!');
      router.push('/');
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
  return;
};

const signInWithGoogle = () => {
  return;
};
</script>
