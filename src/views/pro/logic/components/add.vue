<script lang="ts" setup>
import { reactive, ref, watchEffect } from "vue";
import { commonStoreHook } from "/@/store/modules/commonStore";
import { getProcessSelect } from "/@/api/process";
import { processType } from "/@/api/processType";
import { ElForm } from "element-plus";
const store = commonStoreHook();
const dialogVisible = ref(false);
const paramsFrom = reactive({
  processId: "",
  typeId: "",
  typeCode: "",
  processName: "",
  processRouteStatus: "",
  startAndStop: ""
});
// 制程类型
const processTypeList = ref([]);
const getProcessType = async () => {
  const data = await processType();
  processTypeList.value = data;
};
// 制程名称
const processList = ref([]);
const changeType = async val => {
  const data = await getProcessSelect(val);
  processList.value = data;
  paramsFrom.typeCode = processTypeList.value.find(i => i.id === val).typeCode;
  paramsFrom.processName = "";
};
const rules = reactive({
  typeId: [
    {
      required: true,
      message: "请选择容器类型！",
      trigger: "chang"
    }
  ],
  processName: [
    {
      required: true,
      message: "请选择制程名称！",
      trigger: "change"
    }
  ]
});
type FormInstance = InstanceType<typeof ElForm>;
const formRef = ref<FormInstance>();
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const open = async () => {
  await getProcessType();
  dialogVisible.value = true;
};
const close = (formEl: FormInstance | undefined) => {
  dialogVisible.value = false;
  resetForm(formEl);
};
const emit = defineEmits(["changePage"]);
const submit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      const lf = store.lf;
      lf.addNode({
        type: paramsFrom.typeCode,
        x: 300,
        y: 300,
        text: {
          x: 300,
          y: 300,
          value: paramsFrom.processName
        },
        properties: paramsFrom
      });
      close(formEl);
    } else {
      return false;
    }
  });
};
defineExpose({
  open
});
</script>
<template>
  <el-dialog v-model="dialogVisible" width="334px" title="添加制程">
    <el-form
      :model="paramsFrom"
      :rules="rules"
      label-width="120px"
      ref="formRef"
    >
      <el-form-item label="制程类型：" prop="typeId">
        <el-select v-model="paramsFrom.typeId" @change="changeType">
          <el-option
            v-for="item in processTypeList"
            :key="item.id"
            :label="item.typeName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="制程名称：" prop="processName">
        <el-select v-model="paramsFrom.processName">
          <el-option
            v-for="item in processList"
            :key="item.id"
            :label="item.processName"
            :value="item.processName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="流程起始：" prop="startAndStop">
        <el-radio-group v-model="paramsFrom.startAndStop">
          <el-radio :label="1">开始</el-radio>
          <el-radio :label="2">结束</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close(formRef)">取消</el-button>
        <el-button type="primary" @click="submit(formRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
