
<script setup>

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getMyPetDetail, abandonPet } from '../api/pet';
import { ElMessage, ElMessageBox } from 'element-plus';
import router from '../router';

const route = useRoute();

const id = route.params.id;

const pet = ref({});

onMounted(async () => {

    try {

        const res = await getMyPetDetail(id);

        if (res.data.code !== 200) {
            ElMessage.error(res.data.message);
        } else {
            pet.value = res.data.data;
        }

    } catch {
        ElMessage.error("服务器异常");
    }
        
})

function goBack() {
    router.push("/details/pets");
}

async function abandon(id) {

    try {
            
        await ElMessageBox.confirm(
            "确定放弃领养吗？",
            "提示",
            {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }
        );

        const res = await abandonPet(id);

        ElMessage.success(res.data.data);

        router.push("/details/pets");

        
    } catch (e) {
        console.log(e);
        ElMessage.info("已取消弃养");
    }

}

</script>

<template>

    <el-card class="my-details">

        <template #header>
            <div>宠物详情</div>
        </template>

        <el-descriptions title="宠物信息" border :column="1">

            <el-descriptions-item label="姓名">
                {{ pet.name }}
            </el-descriptions-item>
            <el-descriptions-item label="类型">
                {{ pet.type }}
            </el-descriptions-item>
            <el-descriptions-item label="年龄">
                {{ pet.age }}
            </el-descriptions-item>

        </el-descriptions>

        <el-button @click="goBack">返回</el-button>
        <el-button type="danger" @click="abandon(pet.id)">弃养</el-button>

    </el-card>
    
</template>

<style scoped>
.my-details {
    width: 400px;

    margin: 100px auto;
}
</style>