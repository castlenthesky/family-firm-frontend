<template>
  <div>
    <svg></svg>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';

onMounted(() => {
  const transactionData = ref([
    {
      amount: 18.23,
      date: '2023/07/19',
      category: 'Entertainment',
      subcategory: 'Drug Den',
    },
    { amount: 41.23, category: 'Entertainment', subcategory: 'Movies' },
    {
      amount: 17.22,
      subcategory: 'Tuition',
      category: 'Education',
      date: '2023/07/17',
    },
    {
      amount: 7.29,
      subcategory: 'Salary 01',
      category: 'Income',
      date: '2023/07/24',
    },
    { amount: 75, subcategory: 'Bank Fees', category: 'Fees & Charges' },
    { subcategory: 'Dog Wash', category: 'Pets', amount: 23.32 },
  ]);

  let svg = d3.select('svg');

  const dataDots = svg.selectAll('circle').data(transactionData.value);

  // add attrs to circles already in the DOM
  dataDots
    .attr('cy', (d) => d.amount)
    .attr('cx', (d) => d.amount)
    .attr('r', (d) => d.amount);

  dataDots
    .enter()
    .append('circle')
    .attr('cy', (d) => d.amount)
    .attr('cx', (d) => d.amount)
    .attr('r', (d) => d.amount / 2);
});
</script>
