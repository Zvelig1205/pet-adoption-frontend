
<script setup>
import { onMounted, ref } from 'vue';
import { adoptPet, getUnadoptedPets } from '../api/pet';

import router from '../router/index';


const petList = ref();

onMounted(async () => {

    const res = await getUnadoptedPets();

    console.log(res);

    petList.value = res.data.data;

});

function details(id) {
    router.push(`/pet/${id}`)
}

async function adopt(id) {
    const res = await adoptPet(id);

    console.log(res);

    alert(res.data.data);

    const newList = await getUnadoptedPets();

    petList.value = newList.data.data;

}

</script>



<template>

    <h1>宠物广场</h1>

    <ul>
        <li v-for="pet in petList">
            {{ pet }}

            
            <button @click="details(pet.id)">查看</button>
            <button @click="adopt(pet.id)">领养</button>
        </li>
    </ul>
    
</template>

