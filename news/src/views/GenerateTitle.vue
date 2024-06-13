<template>
    <header>生成标题</header>
    <el-row>
        <el-col :span="6">
            <el-input v-model="textInput" style="width: 400px" size="large" :autosize="{ minRows: 10, maxRows: 15 }"
                maxlength="1000" placeholder="Please input" show-word-limit clearable type="textarea">
            </el-input>
            <el-button round @click="generateTitle()" class="searchbutton">
                生成标题
                <el-icon>
                    <Search />
                </el-icon>
            </el-button>
            <div class="flex gap-2">
                <el-tag v-for="(history, index) in reversedhistoryRecords" :key="index" closable @click="openHistory(index)"
                    @close="deleteHistory(index)" :class="{ 'tag-selected': selectedTagIndex == index }">
                    {{ history.front }}
                </el-tag>
            </div>
        </el-col>
        <el-col :span="6" :offset="6">
            <el-input v-model="titleResult" style="width: 400px" placeholder="Result" clearable type="text">
                <template #prepend>
                    生成结果：
                </template>
            </el-input>
        </el-col>

    </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import origin from '@/apis/origin'
import { onBeforeUnmount, onMounted } from 'vue'
const textInput = ref('')
const titleResult = ref(' ')
const historyRecords = ref([{
    front: "1", text: "111", title: "111"
}, {
    front: "2", text: "111", title: "111"
}, {
    front: "3", text: "111", title: "111"
}])
const reversedhistoryRecords = ref([{
    front: "3", text: "111", title: "111"
}, {
    front: "2", text: "111", title: "111"
}, {
    front: "1", text: "111", title: "111"
}])
const selectedTagIndex = ref(-1)
const generateTitle = async () => {
    try {
        console.log(123);
        console.log(typeof (textInput.value))
        const formData = {
            text: textInput.value
        }
        const response = await origin.generateTitle(formData)

        titleResult.value = response
        let textFront = '';
        if (textInput.value.length < 10) {
            textFront = textInput.value
        } else {
            textFront = textInput.value.slice(0, 10);
        }
        historyRecords.value.push({ front: textFront + '...', text: textInput.value, title: response.msg })
        if (historyRecords.value.length > 5) {
            historyRecords.value.shift();//从头部去掉
        }
        reversedhistoryRecords.value = historyRecords.value.reverse()
        console.log('生成标题成功' + titleResult.value);
    } catch (error) {
        console.error('往后端传数据时出错：', error);
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
}
const openHistory = (index: number) => {
    console.log("click", index)
    selectedTagIndex.value = index;
    console.log(selectedTagIndex.value)
    textInput.value = reversedhistoryRecords.value[index].text;
    titleResult.value = reversedhistoryRecords.value[index].title;
}
onMounted(() => {

})
onBeforeUnmount(() => {
    localStorage.clear();
    localStorage.setItem("text", textInput.value);
    localStorage.setItem("title", titleResult.value);
    localStorage.setItem("historyRecords", JSON.stringify(historyRecords.value));
    console.log('组件即将被卸载');
});
</script>
<style scoped>
.tag-selected {
    background-color: #b1b3b8;
}
</style>