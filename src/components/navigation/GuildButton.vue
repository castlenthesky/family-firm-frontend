<template>
  <router-link :to="link">
    <div class="squircle">
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
      <div class="tooltip">
        <div class="tooltiptext">{{ props.tooltip }}</div>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
const props = defineProps({
  link: {
    type: String,
    default: '/',
  },
  tooltip: String,
  backgroundColor: String,
});
</script>

<style lang="scss">
:root {
  --color-blurple: #7289da;
  --color-fantastic-green: #00ae7a;
  --color-full-white: #ffffff;
  --color-grey-white: #b9bbbe;
  --color-lighter-dark: #45494e;
  --color-dark: #2c2f33;
  --color-grey-dark: #242629;
  --color-not-quite-black: #23272a;
  --color-actually-black: #000000;
}

.squircle {
  background-color: var(--color-blurple);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: border-radius 200ms, background 200ms, color 200ms;

  &:hover {
    border-radius: 33%;

    & .tooltip .tooltiptext {
      visibility: visible;
    }
    &::before {
      transform: translate(-100%, -50%) scale(0.5);
    }
  }

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    background: var(--color-full-white);
    position: absolute;
    border-radius: 5px;
    top: 50%;
    transform: translate(-100%, -50%) scale(0);
    transition: transform 200ms;
  }

  & img[src$='.jpg'] {
    position: relative;
    width: inherit;
    height: inherit;
    border-radius: inherit;
  }
  & img[src$='.png'] {
    position: relative;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    fill: white;
  }
  & svg {
    position: relative;
    border-radius: inherit;
    fill: white;
  }
}

.tooltip {
  position: relative;
  left: 60%;
}

.tooltip .tooltiptext {
  visibility: hidden;
  background-color: black;
  width: max-content;
  height: 24px;
  top: 50%;
  font-size: 0.75rem;
  position: absolute;
  color: #fff;
  text-align: left;
  border-radius: 5px;
  padding: 3px 10px;
  z-index: 1;
  transform: translateY(-50%);
}

.tooltip .tooltiptext::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent black transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
