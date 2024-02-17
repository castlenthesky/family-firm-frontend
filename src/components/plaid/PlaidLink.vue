<template>
  <div @click="link_open" :style="{ display: 'inline' }">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  clientName: String,
  env: {
    type: String,
    required: true,
    default: 'development',
    validator: (value) =>
      ['sandbox', 'development', 'production'].includes(value),
  },
  link_token: String,
  public_key: String,
  products: Array,
  webhook: String,
  onLoad: Function,
  onEvent: Function,
  onSuccess: Function,
  onExit: Function,
  receivedRedirectUri: String,
});

const plaidLink = ref(null);
const linkHandler = ref(null);

function link_open(e) {
  e.preventDefault();

  if (plaidLink.value != null) {
    // destroy link handler to prevent stacking of iframes
    linkHandler.value?.destroy();
    linkHandler.value = null;

    linkHandler.value = plaidLink.value.create({
      clientName: props.clientName,
      env: props.env,
      key: props.public_key,
      product: props.products,
      receivedRedirectUri: props.receivedRedirectUri,
      token: props.link_token,
      webhook: props.webhook,
      onLoad: () => props.onLoad(),
      onSuccess: (public_token, metadata) =>
        props.onSuccess(public_token, metadata),
      onExit: (err, metadata) => props.onExit(err, metadata),
      onEvent: (eventName, metadata) => props.onEvent(eventName, metadata),
    });

    linkHandler.value.open();
  }
}

onMounted(() => {
  if (window.Plaid) {
    plaidLink.value = window.Plaid;
    return;
  }

  const linkScript = document.createElement('script');
  linkScript.async = true;
  linkScript.src = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';
  document.head.appendChild(linkScript);

  linkScript.onload = () => (plaidLink.value = window.Plaid);
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
