<template>
  <ChannelList guildName="Brian" :channels="channelsBrian" />
</template>

<script setup lang="ts">
import ChannelList from 'src/components/navigation/ChannelList.vue';
const channelsBrian = [
  {
    name: 'Home',
    link: '/brian/home',
    icon: 'home',
  },
  {
    name: 'Physical',
    link: '/brian/physical',
    icon: 'fitness_center',
  },
  {
    name: 'Social',
    link: '/brian/social',
    icon: 'waving_hand',
  },
  {
    name: 'Spiritual',
    link: '/brian/spiritual',
    icon: 'self_improvement',
  },
  {
    name: 'Professional',
    link: '/brian/professional',
    icon: 'work',
  },
  {
    name: 'Something',
    link: '/brian/professional',
    icon: 'money',
  },
];
</script>
