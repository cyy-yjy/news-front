<template>
  <div class="container">
    <header class="header">分类</header>
    <div class="content-row">
      <div class="input-column">
        <el-input
          v-model="titleInput"
          class="textarea-input"
          :autosize="{ minRows: 10, maxRows: 15 }"
          maxlength="30"
          placeholder="请输入30字以内标题"
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
          v-for="(data, index) in classifyResult"
          :key="index"
          class="tags"
          :disable-transitions="false"
        @close="handleClose(data)"
          closable
          :type="data.style? data.style :'success'"
        >
          {{ data.type }},
          <template v-if="data.probability !== undefined">
        概率为{{ data.probability.toFixed(2) }}%
      </template>
      <template v-else>
  是您自定义的
          </template>
        </el-tag>
        <!-- 以下是输入框，允许用户输入自己想添加的标签 -->
        <el-input
        v-if="inputVisible"
        ref="InputRef"
        v-model="inputValue"
        class="w-20"
        size="small"
        @keyup.enter="handleInputConfirm()"
        @blur="handleInputConfirm()"
      />
      <el-button v-else class="button-new-tag" size="small" @click="showInput()">
        + New Tag
      </el-button>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { ElMessage, ElInput } from "element-plus";
import "element-plus/theme-chalk/index.css";
import origin from "@/apis/origin";

const titleInput = ref("");
// 得到一个数组
const classifyResult = ref([]);
const historyRecords = ref([]);
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref(null);
const handleClose = (data) => {//已完成 让标签能被删掉
  classifyResult.value.splice(classifyResult.value.indexOf(data), 1)
}

const showInput = () => {//已完成 让输入框显示出光标
  inputVisible.value = true
  nextTick(() => {
    if (InputRef.value && InputRef.value.input) {
      InputRef.value.input.focus();
    }
  })
}
//如果用户输入完毕 需要把内容加入到tag列表
const handleInputConfirm = () => {
  if (inputValue.value) {
    const tmp = {}
    tmp.type = inputValue.value
    tmp.style='warning'
    classifyResult.value.push(tmp)
  }
  inputVisible.value = false
  inputValue.value = ''
}
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
  background-image: url('../pics/图片9.png');
  filter: brightness(1.08);
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: auto;
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
  border-color: #70A1CC;
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
  border-color: #70A1CC;
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