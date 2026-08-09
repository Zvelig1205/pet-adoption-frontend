<script setup>

import { ref } from 'vue';
import { register } from '../api/user';

import router from '../router/index';
import { ElNotification } from 'element-plus';



const username = ref("");

const password = ref("");

async function handleRegister() {

    try {

        const res = await register({
            username: username.value,
            password: password.value
        });

        if (res.data.code !== 200) {

            ElNotification({
                type: "error",
                title: "注册失败",
                message: res.data.message,
            })

            return;
        }

        ElNotification({
            type: "success",
            title: "注册成功",
        })

        router.push("/login");

    } catch {
        ElNotification({
            type: "error",
            title: "服务器错误",
        });
    }

}

</script>


<template>

    <el-card class="register-card">

        <h1>注册</h1>

        <el-form @submit.prevent = "handleRegister">

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
                <el-button type="primary" native-type="submit">注册</el-button>
            </el-form-item>
            
        </el-form>

    </el-card>

</template>

<style scoped>

.register-card {
    width: 400px;

    margin: 100px auto;
}

</style>