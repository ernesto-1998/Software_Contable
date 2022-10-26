<template>
    <div class="table-container">
        <div class="q-pa-md">
            <q-table
            class="my-sticky-column-table"
            :title="props.title"
            :rows="props.rows"
            :columns="props.colums"
            row-key="name"
            />
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
    title: String,
    columns: Array,
    rows: Array
})

// const columns = [
//   {
//     name: 'name',
//     required: true,
//     label: 'Dessert (100g serving)',
//     align: 'left',
//     field: row => row.name,
//     format: val => `${val}`,
//   },
//   { name: 'calories', align: 'center', label: 'Calories', field: 'calories' },
//   { name: 'fat', label: 'Fat (g)', field: 'fat' },
//   { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
//   { name: 'protein', label: 'Protein (g)', field: 'protein' },
//   { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
//   { name: 'calcium', label: 'Calcium (%)', field: 'calcium' },
//   { name: 'iron', label: 'Iron (%)', field: 'iron' }
// ]

// const rows = [
//   {
//     name: 'Frozen Yogurt',
//     calories: 159,
//     fat: 6.0,
//     carbs: 24,
//     protein: 4.0,
//     sodium: 87,
//     calcium: '14%',
//     iron: '1%'
//   },
//   {
//     name: 'Ice cream sandwich',
//     calories: 237,
//     fat: 9.0,
//     carbs: 37,
//     protein: 4.3,
//     sodium: 129,
//     calcium: '8%',
//     iron: '1%'
//   },
 
// ]
</script>
<style>
    .my-sticky-column-table {
        max-width: 100%;
    }
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  

  thead tr:first-child th:first-child {
    background-color: #fff;
  }
    /* bg color is important for th; just specify one */
    

  td:first-child {
    background-color: #f5f5dc;
  }

  th:first-child,
  td:first-child {
    position: sticky;
    left: 0;
    z-index: 1;
  }
</style>