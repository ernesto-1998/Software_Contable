<template>
    <div class="seccion-container">
      <div class="title-container">
        <label>{{ props.title }}</label>
      </div>
      <table class="table-container">
        <tr class="table-titles_container">
          <th class="table-rows" v-for="(item, index) in props.columns" :key="index">
            <label> {{ item }} </label>
          </th>
        </tr>
        <tr class="table-rows_container">
          <td class="table-rows" align="center" v-for="(item, index) in props.rows" :key="index">
            <label> {{ item }} </label>
          </td>
        </tr>
        <tr v-if="rows.length > 1" class="table-rows_container">
          <td class="table-rows" align="center" v-for="(item, index) in props.rows[1]" :key="index">
            <label> {{ item }} </label>
          </td>
        </tr>
        <tr v-if="rows.length > 2" class="table-rows_container">
          <td class="table-rows" align="center" v-for="(item, index) in props.rows[2]" :key="index">
            <label> {{ item }} </label>
          </td>
        </tr>
        <tr v-if="rows.length > 3" class="table-rows_container">
          <td class="table-rows" align="center" v-for="(item, index) in props.rows[3]" :key="index">
            <label> {{ item }} </label>
          </td>
        </tr>
        <tr v-if="rows.length > 4" class="table-rows_container">
          <td class="table-rows" align="center" v-for="(item, index) in props.rows[4]" :key="index">
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
    rows: Array
})

</script>
<style>

.seccion-container {
  width: 90%;
  margin: auto;
}

.title-container {
  font-size: 1.5rem;
}

.table-container {
  background-color: var(--table-color);
  width: 100%;
  margin-top: 0.8rem;
}

.table-rows {
  padding: 0.5rem;
}
</style>