<template>
    <div class="seccion-container">
      <div class="title-container">
        <label>{{ props.title }}</label>
      </div>
      <table class="table-container">
        <tr class="table-titles_container">
          <th class="table-title" v-for="(item, index) in props.columns" :key="index">
            <label> {{ item }} </label>
          </th>
        </tr>
        <tr class="table-rows_container">
          <td class="table-rows" v-for="(item, index) in props.rows" :key="index">
            <label> {{ item }} </label>
          </td>
        </tr>
        <tr v-if="props.secondRow === true" class="table-rows_container">
          <td class="table-rows" v-for="(item, index) in props.rows" :key="index">
            <label> {{ item }} </label>
          </td>
        </tr>
      </table>
    </div>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
    title: String,
    columns: Array,
    rows: Array,
    secondRow: Boolean
})

</script>
<style>

</style>