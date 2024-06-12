<template>
    <header>分类</header>
    <el-row>
        <el-col :span="6" :offset="6">
            <el-input
                v-model="titleInput"
                style="width: 400px"
                placeholder="Pleas input news title"
                clearable
                type="text"
            >
            <template #prepend>
                生成结果：
            </template>
            </el-input>
            <el-button round @click="classify()" class="searchbutton">
                生成分类
                <el-icon><Search /></el-icon>
            </el-button>
        </el-col>
    </el-row>
</template>


<script setup>

import { ref, onMounted } from 'vue'
import origin from '@/apis/origin'
const titleInput=ref('')
const classifyResult=ref('')
const historyRecords=ref([])
onMounted(()=>{
    let title = localStorage.getItem("title");
    let history = JSON.parse(localStorage.getItem("historyRecords"));
    if (title) {
        titleInput.value=title;
    }
    if (history) {
        historyRecords.value = history;
    }
    console.log("mount")
});
const classify = async () => {
        try {
            const response = await origin.classifynews({text:titleInput.value})
            classifyResult.value = response
            console.log('分类成功');
        } catch (error) {
            console.error('往后端传数据时出错：', error);
        }
    };</script>