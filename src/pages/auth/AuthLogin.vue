<template>
  <div>
    <h1>Auth > Login</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p><button @click="login">Submit</button></p>
    <hr />
    <p><a href="/register">Click here to register</a></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/stores/userStore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getUserData } from 'src/services/users';

const user = useUserStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const login = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(async () => {
      const docSnap = await getUserData(email.value);
      if (docSnap) {
        user.setUserData(docSnap);
        return router.push('/');
      } else {
        return router.push('/login');
      }
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
</script>
