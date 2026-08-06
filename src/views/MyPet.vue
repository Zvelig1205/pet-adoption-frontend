
<script setup>

import { onMounted, ref } from 'vue';
import { abandonPet, getMyPets } from '../api/pet';

import router from '../router/index';

const petList = ref([]);
const page = ref(1);
const size = ref(10);
const total = ref();

const totalPage = ref();

function updateView(res) {
    petList.value = res.records;

    total.value = res.total;
    page.value = res.page;
    size.value = res.size;

    totalPage.value =Math.max(1, Math.ceil(total.value / size.value));

}

onMounted(async () =>  {

    const res = await getMyPets();

    console.log(res);

    updateView(res.data.data);

})

function details(id) {
    router.push(`/my/pet/${id}`)
}

async function abandon(id) {
    const res = await abandonPet(id);

    console.log(res);

    alert(res.data.data);

    const newList = await getMyPets();

    updateView(newList.data.data);

}

async function handleChange() {

    const res = await getMyPets(1, size.value);

    updateView(res.data.data);
}

async function prevPage() {

    if (page.value === 1) {
        alert("没有了");
    } else {
        const res = await getMyPets(page.value - 1, size.value);

        updateView(res.data.data);
    }

}

async function nextPage() {

    if (page.value === totalPage.value) {
        alert("没有了");
    } else {
        const res = await getMyPets(page.value + 1, size.value);

        updateView(res.data.data);
    }

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

    <p>当前页面为第 {{ page }} 页，共 {{ totalPage }} 页</p>

    <button @click="prevPage">上一页</button>

    <button @click="nextPage">下一页</button>
  
    <p>每页有
    <select v-model="size" @change="handleChange">
        <option :value="1">1</option>
        <option :value="2">2</option>
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="50">50</option>
        <option :value="100">100</option>

    </select>
    项</p>


{{ page }}

{{ total }}

{{ size }}

{{ totalPage }}

    
</template>
