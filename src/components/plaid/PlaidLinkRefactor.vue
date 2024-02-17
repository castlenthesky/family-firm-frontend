<template>
  <div @click="linkOpen" :style="{ display: 'inline' }">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { CountryCode, Products } from 'plaid';
import { plaid } from 'src/boot/plaid';

const link_token = ref('');

const props = defineProps({
  clientName: String,
  env: String,
  public_key: String,
  products: Array,
  receivedRedirectUri: String,
  webhook: String,
  onLoad: Function,
  onSuccess: Function,
  onExit: Function,
  onEvent: Function,
});

const plaidLink = ref(null);

// Function to initialize Plaid
function initializePlaid() {
  if (window.Plaid) {
    plaidLink.value = window.Plaid;
  } else {
    const script = document.createElement('script');
    script.src = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';
    script.onload = () => {
      plaidLink.value = window.Plaid;
    };
    document.body.appendChild(script);
  }
}

onMounted(async () => {
  initializePlaid();

  const { data: link_token_response } = await plaid.linkTokenCreate({
    client_name: 'Famliy Firm',
    language: 'en',
    country_codes: [CountryCode.Us],
    user: { client_user_id: 'somebody' },
    products: [Products.Transactions],
    required_if_supported_products: [
      Products.Investments,
      Products.Liabilities,
      Products.Assets,
    ],
  });
  link_token.value(link_token_response.link_token);
});

// Reactive effect to watch for plaid initialization
watchEffect(() => {
  if (plaid.value) {
    // Plaid is available, you can now do something with it
    // For example, initialize your link handler here
  }
});

function linkOpen(e) {
  e.preventDefault();
  // Ensure Plaid is initialized
  if (!plaid.value) {
    console.error('Plaid not initialized');
    return;
  }

  // Your logic here, using plaid.value.create(...)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
