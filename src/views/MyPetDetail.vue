
<script setup>

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getMyPetDetail, getPetById } from '../api/pet';

const route = useRoute();

const id = ref(route.params.id);

const pet = ref();

console.log(id.value);

onMounted(async () => {

    const res = await getMyPetDetail(id.value);

    console.log(res);

    pet.value = res.data.data;
        
})



</script>



<template>

    <h1>宠物详情</h1>

    <br>
    宠物 id：{{ id }}

    {{ pet }}

    
</template>