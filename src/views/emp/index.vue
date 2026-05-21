<script setup>
  import { onMounted, ref, watch } from 'vue'
  import { getEmpListApi, addEmpApi } from '@/api/emp'
  import { getDeptListApi } from '@/api/dept'
  import { ElMessage } from 'element-plus'

//职位列表数据
const jobs = ref([{ name: '班主任', value: 1 },{ name: '讲师', value: 2 },{ name: '学工主管', value: 3 },{ name: '教研主管', value: 4 },{ name: '咨询师', value: 5 },{ name: '其他', value: 6 }])
//性别列表数据
const genders = ref([{ name: '男', value: 1 }, { name: '女', value: 2 }])
//部门列表数据
const deptList = ref([])

//获取部门列表用于添加员工表单展示
const getDeptList = async () => {
  const res = await getDeptListApi()
  deptList.value = res.data
  console.log("部门列表", deptList.value)
}

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
      console.log(searchEmp.value.begin, newValue[1])
     }else {
      searchEmp.value.begin = ''
      searchEmp.value.end = ''
      console.log(searchEmp.value.begin, newValue[1])
     }
  }
)
const search = async () => {
  // 处理查询逻辑
  const res = await getEmpListApi({
    name: searchEmp.value.name,
    gender: searchEmp.value.gender,
    begin: searchEmp.value.begin,
    end: searchEmp.value.end,
    pageNum: currentPage.value,
    pageSize: pageSize.value
  })
  empList.value = res.data.rows
  total.value = res.data.total
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

//初始渲染所有员工与获取部门列表
onMounted(() => {
  search()
  getDeptList()
})

//新增员工
const dialogVisible = ref(false)
const dialogTitle = ref('')
const employeeFormRef = ref(null)
const employee = ref({
  username: '',
  name: '',
  gender: '',
  phone: '',
  job: '',
  salary: '',
  deptId: '',
  entryDate: '',
  image: '',
  exprList: []
})

const addEmp = () => {
  dialogVisible.value = true
  dialogTitle.value = '新增员工' 

    //清空表单内容及校验提示信息
  employee.value = {
    username: '',
    name: '',
    gender: '',
    phone: '',
    job: '',
    salary: '',
    deptId: '',
    entryDate: '',
    image: '',
    exprList: []
  }
  if(employeeFormRef.value){
      employeeFormRef.value.resetFields()
  }
}
//文件上传
// 图片上传成功后触发
const handleAvatarSuccess = (response,uploadFile) => {
  employee.value.image = response.data
}
// 文件上传之前触发
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('只支持上传图片')
    return false
  } else if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error('只能上传10M以内图片')
    return false
  }
  return true
}

//工作经历
//动态添加工作经历 .
const addExprItem = () => {
  employee.value.exprList.push({exprDate: [], begin: '', end: '', company: '', job: ''})
}

//动态删除工作经历 .
const delExprItem = (index) => {
  employee.value.exprList.splice(index, 1)
}

//监听-employee员工对象中的工作经历数据
watch(()=>employee.value.exprList, (newValue, oldValue) => {
  if(employee.value.exprList && employee.value.exprList.length > 0) {
    employee.value.exprList.forEach(expr => {
      expr.begin = expr.exprDate[0]
      expr.end = expr.exprDate[1]
    })
  }
}, {deep: true});

//表单校验规则
// 验证规则
const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度应在2到20个字符之间', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '姓名长度应在2到10个字符之间', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1\d{10}$/g, message: '请输入有效的手机号', trigger: 'blur' }
  ]
});

//保存新增员工
const saveAddedEmp = async () => {
  employeeFormRef.value.validate(async valid => {
    if(valid){ // 校验通过
      const result = await addEmpApi(employee.value);
      if(result.code){
        ElMessage.success('新增员工成功')
        dialogVisible.value = false
        search()
      }else {
        ElMessage.error(result.msg)
      }
    }
  })
}
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

    <el-button type="success" @click="addEmp"> + 新增员工</el-button>
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
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[10, 20, 30, 40]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>

   <!-- 新增/修改员工的对话框 -->
  <el-dialog v-model="dialogVisible" :title="dialogTitle" :show-close="false">
      <el-form ref="employeeFormRef" :model="employee" :rules="rules" label-width="80px">
        <!-- 基本信息 -->
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="employee.username" placeholder="请输入员工用户名，2-20个字"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="employee.name" placeholder="请输入员工姓名，2-10个字"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="性别">
              <el-select v-model="employee.gender" placeholder="请选择性别" style="width: 100%;">
                <!-- <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option> -->
                <el-option v-for="item in genders" :key="item.value" :label=item.name :value=item.value ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="employee.phone" placeholder="请输入员工手机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="职位">
              <el-select v-model="employee.job" placeholder="请选择职位" style="width: 100%;">
                <!-- <el-option label="班主任" value="1"></el-option>
                <el-option label="讲师" value="2"></el-option>
                <el-option label="学工主管" value="3"></el-option>
                <el-option label="教研主管" value="4"></el-option>
                <el-option label="咨询师" value="5"></el-option> -->
                <el-option v-for="item in jobs" :key="item.value" :label="item.name" :value="item.value" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="薪资">
              <el-input v-model="employee.salary" placeholder="请输入员工薪资"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第四行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属部门">
              <el-select v-model="employee.deptId" placeholder="请选择部门" style="width: 100%;">
                <!-- <el-option label="研发部" value="1"></el-option>
                <el-option label="市场部" value="2"></el-option> -->
                <el-option v-for="item in deptList" :key="item.id" :label=item.name :value=item.id ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入职日期">
              <el-date-picker v-model="employee.entryDate" type="date" style="width: 100%;" placeholder="选择日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第五行 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                action="/api/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                >
                <img v-if="employee.image" :src="employee.image" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        

        <!-- 工作经历 -->
        <!-- 第六行 -->
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="工作经历">
              <el-button type="success" size="small" @click="addExprItem">+ 添加工作经历</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        
        <!-- 第七行 ...  工作经历 -->
        <el-row :gutter="3" v-for="(expr, index) in employee.exprList">
          <el-col :span="10">
            <el-form-item size="small" label="时间" label-width="80px">
              <el-date-picker type="daterange" v-model="expr.exprDate" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item size="small" label="公司" label-width="60px">
              <el-input placeholder="请输入公司名称" v-model="expr.company" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item size="small" label="职位" label-width="60px">
              <el-input placeholder="请输入职位" v-model="expr.job" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="2">
            <el-form-item size="small" label-width="0px">
              <el-button type="danger" @click="delExprItem(index)" >- 删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      
        <!-- 底部按钮 -->
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false; employee = {}">取消</el-button>
            <el-button type="primary" @click="saveAddedEmp">保存</el-button>
          </span>
        </template>

    </el-dialog>
</template>

<style scoped>
  h1 {
    color: rgba(0, 0, 0, 0.527);
    font-size: 20px;

  }

  .avatar {
  height: 40px;
  }
  .avatar-uploader .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    text-align: center;
    /* 添加灰色的虚线边框 */
    border: 1px dashed var(--el-border-color);
  }
</style>