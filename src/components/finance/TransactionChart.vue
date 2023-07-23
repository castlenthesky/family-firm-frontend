<template>
  <div class="canvas"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';

onMounted(() => {
  const transactionData = ref([
    {
      date: '2023/07/19',
      category: 'Drugs',
      subcategory: 'Drug Den',
      amount: 27.23,
    },
    { amount: 41.23, category: 'Entertainment', subcategory: 'Movies' },
    {
      date: '2023/07/17',
      category: 'Education',
      subcategory: 'Tuition',
      amount: 17.22,
    },
    {
      date: '2023/07/24',
      category: 'Income',
      subcategory: 'Salary 01',
      amount: 7.29,
    },
    { amount: 75, subcategory: 'Bank Fees', category: 'Fees & Charges' },
    { subcategory: 'Dog Wash', category: 'Pets', amount: 23.32 },
  ]);

  const margin = {
    top: 20,
    right: 20,
    bottom: 100,
    left: 100,
  };

  const canvasWidth = 600;
  const canvasHeight = 600;

  const graphWidth = canvasWidth - margin.left - margin.right;
  const graphHeight = canvasHeight - margin.top - margin.bottom;

  const y_min = d3.min(transactionData.value, (d) => d.amount);
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
    .attr('width', canvasWidth)
    .attr('height', canvasHeight);

  const graph = svg
    .append('g') // Append a group
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left},${margin.top})`);

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
