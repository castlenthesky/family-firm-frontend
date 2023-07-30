import { ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

import { getUserData } from 'src/services/users';
import { firebaseAuth } from 'src/boot/firebase';
import { useFamilyStore } from './familyStore';

export const useUserStore = defineStore('user', () => {
  const router = useRouter();
  const familyStore = useFamilyStore();

  const isReady = ref(false);

  // State
  const userAuth = ref<string>('');
  const userEmail = ref<string>('');
  const userName = ref<string>('');
  const userAccess = ref<string[]>();
  const userMembership = ref();
  const userActiveFamily = ref({ id: '', name: '' });

  // Getters / Computed
  // const userAge = computed(() => 1 + 1);

  // Actions
  async function isReadySet(readyState: boolean) {
    isReady.value = readyState;
  }

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
      if (userMembership.value && userMembership.value.length == 1) {
        const offset = userMembership.value[0]._key.path.offset + 1;
        console.log();
        await familyStore.getActiveFamilyData(
          userMembership.value[0]._key.path.segments[offset]
        );
        isReadySet(true);
      }
      router.push('/');
    } else {
      userAuth.value = '';
      isReadySet(false);
      router.push('/login');
    }
  };

  async function signOut() {
    await firebaseAuth.signOut();
    userAuth.value = '';
    userEmail.value = '';
    isReadySet(false);
    router.push('/login');
  }

  async function setUserAuth(authEmail: string) {
    userAuth.value = authEmail;
  }

  async function setUserData(emailInput: string) {
    console.log('Getting data for', emailInput);
    const databaseResponse = await getUserData(emailInput);
    if (databaseResponse) {
      userEmail.value = databaseResponse.email;
      userName.value = databaseResponse.name;
      userAccess.value = databaseResponse.access;
      userMembership.value = databaseResponse.membership;
      console.log('Logged in as:', userEmail.value);
      isReadySet(true);
    } else {
      return;
    }
  }

  return {
    isReady,
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
