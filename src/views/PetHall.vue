
<script setup>
import { onMounted, ref } from 'vue';
import { adoptPet, getUnadoptedPets, getPetByName } from '../api/pet';

import router from '../router/index';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search } from "@element-plus/icons-vue";

const petList = ref([]);
const page = ref(1);
const size = ref(10);
const total = ref();

function updateView(res) {
    petList.value = res.records;

    total.value = res.total;
}

async function loadPets() {

    try {

        if (keyword.value) {
            const res = await getPetByName(
                keyword.value,
                page.value,
                size.value
            );
            updateView(res.data.data);
        }
        else {
            const res = await getUnadoptedPets(
                page.value,
                size.value
            );
            updateView(res.data.data);
        }


    } catch {
        ElMessage.error("请求失败");
    }

}

const keyword = ref("");

async function search() {
    loadPets();
}

onMounted(() => {
    loadPets();
});

function details(id) {
    router.push(`/pet/${id}`)
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

        loadPets();
        
    } catch {
        ElMessage.info("已取消领养");
    }
}

function handleCurrentChange(newPage) {

    page.value = newPage;

    loadPets();
}

function handleSizeChange(newSize) {

    size.value = newSize;
    page.value = 1;

    loadPets();
}

</script>


<template>

    <el-card class="pet-hall">
        
        <template #header>
            <div>宠物广场</div>
        </template>

        <el-input 
            v-model="keyword"
            placeholder="请输入要查询的宠物名字"
            style="width: 300px;"
            @keyup.enter="search">

            <template #append>

                <el-button @click="search" circle>
                    <el-icon><Search/></el-icon>
                </el-button>
                
            </template>

        </el-input>

        <el-table :data="petList" border>

            <el-table-column prop="id" label="编号" width="80"/>
            <el-table-column prop="name" label="名字"/>
            <el-table-column prop="type" label="类型"/>
            <el-table-column prop="age" label="年龄"/>

            <el-table-column label="操作" width="150">
                <template #default="scope">
                    <el-button size="small" @click="details(scope.row.id)">查看</el-button>
                    <el-button size="small" type="primary" @click="adopt(scope.row.id)">领养</el-button>
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

