<script setup>

import { ref } from 'vue';

import router from '../router/index';
import { getUserVO, login } from '../api/user';
import { ElNotification } from 'element-plus';
import { useUserStore } from '../store/user';

const username = ref("");

const password = ref("");

const userStore = useUserStore();

async function handleLogin() {

    const res = await login({
        username: username.value,
        password: password.value
    });

    ElNotification({
        type: "success",
        message: "登录成功",
    })

    userStore.setToken(res.data.data.token);

    const user = await getUserVO();

    console.log(user.data.data);

    userStore.setUserInfo(user.data.data);

    router.push('/details');
    
}

function button_register() {

    //注册界面
    router.push('/register');

}

</script>

<template>

    <el-card class="login-card">

        <h1>登录</h1>

        <el-form @submit.prevent = "handleLogin">

            <el-form-item label="用户名">
                <el-input 
                    v-model="username"
                    placeholder="请输入用户名"
                />
            </el-form-item>

            <el-form-item label="密码">
                <el-input 
                    v-model="password"
                    type="password"
                    placeholder="请输入密码"
                    show-password
                />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" native-type="submit">登录</el-button>

                <el-button @click="button_register">注册</el-button>
            </el-form-item>
            
            
        </el-form>
    </el-card>
    
</template>

<style scoped>

.login-card {
    width: 400px;

    margin: 100px auto;
}

</style>