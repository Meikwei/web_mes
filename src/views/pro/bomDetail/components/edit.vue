<script setup lang="ts">
import { reactive, ref, defineProps } from "vue";
import type { ElForm } from "element-plus";
import { update } from "/@/api/bomDetail";
const props = defineProps(["rowInfo"]);
const dialogVisible = ref(false);
let paramsFrom = reactive({
  attritionPart: null,
  bomId: null,
  createTime: null,
  createUser: null,
  id: null,
  itemCode: null,
  itemDescribe: null,
  itemPartNo: null,
  itemQty: null,
  itemScanType: null,
  itemShopName: null,
  itemSort: null,
  itemUnit: null,
  points: null,
  remark: null,
  replaceLevel: null,
  status: null
});
const rules = reactive({
  name: [
    {
      required: true,
      message: "请输入菜单名称！",
      trigger: "blur"
    }
  ],
  title: [
    {
      required: true,
      message: "请输入前端名称！",
      trigger: "blur"
    }
  ],
  icon: [
    {
      required: true,
      message: "请输入前端图标！",
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
      title="修改物料详情"
      width="480px"
    >
      <el-form
        :model="paramsFrom"
        :rules="rules"
        ref="formRef"
        label-width="120px"
        size="small"
      >
        <el-form-item label="物料代码：" prop="itemShopName">
          <el-input
            v-model="paramsFrom.itemShopName"
            style="width: 250px"
          ></el-input>
        </el-form-item>

        <el-form-item label="替代物料：" prop="itemCode">
          <el-input
            v-model="paramsFrom.itemCode"
            style="width: 250px"
          ></el-input>
        </el-form-item>

        <el-form-item label="刷入方式：" prop="itemScanType">
          <el-input
            v-model="paramsFrom.itemScanType"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="废品率：" prop="attritionPart">
          <el-input
            v-model="paramsFrom.attritionPart"
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
