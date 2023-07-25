<template>
  <div class="flex">
    <div class="row">
      <div class="col-6"><h1>User Profile</h1></div>
      <div class="col-6">{{ user.$state }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores';

const user = useUserStore();
</script>
