
<script setup>

import { onMounted, ref } from 'vue';
import { getUserVO } from '../api/user';

import router from '../router/index';
import { ElNotification } from 'element-plus';

const username = ref("");


onMounted(async () =>  {
    try {
        const res = await getUserVO();

        if (res.data.code !== 200) {
            ElNotification({
                type: "error",
                title: "获取用户信息失败",
                message: res.data.message
            });

            return;
        }

        username.value = res.data.data.username;
    } catch {
         ElNotification({
            type: "error",
            title: "服务器错误",
        });
    }

})

function toMyPets() {

    router.push("/details/pets");   
    
}

function toPetHall() {

    router.push("/pethall");
    
}

</script>


<template>

    <el-card class="user-card">
        
        <template #header>
            <div>个人中心</div>
        </template>

        <div class="user-info">

            <!-- <el-avater>{{ username }}</el-avater> -->

            <h2>这是{{ username }}家</h2>

        </div>

        <el-button type="primary" @click="toMyPets">我的宠物</el-button>

        <el-button @click="toPetHall">宠物广场</el-button>

    </el-card>
    
</template>

<style scoped>

.user-card{
    width: 400px;
    margin: 100px auto;
}

.user-info{
    text-align: center;
    margin-bottom: 30px;
}

</style>
