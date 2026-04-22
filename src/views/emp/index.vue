<script setup>
  import { onMounted, ref, watch } from 'vue'
  import { getEmpListApi } from '@/api/emp'

const searchEmp = ref({
  name: '',
  gender: '',
  date: [],
  begin: '',
  end: ''
})

//侦听searchEmp中的date属性
watch(
  () => searchEmp.value.date,
  (newValue, oldValue) => {
     if(newValue.length == 2){
      searchEmp.value.begin = newValue[0]
      searchEmp.value.end = newValue[1]
     }else {
      searchEmp.value.begin = ''
      searchEmp.value.end = ''
     }
  }
)
const search = async () => {
  // 处理查询逻辑
  const res = await getEmpListApi({
    ...searchEmp.value,
    page: currentPage.value,
    pageSize: pageSize.value
  })
  empList.value = res.data.rows
  console.log('Search:', res)
}

const clear = () => {
  // 清空表单
  searchEmp.value = {
    name: '',
    gender: '',
    date: []
  }
  search()
}

// 示例数据
const empList = ref([
   {
        "id": 1,
        "username": "jinyong",
        "password": "123456",
        "name": "金庸",
        "gender": 1,
        "image": "https://web-framework.oss-cn-hangzhou.aliyuncs.com/2022-09-02-00-27-53B.jpg",
        "job": 2,
        "salary": 8000,
        "entryDate": "2015-01-01",
        "deptId": 2,
        "deptName": "教研部",
        "createTime": "2022-09-01T23:06:30",
        "updateTime": "2022-09-02T00:29:04"
  }
])

// 分页配置
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 分页处理
const handleSizeChange = (val) => {
  search()
}
const handleCurrentChange = (val) => {
  search()
}

//初始渲染所有员工
onMounted(() => {
  search()
})
</script>

<template>
  <h1>员工管理</h1> <br>
  <el-form :inline="true" :model="searchEmp">
    <el-form-item label="姓名">
      <el-input v-model="searchEmp.name" placeholder="请输入员工姓名"></el-input>
    </el-form-item>

    <el-form-item label="性别">
      <el-select v-model="searchEmp.gender" placeholder="请选择">
        <el-option label="男" value="1"></el-option>
        <el-option label="女" value="2"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="入职日期">
      <el-date-picker
        v-model="searchEmp.date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="YYYY-MM-DD"
      ></el-date-picker>
    </el-form-item>

    <el-form-item>
      <el-button type="success" @click="search">查询</el-button>
      <el-button @click="clear">清空</el-button>
    </el-form-item>
  </el-form>

    <el-button type="success" @click=""> + 新增员工</el-button>
  <el-button type="danger" @click=""> - 批量删除</el-button>
  <br><br>

<!-- 表格 -->
  <el-table :data="empList" border style="width: 100%">
    <el-table-column type="selection" width="55" align="center"></el-table-column>
    <el-table-column prop="name" label="姓名" width="120" align="center"></el-table-column>
    <el-table-column label="性别" width="170" align="center">
      <template #default="scope" >
        {{ scope.row.gender == 1 ? '男' : '女' }}
      </template>
    </el-table-column>
    <el-table-column label="头像" width="170" align="center">
      <template #default="scope" >
        <!-- 测试用头像 -->
        <img src="https://ss2.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=193818414,3726596316&fm=253&gp=0.jpg" alt="Avatar" class="avatar" />
      </template>
    </el-table-column>
    <el-table-column prop="deptName" label="部门名称" width="170" align="center"></el-table-column>
    <el-table-column label="职位" width="120" align="center">
      <template #default="scope">
          <span v-if="scope.row.job == 1">班主任</span>
          <span v-else-if="scope.row.job == 2">讲师</span>
          <span v-else-if="scope.row.job == 3">学工主管</span>
          <span v-else-if="scope.row.job == 4">教研主管</span>
          <span v-else-if="scope.row.job == 5">咨询师</span>
          <span v-else>其他</span>
        </template>
    </el-table-column>
    <el-table-column prop="entryDate" label="入职日期" width="180" align="center"></el-table-column>
    <el-table-column prop="updateTime" label="最后操作时间" width="210" align="center"></el-table-column>
    <el-table-column label="操作" fixed="right" align="center">
      <template #default="scope">
        <el-button size="small" type="success" @click="">编辑</el-button>
        <el-button size="small" type="danger" @click="">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <br>

  <!-- 分页 -->
  <el-pagination
    @page-size="handleSizeChange"
    @current-page="handleCurrentChange"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[10, 20, 30, 40]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
</template>

<style scoped>
  h1 {
    color: rgba(0, 0, 0, 0.527);
    font-size: 20px;

  }

  .avatar {
    height: 40px;
  }
</style>