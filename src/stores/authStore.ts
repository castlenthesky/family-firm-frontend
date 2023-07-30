import { computed, ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { firebaseAuth } from 'src/boot/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>();

  function userSet(userState: User) {
    user.value = userState;
    console.log('Auth user:', user.value);
  }

  async function userRegister(user: { email: string; password: string }) {
    console.log('Registering User');
    const registrationResult = await createUserWithEmailAndPassword(
      firebaseAuth,
      user.email,
      user.password
    );
    if (registrationResult) {
      userSet(registrationResult.user);
    } else {
      throw new Error('Registration error.');
    }
  }

  async function userLogin(user: { email: string; password: string }) {
    const authResult = await signInWithEmailAndPassword(
      firebaseAuth,
      user.email,
      user.password
    );
    if (authResult && authResult.user) {
      userSet(authResult.user);
    } else {
      throw new Error('Invalid username or password.');
    }
  }

  async function userLogout() {
    signOut(firebaseAuth);
  }

  return {
    userRegister,
    userLogin,
    userLogout,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
