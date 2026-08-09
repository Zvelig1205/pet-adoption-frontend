
<script setup>

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { adoptPet, getPetById } from '../api/pet';
import { ElMessage,ElMessageBox } from 'element-plus'
import router from '../router';

const route = useRoute();

const id = route.params.id;

const pet = ref({});

onMounted(async () => {
    
    const res = await getPetById(id);

    pet.value = res.data.data;

})

function goBack() {
    router.push("/pethall");
}

async function adopt(id) {

    try {

        await ElMessageBox.confirm(
            "确定领养该宠物吗？",
            "提示",
            {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }
        )

        const res = await adoptPet(id);

        ElMessage.success(res.data.data);

        router.push(`/my/pet/${id}`);
        
    } catch {
        ElMessage.info("已取消领养");
    }
}

</script>

<template>

    <el-card class="details">

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
        <el-button type="primary" @click="adopt(pet.id)">领养</el-button>

    </el-card>
    
</template>

<style scoped>
.details {
    width: 400px;

    margin: 100px auto;
}
</style>