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
          左侧菜单栏
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
</style>
