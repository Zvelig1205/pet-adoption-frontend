
<script setup>
import { onMounted, ref } from 'vue';
import { abandonPet, getMyPets } from '../api/pet';

import router from '../router/index';
import { ElMessage, ElMessageBox } from 'element-plus';

const petList = ref([]);
const page = ref(1);
const size = ref(10);
const total = ref();

async function loadMyPets() {

    try{

        const res = await getMyPets(
            page.value,
            size.value
        );

        updateView(res.data.data);

    } catch {
        ElMessage.error("请求失败");        
    }
        
}

function updateView(res) {
    petList.value = res.records;

    total.value = res.total;
}

onMounted(() => {
    loadMyPets();
})

function details(id) {
    router.push(`/my/pet/${id}`);
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

        loadMyPets();
        
    } catch {
        ElMessage.info("已取消弃养");
    }

}

async function handleCurrentChange(newPage) {

    page.value = newPage;

    loadMyPets();

}

async function handleSizeChange(newSize) {

    size.value = newSize;
    page.value = 1;

    loadMyPets();
}

</script>


<template>

    <el-card class="my-pet">
        <template #header>
            <div>我的宠物</div>
        </template>

        <el-table :data="petList" border>

            <el-table-column prop="id" label="编号" width="80"/>
            <el-table-column prop="name" label="名字"/>
            <el-table-column prop="type" label="类型"/>
            <el-table-column prop="age" label="年龄"/>

            <el-table-column label="操作" width="150">
                <template #default="scope">
                    <el-button size="small" @click="details(scope.row.id)">查看</el-button>
                    <el-button size="small" type="danger" @click="abandon(scope.row.id)">弃养</el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-pagination
            v-model:current-page="page"
            v-model:page-size="size"
            :page-sizes="[1,2,5,10,20,50,100]"
            :total="total"
            layout="prev, pager, next, sizes, total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />

    </el-card>
    
</template>
