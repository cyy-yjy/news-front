<template>
  <div class="container">
    <header class="header">分类</header>
    <div class="content-row">
      <div class="input-column">
        <el-input
          v-model="titleInput"
          class="textarea-input"
          :autosize="{ minRows: 10, maxRows: 15 }"
          maxlength="1000"
          placeholder="请输入1000字以内标题"
          show-word-limit
          clearable
          type="textarea"
        >
        </el-input>
        <div class="button-and-tags">
      <el-button round @click="classify()" class="search-button">
        开始分类
        <el-icon><Search /></el-icon>
      </el-button>
        </div>
      </div>
      <div class="result-column">
        <div class="history-tags" >
        <span>分类结果：</span>
        <el-tag
          v-for="(history, index) in reversedhistoryRecords"
          :key="index"
          class="tags"
          :class="{ 'tag-selected': selectedTagIndex === index }"
          closable
          @click="openHistory(index)"
          @close="deleteHistory(index)"
        >
          {{ history.front }}
        </el-tag>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/index.css";
import origin from "@/apis/origin";

const titleInput = ref("");
const classifyResult = ref("");
const historyRecords = ref([]);
const resultClasses=ref([]);
onMounted(() => {
  console.log("开始渲染");
  console.log(localStorage.getItem("title"))
  let title = localStorage.getItem("title");
  let history = JSON.parse(localStorage.getItem("historyRecords"));
  if (title) {
    titleInput.value = title;
  }
  if (history) {
    historyRecords.value = history;
  }
  console.log("mount");
});

const classify = async () => {
  try {
    const response = await origin.classifynews({ text: titleInput.value });
    classifyResult.value = response;
    ElMessage.success("分类成功");
    console.log("分类成功");
  } catch (error) {
    ElMessage.error("往后端传数据时出错");
    console.error("往后端传数据时出错：", error);
  }
};
</script>

<style scoped>
.container {
  display: flex;  
  width:100%;
  flex-direction: column;
  margin:auto;
  position: relative;
  align-items: center;
  background-color:rgd(242,242,242);
  /* border: 2px solid #ccc; */
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding-bottom: 10px;
  min-height: 580px;
}
.container::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1; /* 将图片浮动在组件上方 */
  background-image: url('../pics/图片9.png');
  filter:brightness(1.08);
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: auto; /* 或者根据需要设置合适的背景大小 */
  border-radius: 8px;
  pointer-events: none; /* 禁止伪元素阻止鼠标事件穿透 */
}
.header {
  margin-top: 15px;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.content-row {
  display: flex;
  justify-content: center;
  gap: 2rem;
  width: 100%;
}

.input-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-image: url("../pics/图片10.png"); */
  padding:6px;
  border-radius: 1rem;
  text-align: center;
  cursor: pointer;
  position: relative;
  border-color: rgb(118,113,113);
  border-width:2px;
}

.textarea-input {
  width: 400px;
  color:white;
  margin-bottom: 1rem;
}
.result-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-image: url("../pics/图片10.png"); */
  padding:6px;
  border-radius: 1rem;
  text-align: center;
  cursor: pointer;
  position: relative;
  border-color: rgb(118,113,113);
  border-width:2px;

}
.button-and-tags {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.search-button {
  width: 30%;
  /* background-color: var(--el-color-primary); */
  padding: 5px 10px;
  text-align: center;
}
</style>
