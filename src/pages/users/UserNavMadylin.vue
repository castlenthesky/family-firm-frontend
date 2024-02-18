<template>
  <div class="row"><h5>User Profile</h5></div>
  <div class="row">
    <div class="col-6">{{ user.$state }}</div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../../stores';

const user = useUserStore();
</script>
