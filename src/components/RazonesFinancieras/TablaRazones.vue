<template>
  <div class="seccion-container">
    <div class="title-container">
      <label>{{ props.title }}</label>
    </div>
    <div class="body-container">
      <table class="table-container">
        <tr class="table-titles_container bg-secondary">
          <th
            class="table-rows table-title"
            v-for="(item, index) in props.columns"
            :key="index"
          >
            <label> {{ item }} </label>
          </th>
        </tr>
        <tr class="table-rows_container">
          <td
            class="table-rows bg-accent"
            align="center"
            v-for="(item, index) in props.rows[0]"
            :key="index"
          >
            <label> {{ item }} </label>
          </td>
        </tr>
        <tr v-if="rows.length > 1" class="table-rows_container">
          <td
            class="table-rows bg-accent"
            align="center"
            v-for="(item, index) in props.rows[1]"
            :key="index"
          >
            <label> {{ item }} </label>
          </td>
        </tr>
        <tr v-if="rows.length > 2" class="table-rows_container">
          <td
            class="table-rows bg-accent"
            align="center"
            v-for="(item, index) in props.rows[2]"
            :key="index"
          >
            <label> {{ item }} </label>
          </td>
        </tr>
        <tr v-if="rows.length > 3" class="table-rows_container">
          <td
            class="table-rows bg-accent"
            align="center"
            v-for="(item, index) in props.rows[3]"
            :key="index"
          >
            <label> {{ item }} </label>
          </td>
        </tr>
        <tr v-if="rows.length > 4" class="table-rows_container">
          <td
            class="table-rows bg-accent"
            align="center"
            v-for="(item, index) in props.rows[4]"
            :key="index"
          >
            <label> {{ item }} </label>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
  title: String,
  columns: Array,
  rows: Array,
});
</script>
<style scoped>
.seccion-container {
  width: 90%;
  margin: auto;
}

.title-container {
  font-size: 1.5rem;
}

.table-title {
  color: var(--table-color);
}

.body-container {
  overflow-x: auto;
}

.table-container {
  /* background-color: var(--table-color); */
  width: 100%;
  margin-top: 0.8rem;
}

.table-rows {
  padding: 0.5rem;
}
</style>
