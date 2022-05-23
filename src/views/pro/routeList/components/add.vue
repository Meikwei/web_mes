<script setup lang="ts">
import useCurrentInstance from "/@/utils/vueInstance";
const { globalProperties } = useCurrentInstance();
const navigation = () => {
  globalProperties.$router.push({
    path: "/pro/logic"
  });
};
</script>
<template>
  <div>
    <el-button size="small" @click="navigation">添加</el-button>
  </div>
</template>
