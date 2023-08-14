<template>
  <div class="canvas"></div>
  <div class="row">
    <!-- {{ transactionData }} -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from 'src/boot/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import * as d3 from 'd3';
import { useFamilyStore } from 'src/stores';

const familyStore = useFamilyStore();

const svg = ref(),
  graph = ref(),
  xAxisGroup = ref(),
  yAxisGroup = ref(),
  xAxis = ref(),
  yAxis = ref();

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

const transactionData = ref([]);

const graphWidth = chart.canvasWidth - chart.margin.left - chart.margin.right;
const graphHeight = chart.canvasHeight - chart.margin.top - chart.margin.bottom;

const yScaler = d3.scaleLinear().range([graphHeight, 0]);
const xScaler = d3
  .scaleBand()
  .range([0, graphWidth])
  .paddingInner(0.2)
  .paddingOuter(0.2);

xAxis.value = d3.axisBottom(xScaler);
yAxis.value = d3
  .axisLeft(yScaler)
  .ticks(10)
  .tickFormat((d) => '$' + d);

// ########################### Update Function ###########################
const update = () => {
  const y_max = d3.max(transactionData.value, (d) => d.amount);

  console.log('Refreshing charts...');

  // 1. Recalibrate scale domains
  yScaler.domain([0, y_max]);
  xScaler.domain(
    transactionData.value.map((transaction) => transaction.category)
  );

  // 2. Join updated data to elements
  const dataBars = graph.value.selectAll('rect').data(transactionData.value);
  // console.log(dataBars);

  // 3. Remove unwanted (if any) shapes using the exit selection
  dataBars.exit().remove();

  // 4. Update current shapes in the DOM
  dataBars
    .attr('fill', 'grey')
    .attr('width', xScaler.bandwidth())
    // .attr('height', 0)
    .attr('x', (d) => xScaler(d.category))
    // .attr('y', graphHeight)
    .transition()
    .duration(500)
    .attr('height', (d) => graphHeight - yScaler(d.amount))
    .attr('y', (d) => yScaler(d.amount));

  // 5. Apend the enter selection to the DOM
  dataBars
    .enter()
    .append('rect')
    .attr('fill', 'grey')
    .attr('width', xScaler.bandwidth())
    .attr('height', 0)
    .attr('x', (d) => xScaler(d.category))
    .attr('y', graphHeight)
    .transition()
    .duration(500)
    .attr('height', (d) => graphHeight - yScaler(d.amount))
    .attr('y', (d) => yScaler(d.amount));

  // Call axies
  xAxisGroup.value.call(xAxis.value);
  yAxisGroup.value.call(yAxis.value);

  xAxisGroup.value
    .selectAll('text')
    .attr('text-anchor', 'end')
    .attr('transform', 'rotate(-35)');
};

// ########################## Mounted  Function ###########################
onMounted(async () => {
  svg.value = d3
    .select('.canvas')
    .append('svg')
    .attr('width', chart.canvasWidth)
    .attr('height', chart.canvasHeight);

  graph.value = svg.value
    .append('g') // Append a group
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${chart.margin.left},${chart.margin.top})`);

  xAxisGroup.value = graph.value
    .append('g')
    .attr('transform', `translate(0,${graphHeight})`);
  yAxisGroup.value = graph.value.append('g');
});

onSnapshot(
  collection(db, 'families', familyStore.family.id, 'transactions'),
  (response) => {
    response.docChanges().forEach((change) => {
      const docData = {
        ...change.doc.data(),
        id: change.doc.id,
        index: change.newIndex,
        oldIndex: change.type == 'added' ? null : change.oldIndex,
      };

      switch (change.type) {
        case 'added':
          transactionData.value.push(docData);
          break;
        case 'modified':
          transactionData.value[docData.oldIndex] = docData;
          break;
        case 'removed':
          transactionData.value = transactionData.value.filter(
            (transaction) => transaction.index !== docData.oldIndex
          );
          break;
        default:
          break;
      }
    });

    update();
  }
);
</script>
