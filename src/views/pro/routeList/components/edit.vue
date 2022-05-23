<script setup lang="ts">
import { reactive, ref, defineProps } from "vue";
import type { ElForm } from "element-plus";
import { update } from "/@/api/bom";
const props = defineProps(["rowInfo"]);
const dialogVisible = ref(false);
let paramsFrom = reactive({
  bomVersion: null,
  createTime: null,
  createUser: null,
  id: null,
  partNo: null,
  remark: null,
  status: null
});
const rules = reactive({
  partNo: [
    {
      required: true,
      message: "请输入物料编号！",
      trigger: "blur"
    }
  ],
  bomVersion: [
    {
      required: true,
      message: "请输入物料版本！",
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
      title="编辑物料"
      width="480px"
    >
      <el-form
        :model="paramsFrom"
        :rules="rules"
        ref="formRef"
        label-width="120px"
        size="small"
      >
        <el-form-item label="物料编号：" prop="partNo">
          <el-input v-model="paramsFrom.partNo" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="物料版本：" prop="bomVersion">
          <el-input
            v-model="paramsFrom.bomVersion"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="paramsFrom.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input
            v-model="paramsFrom.remark"
            :autosize="{
              minRows: 2,
              maxRows: 6
            }"
            type="textarea"
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
