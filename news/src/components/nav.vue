
<template>
  <nav class="nav">
    <ul class="nav-list">
      <li class="nav-item">
        <router-link to="/">
          <div style="display: flex; align-items: center; cursor: pointer">
            <el-icon><Document /></el-icon>
            <span>生成标题</span>
          </div>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/classify"
          ><div style="display: flex; align-items: center; cursor: pointer">
            <el-icon><Files /></el-icon>            
            <span>标题分类</span>
          </div></router-link
        >
      </li>
      <li class="nav-item">
        <router-link to="/cloud"
          ><div style="display: flex; align-items: center; cursor: pointer">
            <el-icon><Picture /></el-icon>
            <span>获得词云图</span>
          </div></router-link
        >
      </li>
      <li class="nav-item">
        <router-link to="/read"
          ><div style="display: flex; align-items: center; cursor: pointer">
            <el-icon><Microphone /></el-icon>            
            <span>语音朗读</span>
          </div></router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped>
.nav {
  margin-top: 10px;
  background-color: 	hsl(207, 50%, 85%,0.8);
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */

  padding: 10px 0;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.nav-list {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0 20px;
}

.nav-item a {
  display: flex;
  align-items: center;
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-item a:hover {
  color: #666;
}

.nav-item .el-icon {
  font-size: 18px;
  margin-right: 8px;
}

.nav-item span {
  font-size: 16px;
}
</style>
