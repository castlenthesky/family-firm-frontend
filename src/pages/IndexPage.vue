<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card dark bordered class="bg-grey-9 my-card">
        <q-card-section>
          <div class="text-h6">Your Custom Data</div>
          <!-- <div class="text-subtitle2">by John Doe</div> -->
        </q-card-section>

        <q-separator dark inset />

        <q-card-section>
          <VerticalBar />
        </q-card-section>
        <q-card-actions align="around">
          <q-btn flat>Action 1</q-btn>
          <q-btn flat>Action 2</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ChartBar from 'components/charting/ChartHorizontalBar.vue';
import VerticalBar from 'components/charting/ChartVerticalBar.vue';
</script>
