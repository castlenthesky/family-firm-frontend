<template>
  <div class="channelList row">
    <div class="guildHeader col-md-12">
      <q-btn
        square
        class="guildHeaderButton full-width"
        color="primary"
        icon-right="expand_more"
        align="between"
        :label="guildName"
      >
        <q-menu fit class="guildMenu">
          <q-list style="min-width: 100px">
            <q-item clickable>
              <q-item-section>New tab</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>New incognito tab</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>Recent tabs</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>History</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Downloads</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>Settings</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>Help &amp; Feedback</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
    <div class="channelContainer row">
      <q-item
        v-for="channel in channels"
        :key="channel.name"
        clickable
        v-ripple
        :active="link === channel.name"
        :to="channel.link"
        @click="setActiveLink(channel.name)"
        class="channelInacitve"
        active-class="channelActive"
      >
        <q-item-section avatar>
          <q-icon :name="channel.icon" />
        </q-item-section>

        <q-item-section>{{ channel.name }}</q-item-section>
      </q-item>
    </div>
    <div class="userStatus row">User Status Here</div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';

interface GuildChannel {
  name: string;
  link: string;
  icon: string;
}

const link = ref('Home');

defineProps({
  guildName: String,
  channels: {
    type: Array as PropType<GuildChannel[]>,
  },
});

function setActiveLink(linkName: string): void {
  link.value = linkName;
}
</script>

<style scoped lang="scss">
.channelList {
  width: 100%;
}

.guildHeader {
  height: 50px;
  display: block;
}

.guildHeaderButton {
  height: 50px;
  background-color: rgb(67, 78, 88);
}

.guildMenu {
  margin: 5px;
  padding: 5px;
}

.channelInacitve {
  // background-color: gray;
  border-radius: 4px;
  margin: 4px 4px 0px 4px;
  width: 100%;
}

.channelActive {
  background-color: #434447;
  color: whitesmoke;
  border-radius: 4px;
  margin: 4px 4px 0px 4px;
  width: 100%;
}

.channelContainer {
  & q-icon {
    color: rgb(84, 86, 92);
  }
}

.userStatus {
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: $primary;
  width: 100%;
  height: 50px;
}
</style>
