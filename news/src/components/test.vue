<template>
  <div class="title-generator">
    <textarea
      v-model="content"
      placeholder="请输入您的文本、文章或新闻"
      @input="generateTitle"
    ></textarea>
    <div class="title-info">
      <span>生成的标题:</span>
      <span>{{ title }}</span>
      <el-button type="primary" @click="copyTitle">复制标题</el-button>
    </div>
    <div class="progress-bar">
      <el-progress :percentage="progress" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const content = ref("");
const title = ref("");
const progress = ref(0);

const generateTitle = () => {
  // 在这里添加您的标题生成逻辑
  // 例如,使用 AI 模型或其他算法
  title.value = "这是一个示例标题";
  progress.value = 10000;
};

const copyTitle = () => {
  navigator.clipboard.writeText(title.value);
  // 在这里添加复制成功的提示
};
</script>

<style scoped>
.title-generator {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.title-generator textarea {
  width: 100%;
  height: 150px;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
}

.title-info {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.title-info span {
  margin-right: 10px;
}

.progress-bar {
  width: 100%;
  margin-top: 20px;
}
</style>
