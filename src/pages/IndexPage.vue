<template>
  <div class="row">Welcome to the home page!!</div>

  <!-- <q-btn @click="setLinkToken">Get Link Token</q-btn> -->

  <PlaidLink
    clientName="Family Firm"
    env="development"
    :products="['transactions']"
    :link_token="link_token"
    :onLoad="onLoad"
    :onEvent="onEvent"
    :onSuccess="onSuccess"
    :onExit="onExit"
    webhook="https://requestb.in"
  >
    <q-btn color="primary">Add Bank/Credit Card</q-btn>
  </PlaidLink>
</template>

<script setup lang="ts">
import config from 'src/config';
import { axios } from 'src/boot/axios';
import PlaidLink from 'components/plaid/PlaidLink.vue';
import { plaid } from 'src/boot/plaid';
import { ref } from 'vue';

const link_token = ref('');
axios
  .post(
    'http://localhost:4000/api/auth/linktokencreate',
    JSON.stringify({ user_id: 'testing_user' }),
    { headers: { 'Content-Type': 'application/json' } }
  )
  .then((response) => {
    const { data: response_data } = response;
    link_token.value = response_data.link_token;
  });

function onEvent(eventName: string, metadata: any) {
  console.log(eventName);
  return;
}

function onLoad() {
  console.log('Loading Link');
  return;
}

function onSuccess(
  public_token: string,
  metadata: {
    link_session_id: string;
  }
) {
  console.log(`Public Token: ${public_token}
  Metadata: ${metadata}`);
  axios
    .post(
      'https://development.plaid.com/item/public_token/exchange',
      JSON.stringify({
        client_id: config.plaid.client_id,
        secret: config.plaid.client_secret,
        public_token: public_token,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => {
      console.log(response);
    });
  return;
}

function onExit() {
  return;
}
</script>
