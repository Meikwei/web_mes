<script setup lang="ts">
import useCurrentInstance from "/@/utils/vueInstance";
const { globalProperties } = useCurrentInstance();
const query = globalProperties.$router.currentRoute.value.query;
const props = defineProps({ id: Number });

const navigation = () => {
  console.log(props);
  globalProperties.$router.push({
    path: "/pro/logic",
    query: { id: props.id }
  });
};
</script>
<template>
  <div class="operationClass">
    <el-button size="small" @click="navigation">添加</el-button>
  </div>
</template>
