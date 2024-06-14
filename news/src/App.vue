<template>
  <div class="root-box">
    <Header />
    <Title />
    <div class="common-layout">
      <ImgList />
      <Nav />
      <el-container class="mine_container">
        <Particles
          id="tsparticles"
          class="login__particles"
          :options="particles"
        />
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { particles } from "@/components/particles/1.js";
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import Nav from "@/components/nav.vue";
import ImgList from "@/components/imgList.vue";
import Title from "@/components/title.vue";
import Test from "@/components/test.vue";
import router from "@/router/index.js";

//-----------header-----------
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
//----------------------

const menuIndex = ref("1");

const handleSelect = (index) => {
  switch (index) {
    case "1":
      router.push({ name: "home" });
      break;
    case "2":
      router.push({ name: "classify" });
      break;
    case "3":
      router.push({ name: "cloud" });
      break;
  }
  console.log(index);
};
</script>

<style scoped>
.root-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background-image: url("./pics/19.png") url("./pics/20.png");
  background-size: contain;
  background-repeat: repeat-y;
}
.mine_container {
  /* background-color: rgb(252, 253, 247); */
  background-attachment: fixed;
  background-repeat: repeat;
  width: 100%;
  margin-bottom: 10px;
  margin: auto;
  
}
.date-time {
  display: flex;
  align-items: center;
  font-size: 14px;
}
.date {
  margin-right: 10px;
}

.date,
.day {
  font-size: 20px;
  color: #ffffff;
}
.common-layout {
  width: 100%;
  height: auto;
  position: relative;
  max-width: 1280px;
}
.el-main {
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin: 5px 0 30px 0;
  background-color: white;
  text-align: center;
  min-height: 600px;
  height: auto;
  background-image: url("./pics/16.png");
  background-size: cover;
  background-position: right bottom;
  background-size: cover;
}
</style>

<style>
#app {
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
