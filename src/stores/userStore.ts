import { ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

import { getUserData } from 'src/services/users';
import { firebaseAuth } from 'src/boot/firebase';
// import { useFamilyStore } from './familiyStore';

// const familyStore = useFamilyStore();

export const useUserStore = defineStore('user', () => {
  const router = useRouter();

  // State
  const userAuth = ref<string>('');
  const userEmail = ref<string>('');
  const userName = ref<string>('');
  const userAccess = ref<string[]>();
  const userMembership = ref<string[]>();
  const userActiveFamily = ref({ id: '', name: '' });

  // Getters / Computed
  // const userAge = computed(() => 1 + 1);

  // Actions
  const signIn = async (userData: { email: string; password: string }) => {
    await signInWithEmailAndPassword(
      getAuth(),
      userData.email,
      userData.password
    );

    const databaseRecord = await getUserData(userData.email);

    if (databaseRecord && databaseRecord.email == userData.email) {
      await setUserAuth(userData.email);
      await setUserData(userData.email);
      router.push('/');
    } else {
      userAuth.value = '';
      router.push('/login');
    }
  };

  async function signOut() {
    await firebaseAuth.signOut();
    userAuth.value = '';
    userEmail.value = '';
    router.push('/login');
  }

  async function setUserAuth(authEmail: string) {
    userAuth.value = authEmail;
  }

  async function setUserData(emailInput: string) {
    const databaseResponse = await getUserData(emailInput);
    if (databaseResponse) {
      userEmail.value = databaseResponse.email;
      userName.value = databaseResponse.name;
      userAccess.value = databaseResponse.access;
      userMembership.value = databaseResponse.membership;
      console.log('Logged in as:', userEmail.value);
    } else {
      return;
    }
  }

  return {
    signIn,
    signOut,
    setUserData,
    userAuth,
    userEmail,
    userName,
    userAccess,
    userMembership,
    userActiveFamily,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
