<template>
  <div class="container">
    <header class="header">语音生成与播放器</header>
    <div class="content-row">
      <div class="input-column">
        <textarea v-model="textInput" rows="10" placeholder="请输入要生成语音的文本"></textarea>
        <div class="control-panel">
          <label for="voiceSelect">选择语音种类：</label>
          <select id="voiceSelect" v-model="selectedVoice" @change="updateVoice">
            <option v-for="(voice, index) in voiceList" :key="index" :value="index">{{ voice }}</option>
          </select>
        </div>
        <button @click="generateSpeech" :disabled="generating">生成语音</button>
        <span v-if="generating" class="loading-text">生成中...</span>
      </div>
      <div class="result-column">
        <button @click="playSpeech" :disabled="!audioUrl">从头开始听</button>
        <button @click="stopSpeech" :disabled="!audioUrl || !playing">暂停</button>
        <audio controls ref="audioPlayer">
          <source :src="audioUrl" type="audio/mpeg">
          您的浏览器不支持 audio 元素。
        </audio>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import origin from "@/apis/origin";
      const textInput=ref('')
      const voiceList=ref( [
        '小小',
        '小仪',
        '辽宁小北',
        '云哲',
        '湾隆',
        'Themba'
      ])
//写一个函数用来把路径转成本地地址
function transformImagePath(path) {
  // 提取文件名（即最后一个 '/' 之后的部分）  
  const fileName = path.split('/').pop();
  // 构造新路径，使用 '@/dataset/' 作为前缀并接上文件名  
  return `../assets/output/${fileName}`;
}
onMounted(() => {
  
})
const audioPlayer = ref()
const audioUrl=ref('')
      const playing=ref(false)
      const selectedVoice=ref(0)
      const generating=ref(false)
  
    const generateSpeech= async ()=>{
      try {
        generating.value = true;
        const data = {
          text: textInput.value,
          voice_type: selectedVoice.value,
        };
        const response = await origin.generatespeech(data)
        //const dir = 'D:/vs_temp/text-to-speech/' + response
        const dir= new URL(transformImagePath(response), import.meta.url);
        console.log("文件路径为" + dir)
        audioUrl.value = dir
        audioPlayer.value.load()
      } catch (error) {
        console.error('生成音频文件失败:', error);
      } finally {
        generating.value = false;
      }
    }
    const playSpeech=()=> {
      if (audioUrl.value) {
        audioPlayer.value.currentTime = 0;
        audioPlayer.value.play();
        playing.value = true;
      }
    }
    const stopSpeech=()=>{
      if (audioUrl.value) {
        audioPlayer.value.pause();
        playing.value = false;
      }
    }
    const updateVoice=()=> {
      // 可选：在语音种类更新时进行处理
      console.log('Voice selection updated:', selectedVoice.value);
    }

</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 50%; /* 调整文本输入器宽度 */
}

.result-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px; /* 添加内边距 */
  font-size: 16px; /* 调整字体大小 */
  border: 1px solid #ccc; /* 添加边框 */
  border-radius: 5px; /* 添加边框圆角 */
}

.control-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 10px; /* 调整按钮与文本框的间距 */
}

.button-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

button {
  margin: 5px;
  padding: 10px 20px; /* 调整按钮内边距 */
  background-color: #007BFF; /* 修改按钮底色 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

input[type="number"] {
  width: 80px; /* 调整输入框宽度 */
}

.loading-text {
  font-size: 14px;
  color: #888;
}
</style>
