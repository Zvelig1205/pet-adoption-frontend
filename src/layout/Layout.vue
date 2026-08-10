
<script setup>
import { onMounted } from 'vue';

import router from '../router/index';
import { useUserStore } from '../store/user';
import { getUserVO, logout } from '../api/user';

const userStore = useUserStore();

onMounted(async () => {
    if (userStore.token && !userStore.userInfo) {

        const res = await getUserVO();

        userStore.setUserInfo(res.data.data);
        
    }
})

async function handleLogout() {

    await logout(userStore.token);

    userStore.logout();
    router.push('/login');
}
function handleLogin() {
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
                <el-menu-item @click="handleLogout" v-if="userStore.token">
                    <el-button link>
                        退出登录
                    </el-button>
                </el-menu-item>     
                <el-menu-item @click="handleLogin" v-if="!userStore.token">
                    <el-button link>
                        登录
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