import { computed, ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { firebaseAuth } from 'src/boot/firebase';
import { getUserData } from 'src/services/users';

export const useUserStore = defineStore('user', () => {
  const userAuth = ref<string>();
  const userEmail = ref<string>();
  const userName = ref<string>();
  const userAccess = ref<string[]>();
  const userMembership = ref<string[]>();

  const userAge = computed(() => 1 + 1);

  function userLogin() {
    console.log('User Logging In...');
  }

  async function setUserAuth(authEmail: string) {
    userAuth.value = authEmail;
  }

  async function setUserData(emailInput: string) {
    const databaseResponse = await getUserData(emailInput);
    if (!emailInput && databaseResponse) {
      userEmail.value = databaseResponse.email;
      userName.value = databaseResponse.name;
      userAccess.value = databaseResponse.access;
      userMembership.value = databaseResponse.membership;
      console.log('Logged in as:', userEmail.value);
    } else {
      return;
    }
  }

  async function resetStore() {
    userEmail.value = '';
    userName.value = '';
    userAccess.value = [];
    userMembership.value = [];
  }

  async function logout() {
    firebaseAuth.signOut();
    window.location.href = '/login';
  }

  return { userAuth, userEmail, userName, userAccess, userMembership, userAge };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
