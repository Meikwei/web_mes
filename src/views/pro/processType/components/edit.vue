<script setup lang="ts">
import { reactive, ref, defineProps } from "vue";
import type { ElForm } from "element-plus";
import { update } from "/@/api/processType";
const props = defineProps(["rowInfo"]);
const dialogVisible = ref(false);
let paramsFrom = reactive({
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
  paramsFrom = Object.assign(paramsFrom, props.rowInfo);
  dialogVisible.value = true;
};
const close = (formEl: FormInstance | undefined) => {
  dialogVisible.value = false;
  // 关闭后重置，避免用户察觉数据重置
  setTimeout(() => {
    resetForm(formEl);
  }, 500);
};
const emit = defineEmits(["changePage"]);
const submit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      update(paramsFrom.id, paramsFrom)
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
  <div class="operationClass">
    <el-button size="small" @click="open">编辑</el-button>
    <el-dialog
      v-model="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      title="修改角色"
      width="480px"
    >
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
            <el-radio :label="0">否</el-radio>
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
