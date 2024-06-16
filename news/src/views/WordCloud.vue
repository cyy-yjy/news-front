<template>
    <div class="container">
  <header class="header">词云</header>
  <el-container>
    <el-aside width="570px">
      <div class="inform" style="margin: 25px;text-align: left;">请输入要生成词云的文本</div>
      <div class="input-column">
        <textarea v-model="textInput" rows="10" placeholder="请输入要生成词云的文本"></textarea>
      </div>
    </el-aside>
    <el-main>
      <div class="inform" style="margin-left: 25px;text-align: left;">请选择词云样式</div>
      <el-row style="margin-top: 20px;" :gutter="20">
        <!-- 做一个卡片，它包括image，button -->
        <div v-for="(item, index) in image_list" :key="index">
          <el-col :span="12" style="max-width: 330px" shadow="hover">
            <el-card style="max-width: 330px;height: 350px;margin: 10px;position: relative;align-items: center;"
              shadow="hover">
              <!-- 它还有一个标题 -->
              <template #header>
                <div class="card-header">
                  <span>{{ item.name }}</span>
                </div>
              </template>
              <el-image style="width: 240px; height: 200px" :src="cal(item.pic)" fit="contain" />
              <el-button size="large" round color="#626aef" :plain="index !== selected"
                style="width: 130px;position: absolute;left: 50%;transform: translateX(-50%); bottom: 20px;"
                @click="handleSelect(index)">
                <i class="fi fi-rr-check-circle" v-show="index !== selected"></i>
                <i class="fi fi-sr-check-circle" v-show="index === selected"></i>
              </el-button>
            </el-card>
          </el-col>
        </div>
      </el-row>
    </el-main>
  </el-container>
  <!-- 放一个按钮 -->
   <el-button type="warning" @click="generateCloud" class="submit_button">生成词云</el-button>
  <!-- 放一个图片，比较大 -->
  <el-card v-if="result !== ''" style="max-width: 90%;height: 700px;margin: 120px; position: relative;align-items: center;margin-top: 30px;" shadow="hover">
    <!-- 它还有一个标题 -->
    <template #header>
      <div class="card-header">
        <span>词云图已自动保存，路径为{{ path }}</span>
      </div>
    </template>
    <el-image style="width: 800px; height: 600px" :src="result" fit="contain" />
  </el-card>
  </div>
</template>
<script setup>
import { ref } from "vue";
import origin from "@/apis/origin";
const result = ref('')
const path=ref('')
//写一个函数用来把路径转成本地地址
function transformImagePath(path) {
  // 提取文件名（即最后一个 '/' 之后的部分）  
  const fileName = path.split('/').pop();
  // 构造新路径，使用 '@/dataset/' 作为前缀并接上文件名  
  return `../assets/output/${fileName}`;
}
function handleSelect(index) {
  console.log("原来"+ selected.value);
  selected.value = index;
  console.log("现在" + selected.value);
}
const textInput = ref('')
const image_list = ref([{
  name: '绚烂的气球',
  pic: '../assets/templates/balloons.png',
},
{
  name: '爱心涂鸦',
  pic: '../assets/templates/love.png',
}, {
  name: '皮卡丘',
  pic: '../assets/templates/pikaqiu.jpg',
}, {
  name: '中国地图',
  pic: '../assets/templates/china.png',
}
])
function cal(url) {
  return new URL(url, import.meta.url);
}
const selected = ref(0)
const generateCloud = async () => {
  try {
    const data = {
      text: textInput.value,
      pic_no: selected.value,
    };
    const response = await origin.generateCloud(data)
    path.value='assets/output/'+response
    const dir = new URL(transformImagePath(response), import.meta.url);
    console.log("文件路径为" + dir)
    result.value = dir
  } catch (error) {
    console.error('生成词云文件失败:', error);
  } finally {
  }
}
</script>
<style scoped>
.header {
  margin-top: 15px;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
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
  background-position: left bottom;
  background-repeat: no-repeat;
  background-size: auto;
  /* 或者根据需要设置合适的背景大小 */
}
.card-header {
  color: #626aef;
  font-size: 18px;
  font-weight: bold;
}

.inform {
  color: cornflowerblue;
  font-size: 18px;
  font-weight: bold;
}

.input-column {
  display: flex;
  justify-content: flex-start;
  margin-left: 20px;
  width: 90%;
  height: 730px;
  /* 调整文本输入器宽度 */
}
.submit_button{
  height: 50px;
  width: 200px;
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
  border-color: #346DAC;
  background-color: #346DAC;
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
}</style>