<script setup lang="ts">
import { reactive, ref, defineProps } from "vue";
import type { ElForm } from "element-plus";
import { update } from "/@/api/admin";
const props = defineProps(["rowInfo"]);
const dialogVisible = ref(false);
let paramsFrom = reactive({
  id: null,
  username: null,
  password: null,
  nickName: null,
  email: null,
  note: null,
  status: 1
});
const rules = reactive({
  username: [
    {
      required: true,
      message: "请输入用户名！",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "请输入密码！",
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
      title="编辑用户"
      width="480px"
    >
      <el-form
        :model="paramsFrom"
        :rules="rules"
        ref="formRef"
        label-width="120px"
        size="small"
      >
        <el-form-item label="帐号：" prop="username">
          <el-input
            v-model="paramsFrom.username"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input
            v-model="paramsFrom.nickName"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="paramsFrom.email" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            v-model="paramsFrom.password"
            type="password"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            v-model="paramsFrom.note"
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
