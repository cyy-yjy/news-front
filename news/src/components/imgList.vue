<template>
  <div class="carousel-container">
    <el-carousel :interval="4000" type="card" height="500px" class="carousel" >
      <el-carousel-item
        v-for="(item, index) in carouselData"
        :key="index"
        style="background-color: white"
        @click="handleClick(item)"
      >
        <img :src="item.imageUrl" :alt="item.title" class="carousel-image" />
        <div class="carousel-caption">
          <h3 class="carousel-title">{{ item.title }}</h3>
          <p class="carousel-description">{{ item.description }}</p>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import img1 from "@/pics/14.jpg";
import img2 from "@/pics/图片7.png";
import img3 from "@/pics/13.jpg";
import img4 from "@/pics/12.jpg";
import router from "@/router";

const carouselData = [
  {
    imageUrl: img1,
    title: "生成标题",
    description: "让AI为你的新闻生成有趣的标题吧!",
    index:'1'
  },
  {
    imageUrl: img2,
    title: "标题分类",
    description: "你的新闻标题属于哪一类呢？",
    index: '2'
  },
  {
    imageUrl: img3,
    title: "获得词云图",
    description: "看看你的新闻词云分布图！",
    index: '3'
  },
  {
    imageUrl:img4,
    title:"语音生成",
    description: "输入一段新闻，选择你喜欢的声音朗读吧！",
    index: '4'
  },
];
function handleClick (item) {
  switch (item.index) {
    case "1":
      router.push({ name: "home" });
      break;
    case "2":
      router.push({ name: "classify" });
      break;
    case "3":
      router.push({ name: "cloud" });
      break;
    case "4":
      router.push({ name: "read" });
      break;
  }
}
</script>

<style scoped>
.carousel-container {
  width: 100%;
  height: 600px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-image: url("../pics/图片8.png");
  background-size: cover;
  background-position: center;
  position: relative; /* 相对定位，以便绝对定位的子元素相对于此定位 */
}
.carousel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8);
}

.carousel-caption {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  max-width: 80%;
}

.carousel-title {
  font-size: 36px;
  margin-bottom: 10px;
  font-weight: bold;
  text-transform: uppercase;
}

.carousel-description {
  font-size: 18px;
  font-weight: 500;
}
</style>
