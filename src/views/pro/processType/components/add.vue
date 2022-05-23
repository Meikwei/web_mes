<script setup lang="ts">
import { reactive, ref } from "vue";
import type { ElForm } from "element-plus";
import { create } from "/@/api/processType";
const dialogVisible = ref(false);
const paramsFrom = reactive({
  id: null,
  typeName: null,
  typeCode: null,
  typeDescription: null,
  status: 1,
  crateUser: null,
  updateUser: null,
  createTime: null,
  updatetime: null
});
const rules = reactive({
  typeName: [
    {
      required: true,
      message: "请输人制程名称！",
      trigger: "blur"
    }
  ],
  typeCode: [
    {
      required: true,
      message: "请输入制程类型常量！",
      trigger: "blur"
    }
  ]
});
type FormInstance = InstanceType<typeof ElForm>;
const formRef = ref<FormInstance>();
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const open = () => {
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
      create(paramsFrom)
        .then(() => {
          emit("changePage");
          close(formEl);
        })
        .catch(() => {
          close(formEl);
        });
    } else {
      return false;
    }
  });
};
</script>
<template>
  <div>
    <el-button size="small" @click="open">添加</el-button>
    <el-dialog v-model="dialogVisible" title="添加制程类型" width="480px">
      <el-form
        :model="paramsFrom"
        :rules="rules"
        ref="formRef"
        label-width="120px"
      >
        <el-form-item label="制程类型名称：" prop="typeName">
          <el-input
            v-model="paramsFrom.typeName"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="制程类型常量：" prop="typeCode">
          <el-input
            v-model="paramsFrom.typeCode"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="typeDescription">
          <el-input
            v-model="paramsFrom.typeDescription"
            type="textarea"
            :rows="5"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="paramsFrom.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
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
  </div>
</template>
