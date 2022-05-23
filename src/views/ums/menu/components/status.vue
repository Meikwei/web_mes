<template>
  <div>
    <el-switch
      @change="handleStatusChange"
      :active-value="1"
      :inactive-value="0"
      v-model="status"
    >
    </el-switch>
    <el-dialog
      v-model="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="480px"
      title="修改状态"
    >
      <div class="fromTip">
        <el-icon color="#e6a23c" :size="60"><warning /></el-icon>
        <p>是否要修改该状态?</p>
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
import { ref, watchEffect } from "vue";
import { Warning } from "@element-plus/icons-vue";
import { updateStatus } from "/@/api/menu";
const props = defineProps(["rowInfo"]);
const dialogVisible = ref(false);
const status = ref(0);
status.value = props.rowInfo.hidden;
// 当表格数据变化时，重新赋值给status
watchEffect(() => {
  status.value = props.rowInfo.hidden;
});
const open = () => {
  dialogVisible.value = true;
};
const close = () => {
  dialogVisible.value = false;
  status.value = props.rowInfo.hidden;
};
const handleStatusChange = (val: number) => {
  open();
};
const emit = defineEmits(["changePage"]);
const submit = () => {
  updateStatus(props.rowInfo.id, { hidden: status.value })
    .then(() => {
      emit("changePage");
      dialogVisible.value = false;
    })
    .catch(() => {
      close();
    });
};
</script>
