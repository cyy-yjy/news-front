<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { particles } from '@/components/particles/1.js'
//
</script>

<template>
  <div class="common-layout">
    <el-container class="mine_container">
        <Particles id="tsparticles" class="login__particles" :options="particles" />
        <el-header>
          新闻系统
        </el-header>
      <el-main>
<el-row>
  <el-col :span="6">
      <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
          @select="handleSelect"
        >
          <el-menu-item index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>生成标题</span>
            </template>
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
        </el-col>
        <el-col :span="18">
           
        <router-view />
         </el-col>
        </el-row>
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
}
</script>
<style scoped>
.inRight {
  position: absolute;
  right: 5px;
}

.mine_container {
  background-color: rgb(252, 253, 247);
  width: 70%;
  margin: auto;
  /* 居中 */
}

.common-layout {
  top: 0;
  right: 0;
  bottom: 0;
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
  margin: 0;
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
  color: #2c3e50;
}
.login__particles {
  z-index: -1;
  opacity: 0.7;
}
</style>

