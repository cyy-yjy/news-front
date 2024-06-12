<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { particles } from '@/components/particles/1.js'
//
</script>

<template>
  <div class="common-layout">
    <el-container class="mine_container">
      <Particles id="tsparticles" class="login__particles" :options="particles" />
      <el-header class="header">
        <div class="title">
          新闻系统
        </div>
       
      </el-header>
      <el-menu
                active-text-color="#ffd04b"
                background-color="#545c64"
                class="el-menu-vertical-demo"
                :default-active="menuIndex"
                text-color="#fff"
                mode="horizontal"
                @select="handleSelect"
              >
                <el-menu-item index="1">
                    <el-icon><location /></el-icon>
                    <span>生成标题</span>
                </el-menu-item>
                <el-menu-item index="2">
                  <el-icon><icon-menu /></el-icon>
                  <span>标题分类</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <el-icon><document /></el-icon>
                  <span>获得词云图</span>
                </el-menu-item>
            </el-menu>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { ref} from 'vue'
import router from '@/router/index.js'
const handleSelect = (index) => {
  switch (index) {
    case '1':
      router.push({ name: 'home' });
      break;
    case '2':
      router.push({ name: 'classify' });
      break;
    case '3':
      router.push({ name: 'cloud' });
      break;
  }
  console.log(index)
}
</script>
<style scoped>
.mine_container {
  background-color: rgb(252, 253, 247);
  /* background-image: url("./pics/图片1.png"); */
  background-attachment: fixed;
  background-repeat: repeat;
  width: 100%;
  margin: auto;
  /* 居中 */
}
.header{
  background-image: url("./pics/图片10.png"),url("./pics/图片7.png");
  /* background-color: #a1c4fd; */
  background-position: left top,right top;
  background-size: 50% 400px,50% auto;
  background-repeat: no-repeat;
  height: 400px;
}
.el-menu-vertical-demo{
  margin-bottom: 0px;
  height:100px;
  display: flex;
  border-bottom:0px;
  justify-content: space-between;
  /* background-image: url("./pics/图片6.png"); */

}
.title{
  margin-top: 100px;
  font-size: 70px;
}
.common-layout {
  top: 0;
  right: 10;
  bottom: 10;
  left: 0;
  width: 100%;
  height: 100%;
  position: relative; 
}
</style>
<style>
#app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  padding: 0;
  background-size: 100% 100%;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
  min-height: 650px;
  justify-content: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.login__particles {
  z-index: -1;
  opacity: 0.7;
}
</style>

