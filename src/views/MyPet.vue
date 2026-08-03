
<script setup>

import { onMounted, ref } from 'vue';
import { abandonPet, getMyPets } from '../api/pet';

import router from '../router/index';



const petList = ref("");

onMounted(async () =>  {

    const res = await getMyPets();

    console.log(res);

    petList.value = res.data.data;

})

function details(id) {
    router.push(`/my/pet/${id}`)
}

async function abandon(id) {
    const res = await abandonPet(id);

    console.log(res);

    alert(res.data.data);

    const newList = await getMyPets();

    petList.value = newList.data.data;

}

</script>


<template>

    <h1>我的宠物</h1>


    <ul>
        <li v-for="pet in petList">

            宠物编号：{{ pet.id }}号<br>
            宠物姓名：{{ pet.name }}<br>
            宠物类型：{{ pet.type }}<br>
            宠物年龄：{{ pet.age }}<br><br>

            <button @click="details(pet.id)">查看</button>
            <button @click="abandon(pet.id)">弃养</button>

        </li>
    </ul>
    
    
</template>
