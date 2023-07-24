<template>
  <div>
    <h1>Auth > Register</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Submit</button></p>
    <hr />
    <p>Already have a login? <a href="/login">Click here</a> to log in.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/stores/userStore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from 'src/boot/firebase';
import { doc, setDoc } from 'firebase/firestore';

const user = useUserStore();
const router = useRouter();
const email = ref('');
const password = ref('');

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(async () => {
      await writeUser(email.value);
      user.email = email.value;
      return router.push('/');
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
  return;
};

const writeUser = async (userEmail: string) => {
  setDoc(doc(db, 'users', userEmail), {
    email: userEmail,
  });
};
</script>
