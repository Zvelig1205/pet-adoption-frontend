<script setup>

import { ref } from 'vue';

import router from '../router/index';
import { login } from '../api/user';

const username = ref("");

const password = ref("");

async function handleLogin() {

    console.log("登录");

    const res = await login({
        username: username.value,
        password: password.value
    });

    console.log(res);

    if (res.data.code !== 200) {

        if (res.data.data) {
            alert(res.data.message + "，" + res.data.data);
        } else {
            alert(res.data.message);
        }
        return;
        
    }

    console.log("登录成功");

    localStorage.setItem("token", res.data.data.token);

    router.push('/details');

}



function button_register() {

    console.log("点击注册按钮");

    //注册界面
    router.push('/register');

}

</script>

<template>


    <h1>
        登录
    </h1>

    <form @submit.prevent = "handleLogin">

        用户名<input type="text" v-model="username"> <br>
        
        密码 <input type="password" v-model="password"> <br>

        <button type="submit">登录</button>

        <button type="button" @click="button_register">注册</button>
        
        
    </form>

    <div>


        提示：当前登录用户为{{ username }}


    </div>


    
</template>

