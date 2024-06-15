<template>
  <div class="container">
    <header class="header">语音生成与播放器</header>
    <el-container>
        <el-aside width="400px">
          <div class="inform" style="margin: 25px;text-align: left;">请输入要生成语音的文本</div>
  <div class="input-column">
        <textarea v-model="textInput" rows="10" placeholder="请输入要生成语音的文本"></textarea>
      </div>
        </el-aside>
        <el-main>
        <div class="inform" style="margin-left: 25px;text-align: left;">请选择语音样式，你可以试听</div>
        <el-row style="margin-top: 20px;" :gutter="20">
        <!-- 做一个卡片，它包括image，button -->
        <div v-for="(item, index) in voice_list" :key="index">
          <el-col :span="12" style="max-width: 400px" shadow="hover">
            <el-card style="max-width: 430px;height: 380px;margin: 10px;position: relative;" shadow="hover">
              <!-- 它还有一个标题 -->
              <template #header>
                <div class="card-header">
          <span>{{ item.name }}</span>
        </div>
                </template>
              <el-image style="width: 320px; height: 160px" :src="cal(item.pic)" fit="cover" />
              <audio controls style="margin-top: 10px;">
                <source :src="cal(item.url)" type="audio/mpeg">
                您的浏览器不支持 audio 元素。
              </audio>
              <el-button size="large" round type="success" :plain="index !== selectedVoice"
                style="width: 80px;position: absolute;left: 50%;transform: translateX(-50%); bottom: 20px;"
                @click="handleSelect(index)">
                <i class="fi fi-rr-check-circle" v-show="index !== selectedVoice"></i>
                <i class="fi fi-sr-check-circle" v-show="index === selectedVoice"></i>
              </el-button>
            </el-card>
          </el-col>
        </div>
      </el-row>
        </el-main>
      </el-container>
    
    <button class="defined_button" @click="generateSpeech" :disabled="generating">生成语音</button>
    <span v-if="generating" class="loading-text">生成中...</span>
    <el-container style="margin: 40px;">
      <el-aside width="45%">
        <el-row justify="end">
      <el-button class="yjy_defined_button" @click="playSpeech" :disabled="!audioUrl">从头开始听</el-button>
      </el-row>
       <el-row justify="end">
      <el-button class="yjy_defined_button" @click="stopSpeech" :disabled="!audioUrl || !playing">暂停</el-button>
        </el-row>
    </el-aside>
  <el-main style="align-items: left;">
    <audio controls ref="audioPlayer">
          <source :src="audioUrl" type="audio/mpeg">
          您的浏览器不支持 audio 元素。
        </audio>
        </el-main>
  </el-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import origin from "@/apis/origin";
const textInput = ref('')
//写一个函数用来把路径转成本地地址
function transformImagePath(path) {
  // 提取文件名（即最后一个 '/' 之后的部分）  
  const fileName = path.split('/').pop();
  // 构造新路径，使用 '@/dataset/' 作为前缀并接上文件名  
  return `../assets/output/${fileName}`;
}
function handleSelect(index) {
  console.log('原本是' + selectedVoice.value);
  selectedVoice.value = index;
  console.log('选中' + index);
}
//接下来做一个数组，它包含很多预先定义的字符串（名字），音频（预先生成的）
const voice_list = ref([
  {
    name: '活泼少女音',
    pic: '../pics/voice1.jpg',
    url: '../assets/output/01.mp4'
  }, {
    name: '粤语女声',
    pic: '../pics/voice2.jpg',
    url: '../assets/output/02.mp4'
  }, {
    name: '东北婶婶',
    pic: '../pics/voice3.jpg',
    url: '../assets/output/03.mp4'
  }, {
    name: '粤语男声',
    pic: '../pics/voice4.jpg',
    url: '../assets/output/04.mp4'
  }, {
    name: '少年音',
    pic: '../pics/voice5.jpg',
    url: '../assets/output/05.mp4'
  }, {
    name: '沉稳大哥',
    pic: '../pics/voice6.jpg',
    url: '../assets/output/06.mp4'
  },
])
function cal(url) {
  return new URL(url, import.meta.url);
}
onMounted(() => {

})
const audioPlayer = ref()
const audioUrl = ref('')
const playing = ref(false)
const selectedVoice = ref(0)
const generating = ref(false)

const generateSpeech = async () => {
  try {
    generating.value = true;
    const data = {
      text: textInput.value,
      voice_type: selectedVoice.value,
    };
    const response = await origin.generatespeech(data)
    //const dir = 'D:/vs_temp/text-to-speech/' + response
    const dir = new URL(transformImagePath(response), import.meta.url);
    console.log("文件路径为" + dir)
    audioUrl.value = dir
    audioPlayer.value.load()
  } catch (error) {
    console.error('生成音频文件失败:', error);
  } finally {
    generating.value = false;
  }
}
const playSpeech = () => {
  if (audioUrl.value) {
    audioPlayer.value.currentTime = 0;
    audioPlayer.value.play();
    playing.value = true;
  }
}
const stopSpeech = () => {
  if (audioUrl.value) {
    audioPlayer.value.pause();
    playing.value = false;
  }
}

</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}

.header {
  margin-top: 15px;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}
.card-header{
  color:deepskyblue;
  font-size: 18px;
  font-weight: bold;
}

.inform {
  color: cornflowerblue;
}

.input-column {
  display: flex;
  justify-content: flex-start;
  margin-left: 20px;
  width: 90%;
  height: 1200px;
  /* 调整文本输入器宽度 */
}

.result-column {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: right;
  width: 100%; 
}

textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  /* 添加内边距 */
  font-size: 16px;
  /* 调整字体大小 */
  border: 1px solid #ccc;
  /* 添加边框 */
  border-radius: 5px;
  /* 添加边框圆角 */
}

.control-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  /* 调整按钮与文本框的间距 */
}

.button-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.defined_button {
  margin: 5px;
  padding: 10px 20px;
  /* 调整按钮内边距 */
  background-color: #007BFF;
  /* 修改按钮底色 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.yjy_defined_button {
  color: darkblue;
  font-weight: bolder;
  width: 100px;
  height: 50px;
  /* 调整按钮内边距 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 50px;
  margin-bottom: 10px;
}
.defined_button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

input[type="number"] {
  width: 80px;
  /* 调整输入框宽度 */
}

.loading-text {
  font-size: 14px;
  color: #888;
}
</style>
