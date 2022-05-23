<template>
  <div class="operationClass">
    <el-button size="small" @click="open">删除</el-button>
    <el-dialog
      v-model="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="480px"
      title="提示"
    >
      <div class="fromTip">
        <el-icon color="#e6a23c" :size="60"><warning /></el-icon>
        <p>是否要删除数据？</p>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="submit">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Warning } from "@element-plus/icons-vue";
import { deleteBatch } from "/@/api/role";
const props = defineProps(["id"]);
const dialogVisible = ref(false);
const open = () => {
  dialogVisible.value = true;
};
const close = () => {
  dialogVisible.value = false;
};
const emit = defineEmits(["changePage"]);
const submit = () => {
  deleteBatch([props.id])
    .then(() => {
      emit("changePage");
      close();
    })
    .catch(() => {
      close();
    });
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.fromTip {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
</style>
