<template>
  <div>
    <h1>Auth > Login</h1>
    <div>
      <h5>Login</h5>
      <q-form autofocus>
        <div class="flex row q-col-gutter-sm">
          <div class="col-12">
            <q-input
              outlined
              dense
              type="text"
              label="Email"
              placeholder="Email"
              v-model="userInputs.email"
            />
          </div>
          <div class="col-12">
            <q-input
              outlined
              dense
              type="password"
              label="Password"
              placeholder="Password"
              v-model="userInputs.password"
            />
          </div>
          <div class="col-12">
            <div class="row justify-around">
              <div class="col-4 button-container">
                <q-btn
                  color="positive"
                  label="Login/Register"
                  type="submit"
                  @submit="user.signIn(userInputs)"
                />
              </div>
              <div class="col-4 button-container">
                <q-btn color="negative" label="Reset" type="reset" />
              </div>
            </div>
          </div>
        </div>
      </q-form>
    </div>
    <hr />
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p><a href="/register">Click here to register</a></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import { signIn } from 'src/services/users';
import { useUserStore } from 'src/stores';

const user = useUserStore();

const userInputs = ref({
  email: '',
  password: '',
});

const errorMessage = ref('');
</script>

<style lang="scss">
.button-container > button {
  width: 100%;
}
</style>
