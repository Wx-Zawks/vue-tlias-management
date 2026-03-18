<script setup>

</script>

<template>
  <div class="common-layout">
    <el-container>
      <!-- Header 区域 -->
      <el-header class="header">
        <span class="title">Tlias智能学习辅助系统</span>
        <span class="right_tool">
          <a href="">
            <el-icon><EditPen /></el-icon> 修改密码 &nbsp;&nbsp;&nbsp; |  &nbsp;&nbsp;&nbsp;
          </a>
          <a href="">
            <el-icon><SwitchButton /></el-icon> 退出登录
          </a>
        </span>
      </el-header>
      
      <el-container>
        <!-- 左侧菜单 -->
        <el-aside width="200px" class="aside">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
              >
                <el-menu-item index="0">
                  <el-icon><Promotion /></el-icon>
                  <span>首页</span>
                </el-menu-item>
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon><Menu /></el-icon>
                    <span>班级学员管理</span>
                  </template>
                    <el-menu-item index="1-1" class="el-menu-vertical-demo"><el-icon><HomeFilled /></el-icon>班级管理</el-menu-item>
                    <el-menu-item index="1-2" class="el-menu-vertical-demo"><el-icon><UserFilled /></el-icon>学员管理</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2">
                  <template #title>
                    <el-icon><Tools /></el-icon>
                    <span>系统信息管理</span>
                  </template>
                    <el-menu-item index="2-1" class="el-menu-vertical-demo"><el-icon><HelpFilled /></el-icon>部门管理</el-menu-item>
                    <el-menu-item index="2-2" class="el-menu-vertical-demo"><el-icon><Avatar /></el-icon>员工管理</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="3">
                  <template #title>
                    <el-icon><Histogram /></el-icon>
                    <span>数据统计管理</span>
                  </template>
                    <el-menu-item index="3-1" class="el-menu-vertical-demo"><el-icon><InfoFilled /></el-icon>员工信息统计</el-menu-item>
                    <el-menu-item index="3-2" class="el-menu-vertical-demo"><el-icon><Share /></el-icon>学员信息统计</el-menu-item>
                    <el-menu-item index="3-3" class="el-menu-vertical-demo"><el-icon><Edit /></el-icon>日志信息统计</el-menu-item>
                </el-sub-menu>
              </el-menu>
        </el-aside>
        
        <el-main>
          右侧核心展示区域
        </el-main>
      </el-container>
      
    </el-container>
  </div>
</template>

<style scoped>
.header {
  background-image: url("../../assets/head-bar.png");
  background-repeat: repeat;
  /* 控制比例/尺寸（推荐 cover，铺满且保持比例） */
  background-size: contain;
  /* 居中显示（避免图片偏移） */
  background-position: center center;
  /* 可选：固定背景不跟随滚动 */
  background-attachment: scroll;
  /* 必须给容器设置宽高！否则背景图显示不出来 */
}

.title {
  color: rgb(117, 126, 113) ;
  font-size: 40px;
  font-family: "Microsoft YaHei", SimHei, sans-serif;
  line-height: 60px;
  font-weight: bolder;
  -webkit-text-stroke: 1px #bceb87;
}

.right_tool{
  float: right;
  line-height: 60px;
}

a {
  color: rgb(104, 103, 103);
  text-decoration: none;
  font-weight: bolder;
}

.aside {
  width: 220px;
  border-right: 1px solid #ccc;
  height: 730px;
}

.el-menu-vertical-demo{
  background-color: #efffea;
}
</style>
