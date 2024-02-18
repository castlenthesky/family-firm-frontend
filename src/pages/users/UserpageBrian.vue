<template>
  <div class="squircle">
    <!-- <router-link to="/lin"> -->
    <div class="server-image">
      <slot></slot>
    </div>
    <!-- </router-link> -->
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
:root {
  --color-blurple: #7289da;
  --color-fantastic-green: #00ae7a;
  --color-full-white: #ffffff;
  --color-lighter-dark: #45494e;
  --color-dark: #2c2f33;
  --color-not-quite-black: #23272a;
  --color-actually-black: #000000;
}
.squircle {
  background-color: var(--color-blurple);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: color 128ms border-radius 128ms, background 128ms;

  &:hover {
    border-radius: 33%;

    &::before {
      transform: translate(-100%, -50%) scaleX(0.15) scaleY(0.3);
    }
  }

  &::before {
    content: '';
    background: var(--color-full-white);
    width: 100%;
    height: 125%;
    position: absolute;
    border-radius: 33%;
    top: 50%;
    transform: translate(-100%, -50%) scale(0);
    transition: transform 180ms;
  }
}

.server-image {
  background-color: var(--q-primary);
  width: inherit;
  height: inherit;
  border-radius: inherit;
  transition: border-radius 128ms;
  opacity: 0.1;
}
</style>
