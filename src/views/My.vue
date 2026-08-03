
<script setup>

import { onMounted, ref } from 'vue';
import { getUserVO } from '../api/user';

import router from '../router/index';

const username = ref("");


onMounted(async () =>  {

    const res = await getUserVO();

    console.log(res);

    username.value = res.data.data.username;

})

function toMyPets() {

    router.push("/details/pets");   
    
}

function toPetHall() {

    router.push("/pethall");
    
}


</script>


<template>

    <h1>个人中心</h1>

    <p>这是{{ username }}家</p>

    <button @click="toMyPets">我的宠物</button>
    <br>

    <button @click="toPetHall">宠物广场</button>

    
</template>
