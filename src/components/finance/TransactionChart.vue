<template>
  <div class="canvas"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from 'src/boot/firebase';
import { collection, getDocs } from 'firebase/firestore';
import * as d3 from 'd3';

const transactionData = ref([]);

const chart = {
  canvasHeight: 250,
  canvasWidth: 600,
  margin: {
    top: 20,
    right: 20,
    bottom: 60,
    left: 100,
  },
};

const update = (data) => {
  // Update domain of scales
};

onMounted(async () => {
  await getDocs(collection(db, 'transactions')).then((querySnapshot) => {
    transactionData.value = [];
    querySnapshot.forEach((doc) => {
      transactionData.value.push(doc.data());
    });
  });

  const graphWidth = chart.canvasWidth - chart.margin.left - chart.margin.right;
  const graphHeight =
    chart.canvasHeight - chart.margin.top - chart.margin.bottom;

  // const y_min = d3.min(transactionData.value, (d) => d.amount);
  const y_max = d3.max(transactionData.value, (d) => d.amount);

  const yScaler = d3.scaleLinear([0, y_max], [graphHeight, 0]);
  const xScaler = d3
    .scaleBand()
    .domain(transactionData.value.map((transaction) => transaction.category))
    .range([0, graphWidth])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  let svg = d3
    .select('.canvas')
    .append('svg')
    .attr('width', chart.canvasWidth)
    .attr('height', chart.canvasHeight);

  const graph = svg
    .append('g') // Append a group
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${chart.margin.left},${chart.margin.top})`);

  const xAxisGroup = graph
    .append('g')
    .attr('transform', `translate(0,${graphHeight})`);
  const yAxisGroup = graph.append('g');

  // join data to the rectangles
  const dataBars = graph.selectAll('rect').data(transactionData.value);

  // add attrs to circles already in the DOM
  dataBars
    .attr('fill', 'grey')
    .attr('width', xScaler.bandwidth())
    .attr('height', (d) => graphHeight - yScaler(d.amount))
    .attr('x', (d) => xScaler(d.category))
    .attr('y', (d) => yScaler(d.amount));

  // append bars to the svg for new data
  dataBars
    .enter()
    .append('rect')
    .attr('fill', 'grey')
    .attr('width', xScaler.bandwidth())
    .attr('height', (d) => graphHeight - yScaler(d.amount))
    .attr('x', (d) => xScaler(d.category))
    .attr('y', (d) => yScaler(d.amount));

  const xAxis = d3.axisBottom(xScaler);
  const yAxis = d3
    .axisLeft(yScaler)
    .ticks(10)
    .tickFormat((d) => '$' + d);

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  xAxisGroup
    .selectAll('text')
    .attr('text-anchor', 'end')
    .attr('transform', 'rotate(-35)');
});
</script>
