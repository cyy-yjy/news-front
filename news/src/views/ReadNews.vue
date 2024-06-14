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
          <label for="playbackRate">语音生成速度：</label>
          <input type="number" id="playbackRate" v-model.number="playbackRate" min="0.5" max="2" step="0.1">
        </div>
        <button @click="generateSpeech" :disabled="generating">生成语音</button>
        <span v-if="generating" class="loading-text">生成中...</span>
      </div>
      <div class="result-column">
        <button @click="playSpeech" :disabled="!audioUrl || playing">试听</button>
        <button @click="stopSpeech" :disabled="!audioUrl || !playing">停止</button>
        <audio controls ref="audioPlayer">
          <source :src="audioUrl" type="audio/mpeg">
          您的浏览器不支持 audio 元素。
        </audio>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpeechGenerator',
  data() {
    return {
      textInput: '',
      voiceList: [
        '小小',
        '小仪',
        '辽宁小北',
        '云哲',
        '湾隆',
        'Themba'
      ],
      selectedVoice: 0,
      audioUrl: '',
      playbackRate: 1,
      generating: false,
      playing: false
    };
  },
  methods: {
    async generateSpeech() {
      try {
        this.generating = true;
        const data = {
          text: this.textInput,
          voice_type: this.selectedVoice,
          rate: this.playbackRate // 传递语速参数
        };
        const response = await fetch('/get-speech', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const responseData = await response.json();
        if (!responseData.response.isError) {
          this.audioUrl = responseData.response.data;
          this.$refs.audioPlayer.load();
          console.log('音频文件已加载');
        } else {
          console.error('生成音频文件失败:', responseData.response.msg);
        }
      } catch (error) {
        console.error('生成音频文件失败:', error);
      } finally {
        this.generating = false;
      }
    },
    playSpeech() {
      if (this.audioUrl) {
        this.$refs.audioPlayer.playbackRate = this.playbackRate;
        this.$refs.audioPlayer.play();
        this.playing = true;
      }
    },
    stopSpeech() {
      if (this.audioUrl) {
        this.$refs.audioPlayer.pause();
        this.$refs.audioPlayer.currentTime = 0;
        this.playing = false;
      }
    },
    updateVoice() {
      // 可选：在语音种类更新时进行处理
      console.log('Voice selection updated:', this.selectedVoice);
    }
  }
};
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
