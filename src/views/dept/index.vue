<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { getDeptList } from '@/api/dept'
// //测试数据
//   const tableData = [
//   {
//     index: '2016-05-03',
//     name: 'Tom',
//     updateTime: '2026-3-25',
//   },
//   {
//     index: '2016-05-02',
//     name: 'Tom',
//     updateTime: '2026-3-25',
//   },
//   {
//     index: '2016-05-04',
//     name: 'Tom',
//     updateTime: '2026-3-25',
//   },
//   {
//     index: '2016-05-01',
//     name: 'Tom',
//     updateTime: '2026-3-25',
//   },
// ]
const tableData = ref([])
function handleEdit(index, row) {
  console.log(index, row);
}
function handleDelete(index, row) {
  console.log(index, row);
}

const getDept = async () => {
  const res = await getDeptList()
  console.log(res);
  tableData.value = res.data
}

onMounted(() => {
  getDeptList().then(res => {
    console.log(res);
    tableData.value = res.data
  })
})
</script>

<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="id" label="序号" width="180" />
    <el-table-column prop="name" label="部门名称" width="180" />
    <el-table-column prop="updateTime" label="最后修改时间" width="180" />
    <el-table-column prop="operate" label="操作" >
      <template #default="scope">
        <el-button  @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-button type="success" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>
