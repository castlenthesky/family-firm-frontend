<template>
  <div>
    <svg></svg>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';

onMounted(() => {
  const dataset = ref([250, 210, 170, 130, 90]);
  let rectHeight = 30;

  let svg = d3.select('svg');
  let g = svg.append('g');

  g.selectAll('rect')
    .data(dataset.value)
    .enter()
    .append('rect')
    .attr('x', 0)
    .attr('y', function (d, i) {
      return i * rectHeight;
    })
    .attr('width', function (d) {
      return d;
    })
    .attr('height', rectHeight - 5)
    .attr('fill', 'lightblue');
});
</script>
