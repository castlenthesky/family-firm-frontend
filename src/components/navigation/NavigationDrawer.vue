<template>
  <div class="leftNavigation">
    <div class="leftNavigationPrimary">
      <GuildButton link="/" tooltip="Home">
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"
            />
          </svg>
        </template>
      </GuildButton>
      <div class="divider"></div>
      <GuildButton
        v-for="guild in guilds"
        :key="guild.name"
        :link="guild.link"
        :tooltip="guild.name"
      >
        <template #icon>
          <img :src="guild.image" alt="" />
        </template>
      </GuildButton>
    </div>
    <div class="leftNavigationSecondary">
      <router-view name="navContent"></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import GuildButton from 'src/components/navigation/GuildButton.vue';
import ChannelList from './ChannelList.vue';

const guilds = [
  {
    name: 'Brian',
    link: '/brian',
    image: '/brian.jpg',
    icon: 'someting',
    tooltip: 'Brian',
  },
  {
    name: 'Lin',
    link: '/lin',
    image: '/lin.jpg',
    icon: 'someting',
    tooltip: 'Lin',
  },
  {
    name: 'Meloody',
    link: '/melody',
    image: '/melody.jpg',
    icon: 'someting',
    tooltip: 'Melody',
  },
];
</script>

<style lang="scss">
.leftNavigation {
  position: absolute;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: row;

  & .leftNavigationPrimary {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    box-sizing: border-box;
  }
  & .leftNavigationSecondary {
    padding: 0;
    margin: 0;
    min-height: 100vh;
  }
}

.divider {
  background-color: white;
  width: 100%;
  height: 2px;
  opacity: 0.15;
  border-radius: 10px;
  transform: scale(0.666);
}
</style>
