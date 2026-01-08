<script lang="ts" setup>
export interface BasicColumn {
  title: string;
  dataIndex: string;
  width?: string
}

const props = defineProps<{
  columns: BasicColumn[];
  dataSource: any[];
}>();
</script>

<template>
  <div class="basic-table">
    <table>
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.dataIndex" :style="{width: col.width}">
            {{ col.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in dataSource" :key="index">
          <td v-for="col in columns" :key="col.dataIndex">
            {{ row[col.dataIndex] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.basic-table table {
  width: 100%;
  border-collapse: collapse;
}
.basic-table th, .basic-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.basic-table th {
  background-color: #f2f2f2;
}
</style>