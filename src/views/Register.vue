<script setup>

import { ref } from 'vue';
import { register } from '../api/user';

import router from '../router/index';



const username = ref("");

const password = ref("");

async function handleRegister() {

    console.log("注册");

    const res = await register({
        username: username.value,
        password: password.value
    });

    console.log(res);

    if (res.data.code !== 200) {
        alert(res.data.message);
        return;
    }

    alert("注册成功");

    router.push("/login");


}

</script>


<template>


    <h1>
        注册
    </h1>

    <form @submit.prevent = "handleRegister">

        用户名<input type="text" v-model="username"> <br>
        
        密码 <input type="password" v-model="password"> <br>

        

        <button type="submit">注册</button>
        
        
    </form>

    <div>


        提示：当前注册用户为{{ username }}


    </div>


    
</template>