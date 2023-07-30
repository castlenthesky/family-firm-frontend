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

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  const user = ref<User | null>(null);
  const isReady = ref(false);

  function setIsReady(readyState: boolean) {
    isReady.value = readyState;
  }

  function userSet(userState: User | null) {
    user.value = userState;
    console.log('User state changed:', user.value?.email);
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
      userSet(authResult.user);
      return;
    } else {
      throw new Error('Invalid username or password.');
    }
  }

  async function userLogout() {
    await firebaseAuth.signOut();
    userSet(null);
    router.push('/login');
  }

  return {
    user,
    isReady,
    setIsReady,
    userSet,
    userRegister,
    userLogin,
    userLogout,
  };
});

const unsub = onAuthStateChanged(firebaseAuth, (user) => {
  const authStore = useAuthStore();
  authStore.setIsReady(true);
  authStore.userSet(user);
  unsub();
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
