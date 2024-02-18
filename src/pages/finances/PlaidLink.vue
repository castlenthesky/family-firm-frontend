<template>
  <div class="row">Welcome to the home page!!</div>

  <!-- <q-btn @click="setLinkToken">Get Link Token</q-btn> -->

  <PlaidLink
    clientName="Family Firm"
    env="development"
    :products="['transactions', 'balance', 'assets', 'investments']"
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
import { ref } from 'vue';
import { CountryCode, Products } from 'plaid';
import { plaid } from 'src/boot/plaid';
import { axios } from 'src/boot/axios';
import PlaidLink from 'components/plaid/PlaidLink.vue';

const link_token = ref('');
plaid
  .linkTokenCreate({
    client_name: 'Family Firm',
    language: 'en',
    country_codes: [CountryCode.Us],
    user: { client_user_id: 'internal_user_id' },
    required_if_supported_products: [
      Products.Balance,
      Products.Transactions,
      Products.Assets,
      Products.Investments,
    ],
  })
  .then((response) => {
    link_token.value = response.data.link_token;
    console.log(link_token);
  });

// axios
//   .post(
//     'http://localhost:4000/api/auth/linktokencreate',
//     JSON.stringify({ user_id: 'testing_user' }),
//     { headers: { 'Content-Type': 'application/json' } }
//   )
//   .then((response) => {
//     const { data: response_data } = response;
//     link_token.value = response_data.link_token;
//   });

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
