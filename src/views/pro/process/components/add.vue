<script setup lang="ts">
import { reactive, ref } from "vue";
import type { ElForm } from "element-plus";
import { create } from "/@/api/process";
const props = defineProps(["typeList"]);
const dialogVisible = ref(false);
const paramsFrom = reactive({
  createTime: null,
  createUser: null,
  defectFlag: null,
  id: null,
  mixWo: null,
  processDescribe: null,
  processName: null,
  status: null,
  typeId: null,
  updateTime: null,
  updateUser: null
});
const rules = reactive({
  name: [
    {
      required: true,
      message: "请输入角色名称！",
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
    <el-dialog v-model="dialogVisible" title="添加制程" width="480px">
      <el-form
        :model="paramsFrom"
        :rules="rules"
        ref="formRef"
        label-width="120px"
        size="small"
      >
        <el-form-item label="制程类型：" prop="typeId">
          <el-select v-model="paramsFrom.typeId" style="width: 250px">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.typeName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="制程名称：" prop="processName">
          <el-input
            v-model="paramsFrom.processName"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="可打不良：">
          <el-radio-group v-model="paramsFrom.defectFlag">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否混包：">
          <el-radio-group v-model="paramsFrom.mixWo">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="paramsFrom.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述：" prop="processDescribe">
          <el-input
            v-model="paramsFrom.processDescribe"
            type="textarea"
            :rows="5"
            style="width: 250px"
          ></el-input>
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
