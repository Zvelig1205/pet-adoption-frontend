
<script setup>

import { onMounted, ref } from 'vue';
import { getUserVO } from '../api/user';

import router from '../router/index';
import { ElNotification } from 'element-plus';
import { useUserStore } from '../store/user';

const username = ref("");

const userStore = useUserStore();


// onMounted(async () => {
    
//     const res = await getUserVO();

//     username.value = res.data.data.username;

// })

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

        <div class="user-info" v-if="userStore.userInfo">

            <h2>这是{{ userStore.userInfo.username }}家</h2>

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
