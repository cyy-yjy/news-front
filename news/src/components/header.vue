<template>
  <header class="header dark-theme">
    <div class="title">
      <img src="../pics/图片9.png" alt="Logo" class="logo" />
      <span>新闻系统</span>
    </div>
    <!-- <nav class="nav">
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/">
            <div style="display: flex; align-items: center; cursor: pointer">
              <el-icon><location /></el-icon>
              <span>生成标题</span>
            </div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/classify"
            ><div style="display: flex; align-items: center; cursor: pointer">
              <el-icon><icon-menu /></el-icon>
              <span>标题分类</span>
            </div></router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/cloud"
            ><div style="display: flex; align-items: center; cursor: pointer">
              <el-icon><document /></el-icon>
              <span>获得词云图</span>
            </div></router-link
          >
        </li>
      </ul>
    </nav> -->
    <div class="date-time">
      <span class="date">{{ currentDate }}</span>
      <span class="day">{{ currentDay }}</span>
    </div>
    <!-- <div class="user-info">
      <el-dropdown>
        <div class="user-avatar">
          <img src="@/assets/avatar.png" alt="Avatar" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>{{ username }}</el-dropdown-item>
            <el-dropdown-item>{{ role }}</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div> -->
  </header>
</template>

<script setup>
import { ref, computed } from "vue";

const username = "John Doe";
const role = "Admin";

const currentDate = computed(() => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(today.getDate()).padStart(2, "0")}`;
});

const currentDay = computed(() => {
  const days = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const today = new Date().getDay();
  return days[today];
});
</script>

<style scoped>
.header.dark-theme {
  background-color: hsla(194, 50%, 73%,0.8);
  color: #fff;
  box-shadow: 0 4px 4px hsla(213, 56%, 34%,1), 0 0 6px rgba(0, 0, 0, 0.04);
  /* margin-bottom: 20px; */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 64px;
  width: 100%;
}

.title {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
}

.logo {
  height: 40px;
  margin-right: 10px;
}

.nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-list {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0 10px;
}

.nav-item a {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  padding: 10px;
  transition: color 0.3s, background-color 0.3s;
}

.nav-item a:hover {
  color: #ddd;
  background-color: rgba(255, 255, 255, 0.1);
}

.date-time {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.date {
  margin-right: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
