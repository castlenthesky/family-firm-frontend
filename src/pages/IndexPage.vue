<template>
  <div class="row">Welcome to the home page!!</div>

  <PlaidLink
    clientName="Vue Test"
    env="sandbox"
    public_key="dbaef5e48f1ccc027c209c029ef395"
    :products="['auth', 'transactions']"
    webhook="https://requestb.in"
    :onSuccess="onSuccess"
    :onExit="onExit"
    :onEvent="onEvent"
  >
    <q-btn color="primary">Call Plaid Link</q-btn>
  </PlaidLink>
</template>

<script setup lang="ts">
import PlaidLink from 'components/plaid/PlaidLink.vue';

function onEvent(eventName: string, metadata: any) {
  console.log(eventName);
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
  return;
}

function onExit() {
  return;
}
</script>
