<template>
  <div class="leftNavigation">
    <div class="leftNavigationPrimary">
      <SquircleButton link="/" tooltip="Home">
        <template #icon>
          <img
            src="https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/home/default/24px.svg"
            alt=""
          />
        </template>
      </SquircleButton>
      <div class="divider"></div>
      <SquircleButton link="/brian" tooltip="Brian"></SquircleButton>
      <SquircleButton link="/lin" tooltip="Lin"></SquircleButton>
      <SquircleButton link="/melody" tooltip="Melody"></SquircleButton>
    </div>
    <div class="leftNavigationSecondary">
      <router-view name="navContent"></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import SquircleButton from 'src/components/navigation/SquircleButton.vue';
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
