import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { db, firebaseAuth } from 'src/boot/firebase';
import { doc, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  onAuthStateChanged,
} from 'firebase/auth';
import { useUserStore } from './userStore';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const userStore = useUserStore();

  const auth = ref<User | null>(null);
  const isReady = ref(false);

  function isReadySet(readyState: boolean) {
    isReady.value = readyState;
  }

  async function userSet(userState: User | null) {
    auth.value = userState;
    await userStore.userDataSet(auth.value?.email);
    isReady.value = userState ? true : false;
    console.log('User state changed:', auth.value?.email);
  }

  async function userRegister(user: { email: string; password: string }) {
    const registrationResult = await createUserWithEmailAndPassword(
      firebaseAuth,
      user.email,
      user.password
    );
    if (registrationResult) {
      setDoc(doc(db, 'users', user.email), {
        email: user.email,
      });
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
      await userSet(authResult.user);
      return;
    } else {
      throw new Error('Invalid username or password.');
    }
  }

  async function userLogout() {
    await firebaseAuth.signOut();
    router.push('/login');
    userSet(null);
  }

  return {
    auth,
    isReady,
    isReadySet,
    userSet,
    userRegister,
    userLogin,
    userLogout,
  };
});

const unsub = onAuthStateChanged(firebaseAuth, (user) => {
  const authStore = useAuthStore();
  authStore.userSet(user);

  if (user && user.email) {
    authStore.isReadySet(true);
  } else {
    authStore.isReadySet(false);
  }
  unsub();
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
