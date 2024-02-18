<template>
  <router-link :to="link">
    <li class="squircle green-boi">
      <slot name="icon" class="server-image">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
      </slot>
      <div class="tooltip-container">
        <h4 class="tooltip-text">{{ tooltip }}</h4>
      </div>
    </li>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  link: String,
  colorClass: String,
  tooltip: String,
});
</script>

<style>
.squircle {
  background: var(--color-lighter-dark);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  transition: border-radius 128ms, background 128ms, color 128ms;
  display: flex;
  justify-content: center;
  align-items: center;
}
.squircle:hover {
  border-radius: 33%;
}
.squircle:hover::before {
  transform: translate(-102%, -50%) scale(0.5);
}
.squircle::before {
  content: '';
  background: var(--color-full-white);
  width: 100%;
  height: 150%;
  position: absolute;
  border-radius: 33%;
  top: 50%;
  transform: translate(-100%, -50%) scale(0);
  transition: transform 180ms;
}
.squircle:hover .tooltip-container {
  opacity: 1;
  transform: translateY(-50%) scale(1);
}

.purple-boi:hover {
  background: var(--color-blurple);
}

.green-boi {
  color: var(--color-fantastic-green);
}
.green-boi:hover {
  background: var(--color-fantastic-green);
  color: var(--color-full-white);
}
.green-boi:first-child {
  width: inherit;
  border-radius: inherit;
}

.tooltip-container {
  background: var(--color-actually-black);
  height: 70%;
  padding: 0.68rem 1rem;
  position: absolute;
  top: 50%;
  left: 125%;
  transform-origin: left;
  transform: translateY(-50%) scale(0.98);
  max-width: 256px;
  width: max-content;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 200ms, transform 128ms;
  pointer-events: none;
  color: var(--color-full-white);
}

.tooltip-container::before {
  content: '';
  background: var(--color-actually-black);
  position: absolute;
  left: -2px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  width: 24px;
  height: 24px;
  z-index: -1;
}

.tooltip-text {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  padding: 0;
  margin: 0;
  font-size: 1em;
}
.server-image {
  width: inherit;
  border-radius: inherit;
}
</style>
