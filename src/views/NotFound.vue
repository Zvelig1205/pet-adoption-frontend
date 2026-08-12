
<script setup>

import { useRouter } from 'vue-router';

const router = useRouter();

function goHome() {
    router.push("/pethall");
}

</script>


<template>

    <div class="not-found">

        <el-result
            icon="warning"
            title="404"
            sub-title="抱歉，你访问的页面不存在"
        >
            <template #extra>
                <el-button type="primary" @click="goHome">
                    返回宠物大厅
                </el-button>
            </template>
        </el-result>

    </div>

</template>

<style scoped>

.not-found {

    min-height: 100vh;

    display: flex;

    justify-content: center;

    align-items: center;

}

</style>