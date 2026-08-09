
<script setup>
import { onMounted } from 'vue';

import router from '../router/index';
import { useUserStore } from '../store/user';
import { getUserVO } from '../api/user';

const userStore = useUserStore();

onMounted(async () => {
    if (userStore.token && !userStore.userInfo) {

        const res = await getUserVO();

        userStore.setUserInfo(res.data.data);
        
    }
})

function logout() {

    userStore.logout();
    router.push('/login');
}

</script>

<template>

    <el-container class="layout">
        
        <el-header>
            
            <el-menu mode="horizontal" router>

                <el-menu-item index="/pethall">
                    宠物广场
                </el-menu-item>
                <el-menu-item index="/details">
                    个人中心
                </el-menu-item>
                <el-menu-item @click="logout">
                    <el-button link>
                        退出登录
                    </el-button>
                </el-menu-item>            
                
            </el-menu>


        </el-header>

        <el-main>
            <router-view/>
        </el-main>

    </el-container>

</template>

<style scoped>

.layout {
    height: 100vh;
}

.header {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

</style>