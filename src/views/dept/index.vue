<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { getDeptListApi, addDeptApi, getDeptByIdApi, updateDeptApi, deleteDeptApi } from '@/api/dept'
import { ElMessage, ElMessageBox } from 'element-plus';
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

//列表数据
const tableData = ref([])

//修改部门相关
async function handleEdit(index, row) {
  console.log(index, row)
  showDialog.value = true
  formTitle.value = '修改部门'
  const res = await getDeptByIdApi(row.id)
  deptForm.value = res.data
}

async function handleDelete(index, row) {
  console.log(index, row)
  await ElMessageBox.confirm(
    `确定要删除${row.name}吗？`,
    '提醒',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  const res = await deleteDeptApi(row.id)
  if(res.code === 1) {
    ElMessage.success('删除部门成功')
    getDept()
  } else {
    ElMessage.error('删除部门失败')
  }
}

//新增部门相关
const deptFormRef = ref(null)
const deptForm = ref({
  name: ''
})
const formTitle = ref('')
const formRules = ref({
  name: [
    { required: true, message: '请输入部门名称', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 5 个字符', trigger: 'blur' }
  ]
})
const formLabelWidth = ref('120px')
const showDialog = ref(false)
const resetForm = () => {
  deptFormRef.value.resetFields()
}
const addDept = () => {
  showDialog.value = true
  deptForm.value = {name: ''}
  formTitle.value = '添加部门'
}
const saveDept = async () => {
  try {
    await deptFormRef.value.validate()
  } catch (error) {
    // 校验失败，直接返回，不执行后续提交逻辑
    return 
  }
  let res = null
  if (deptForm.value.id) {
    res = await updateDeptApi(deptForm.value)
  } else {
    res = await addDeptApi(deptForm.value)
  }
  console.log(res);
  if(res && res.code === 1) {
    deptForm.value.id == 1 ? ElMessage.success('修改部门成功') : ElMessage.success('添加部门成功')
    showDialog.value = false
    deptForm.value = {}
    getDept()
  } else {
    deptForm.value.id == 1 ? ElMessage.success('修改部门失败') : ElMessage.error('添加部门成功')
  }
}

//获取部门相关
const getDept = async () => {
  const res = await getDeptListApi()
  console.log(res);
  if (res.code) {
    tableData.value = res.data
  }
}

onMounted(() => {
  getDept()
})
</script>

<template>
  <h1>部门管理</h1>
  <!-- 按钮靠页面右侧显示 -->
  <el-button type="success" @click="addDept" style="float: right;"> + 新增部门</el-button> <br><br>
  
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

  <!-- 对话框 -->
  <el-dialog v-model="showDialog" :title="formTitle" width="30%" @close="resetForm" draggable>
    <el-form :model="deptForm" :rules="formRules" ref="deptFormRef">
      <el-form-item label="部门名称" prop="name" label-width="80px">
        <el-input v-model="deptForm.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="success" @click="saveDept">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
  h1 {
    color: rgba(0, 0, 0, 0.527);
    font-size: 20px;

  }
</style>
