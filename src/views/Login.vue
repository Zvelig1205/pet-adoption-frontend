<script setup>

import { ref } from 'vue';

import router from '../router/index';
import { login } from '../api/user';
import { ElNotification } from 'element-plus';

const username = ref("");

const password = ref("");

async function handleLogin() {

    try {

        const res = await login({
            username: username.value,
            password: password.value
        });

        if (res.data.code !== 200) {

            ElNotification({
                type: "error",
                title: "登录失败",
                message: res.data.message,
            });
            
            return;
        }

        ElNotification({
            type: "success",
            message: "登录成功",
        })

        localStorage.setItem("token", res.data.data.token);

        router.push('/details');
        
    } catch (error) {
        ElNotification({
            type: "error",
            title: "服务器错误",
        });
    }

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