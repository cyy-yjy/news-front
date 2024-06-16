
<template>
  <div class="ai-module-banner">
    <div class="ai-module-banner-content">
      <div class="ai-module-banner-title">
        基于大模型的集成化新闻处理中心
      </div>
      <div class="ai-module-banner-info">
        一款集强大功能于一身的智能平台，旨在提升用户的新闻处理体验。
        利用先进的大模型技术，实现多样化功能，不仅能满足
        新闻编辑和阅读者的需求，为内容生产者提供灵感，
        还能为用户带来更便捷、高效和互动的新闻处理体验。
      </div>
    </div>
    <!---->
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.ai-module-banner {
  border-radius: 8px;
  font: 14px BlinkMacSystemFont, Roboto, Helvetica Neue, Helvetica,
    PingFangSC-Regular, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  position: relative;
  height: 700px;
  background: no-repeat 50%;
  background-size: cover;
  overflow: hidden;
  width: 100%;
  margin-bottom: 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  background: no-repeat 50%;
  -moz-background-size: cover;
  background-size: cover;
  overflow: hidden;
  background-image: url("../pics/5.png");
  margin-top: 10px;
}
.ai-module-banner-title {
  font: 14px BlinkMacSystemFont, Roboto, Helvetica Neue, Helvetica,
    PingFangSC-Regular, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  height: 67px;
  font-size: 48px;
  letter-spacing: 2px;
  color: #fff;
  position: relative;
}

.ai-module-banner-info {
  font: 14px BlinkMacSystemFont, Roboto, Helvetica Neue, Helvetica,
    PingFangSC-Regular, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  margin: 30px 110px 0 0;
  font-size: 16px;
  line-height: 26px;
  color: #fff;
}

.ai-module-banner-content {
  overflow: hidden;
  width: 800px;
  text-align: left;
  position: absolute;
  top: 50%;
  left: 35%;
  margin-left: 50px;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 1;
}

.ai-module-banner-title {
  height: 67px;
  font-size: 48px;
  letter-spacing: 2px;
  color: #fff;
  position: relative;
}

.ai-module-banner-info {
  margin: 30px 110px 0 0;
  font-size: 16px;
  line-height: 26px;
  color: #fff;
}

</style>
