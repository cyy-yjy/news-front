<template>
    <div class="container">
      <header class="header">文本朗读</header>
      <div class="content-row">
        <div class="input-column">
          <el-input
            v-model="titleInput"
            class="textarea-input"
            :autosize="{ minRows: 10, maxRows: 15 }"
            maxlength="1000"
            placeholder="请输入1000字以内文本"
            show-word-limit
            clearable
            type="textarea"
          ></el-input>
        </div>
        <div class="result-column">
          <div class="controls">
            <div class="slider-label">语速调节</div>
            <el-slider
              v-model="speechRate"
              :min="0.5"
              :max="2"
              :step="0.1"
              show-stops
              style="width: 80%; margin: 20px 0;"
            ></el-slider>
            <el-select v-model="voice" placeholder="选择语音音色" class="voice-select">
              <el-option
                v-for="voice in voices"
                :key="voice.value"
                :label="voice.label"
                :value="voice.value"
              ></el-option>
            </el-select>
            <el-button round @click="generateSpeech" class="action-button">
              生成语音
            </el-button>
            <div v-if="audioSrc">
              <audio :src="audioSrc" controls></audio>
              <el-button round @click="downloadAudio" class="action-button">
                下载语音文件
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>

import { ref } from "vue";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/index.css";

const titleInput = ref("");
const speechRate = ref(1);
  const voice = ref("");
  const audioSrc = ref("");

  
  const voices = [
    { label: "默认", value: "default" },
    { label: "男声", value: "male" },
    { label: "女声", value: "female" },
    { label: "机器人", value: "robot" },
  ];
  
  const generateSpeech = async () => {
    // 实际需要根据接口生成语音
    try {
      const response = await origin.generateSpeech({
        text: titleInput.value,
        rate: speechRate.value,
        voice: voice.value,
      });
      audioSrc.value = response.audioUrl; // 假设接口返回音频文件的URL
      ElMessage.success("生成语音成功");
    } catch (error) {
      ElMessage.error("生成语音失败：" + error.message);
      console.error("生成语音失败：", error);
    }
  };
  
  const downloadAudio = () => {
    if (audioSrc.value) {
      const link = document.createElement("a");
      link.href = audioSrc.value;
      link.download = "generated_audio.mp3";
      link.click();
    } else {
      ElMessage.warning("没有可下载的语音文件");
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f2f2f2;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding-bottom: 10px;
    min-height: 680px; /* 增加高度以容纳所有内容 */
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
    padding: 20px; /* 增加内边距 */
  }
  
  .input-column {
    flex: 1; /* 占据左侧一半空间 */
    padding: 10px;
    border: 2px solid #000; /* 黑色边框 */
    border-radius: 8px;
  }
  
  .textarea-input {
    width: 100%;
  }
  
  .result-column {
    flex: 1; 
    padding: 10px;
    display: flex;
    justify-content: center;
  }
  
  .controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  .slider-label {
    font-size: 1rem;
    margin-bottom: 10px;
  }
  
  .voice-select {
    width: 80%;
    margin-top: 10px;
  }
  
  .action-button {
    width: 80%;
    margin-top: 10px;
  }
  .result-column {
    padding: 10px; /* 增加内边距 */
    border: 2px solid #000; /* 黑色边框 */
    border-radius: 8px;
  }
  </style>
   