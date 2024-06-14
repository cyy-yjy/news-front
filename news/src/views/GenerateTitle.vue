<template>
  <div class="container">
    <header class="header">标题生成器</header>
    <div class="content-row">
      <div class="input-column">
        <!-- 左边的1000字输入框 -->
        <el-input v-model="textInput" class="textarea-input" :autosize="{ minRows: 10, maxRows: 15 }" maxlength="1000"
          placeholder="请输入1000以内文字" show-word-limit clearable type="textarea">
        </el-input>
        <!-- <div
          round
          @click="generateTitle()"
          class="search-button"
          :class="classStr"
        >
          <div>
            生成标题 <el-icon><Search /></el-icon>
          </div>
        </div> -->
      </div>
      <div class="result-column">
        <!-- 加一句提示 -->
         <div class="inform">在左侧输入文字后，点击下方“生成标题”按钮
          <br>
          然后就能在这里显示标题了哦 <br>
        </div>
        <!-- 右边的结果区域 -->
        <el-input :disabled="!textInput" v-model="titleResult" class="textarea-input" :autosize="{ minRows: 10, maxRows: 15 }" maxlength="1000"
          clearable type="text">
          <template #prepend>
            生成结果：
          </template>
        </el-input>
        <div class="inform">如果觉得AI生成的标题不够通顺，可以直接编辑哦！
        </div>
        <el-row style="margin-top: 20px;">
        <el-col :span="12">
  <div style="margin-left: 20px;margin-top: 5px;color:#626aef ;">
          点击按钮，可以把你满意的标题保存到历史记录哦！
  </div>
        </el-col>
        <el-col :span="12">
        <el-button style="margin-top: 15px;" color="#626aef" plain @click="saveAns()" :disabled="!titleResult">保存结果</el-button>
        </el-col>
  </el-row>
        <!-- <el-input
          v-model="titleResult"
          class="result-input"
          placeholder="Result"
          clearable
          type="text"
        >
        </el-input>  -->
      </div>
    </div>
    <div class="button-and-tags" >
      <el-button round @click="generateTitle()" class="search-button">
        生成标题
        <el-icon>
          <Search />
        </el-icon>
      </el-button>
    </div>
    <div class="history-tags">
      <span>历史记录：</span>
      <el-tag v-for="(history, index) in reversedhistoryRecords" :key="index" class="tags"
        :class="{ 'tag-selected': selectedTagIndex === index }" closable @click="openHistory(index)"
        @close="deleteHistory(index)">
        {{ history.front }}
        <!-- front表示得到的结果 -->
      </el-tag>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import origin from "@/apis/origin";
import { onBeforeUnmount, onMounted } from "vue";
// let classStr =
//   "p-4 rounded-2xl text-center border-[2px] border-[#449dda] hover:cursor-pointer relative bg-gradient-to-b from-[#63d0f3] to-[#53b4e6] group hover:border-[#3783c3] lg:gap-3 lg:text-start flex flex-col flex-1";

const textInput = ref("");
const titleResult = ref("");
const historyRecords = ref([
  {
    front: "1",
    text: "111",
    title: "111",
  },
  {
    front: "2",
    text: "111",
    title: "111",
  },
  {
    front: "3",
    text: "111",
    title: "111",
  },
]);
const reversedhistoryRecords = ref([
  {
    front: "31111111111111",
    text: "111",
    title: "111",
  },
  {
    front: "2",
    text: "111",
    title: "111",
  },
  {
    front: "1",
    text: "111",
    title: "111",
  },
]);
const selectedTagIndex = ref(-1);
const saveAns = () => {
  let textFront = "";
  if (textInput.value.length < 10) {
    textFront = textInput.value;
  } else {
    textFront = textInput.value.slice(0, 10);
  }
  historyRecords.value.push({
    front: textFront + "...",
    text: textInput.value,
    title: titleResult.value,
  });
  if (historyRecords.value.length > 5) {
    historyRecords.value.shift(); //从头部去掉
  }
  reversedhistoryRecords.value = historyRecords.value.reverse();

}
const generateTitle = async () => {
  try {
    const response = await origin.generateTitle({ text: textInput.value });
    titleResult.value = response;
    // let textFront = "";
    // if (textInput.value.length < 10) {
    //   textFront = textInput.value;
    // } else {
    //   textFront = textInput.value.slice(0, 10);
    // }
    // historyRecords.value.push({
    //   front: textFront + "...",
    //   text: textInput.value,
    //   title: response.msg,
    // });
    // if (historyRecords.value.length > 5) {
    //   historyRecords.value.shift(); //从头部去掉
    // }
    //reversedhistoryRecords.value = historyRecords.value.reverse();
    console.log("生成标题成功" + titleResult.value);
  } catch (error) {
    console.error("往后端传数据时出错：", error);
  }
};
const deleteHistory = (index: number) => {
  console.log("close", index);
  if (textInput.value == reversedhistoryRecords.value[index].text) {
    textInput.value = "";
  }
  if (titleResult.value == reversedhistoryRecords.value[index].title) {
    titleResult.value = "";
  }
  reversedhistoryRecords.value.splice(index, 1);
  historyRecords.value = reversedhistoryRecords.value.reverse();
  reversedhistoryRecords.value.reverse();
  console.log(reversedhistoryRecords.value);
};
const openHistory = (index: number) => {
  console.log("click", index);
  selectedTagIndex.value = index;
  console.log(selectedTagIndex.value);
  textInput.value = reversedhistoryRecords.value[index].text;
  titleResult.value = reversedhistoryRecords.value[index].title;
};
onMounted(() => { });
onBeforeUnmount(() => {
  localStorage.clear();
  console.log(titleResult.value)
  localStorage.setItem("text", textInput.value);
  localStorage.setItem("title", titleResult.value);
  localStorage.setItem("historyRecords", JSON.stringify(historyRecords.value));
  console.log("组件即将被卸载");
});
</script>

<style scoped>
.inform{
  color: cornflowerblue;
  margin-bottom: 10px;
}
.container {
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: auto;
  position: relative;
  align-items: center;
  background-color: rgd(242, 242, 242);
  /* border: 2px solid #ccc; */
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding-bottom: 10px;
  background-image: url('../pics/图片9.png');
  filter: brightness(1.08);
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: auto;
  /* 或者根据需要设置合适的背景大小 */
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
  padding: 4px;
  border-radius: 1rem;
  text-align: center;
  cursor: pointer;
  position: relative;
  border-color: rgb(77, 99, 163);
  border-width: 2px;

}

.textarea-input {
  width: 400px;
  color: rgb(118, 113, 113);
  font-size: 15px;
  margin-bottom: 15px;
}

.button-and-tags {
  margin-top: 15px;
  margin-bottom: 15px;
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
  font-size: 20px;

}

.history-tags {
  flex-direction: column;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: unset;
  border: 2px solid rgb(77, 99, 163);
  border-radius: 1rem;
  padding: 10px;
  width: 400px;
  min-height: 304px;
  height: auto;
  background-position-x: right;
}

.result-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-image: url("../pics/图片10.png"); */
  padding: 4px;
  border-radius: 1rem;
  text-align: center;
  cursor: pointer;
  position: relative;
  border-color: rgb(77, 99, 163);
  border-width: 2px;

}

.result-input {
  width: 400px;
  color: rgb(118, 113, 113);
  margin-bottom: 1rem;
}

.tags {
  color: white;
  background-color: rgb(77, 99, 151);
  height: 30px;
  min-width: 50px;
  width: auto;
  font-size: 15px;
  display: inline-flex;
  /* 让元素居中对齐 */
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  /* 可选：让标签有圆角 */
  padding: 0 10px;
  /* 可选：添加左右内边距 */
  transition: all 0.3s ease;
  /* 添加过渡效果 */
}

.tags:hover {
  color: rgb(77, 99, 151);
  background-color: white;
  cursor: pointer;
}

.tag-selected {
  background-color: #b1b3b8 transparent;
}
</style>
<style>
.el-textarea__inner {
  background-color: transparent !important;
  border-width: 20px;
  border-color: white;
  border-radius: 4px;
  color: rgb(118, 113, 113);
}

.el-textarea__inner:hover {
  box-shadow: unset;
  border: unset;
}
</style>
