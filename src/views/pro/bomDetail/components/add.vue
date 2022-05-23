<script setup lang="ts">
import { reactive, ref, defineProps } from "vue";
import type { ElForm } from "element-plus";
import { create } from "/@/api/menu";
const dialogVisible = ref(false);
const props = defineProps(["menuList"]);
const paramsFrom = reactive({
  id: null,
  parentId: 0,
  name: null,
  title: null,
  icon: null,
  level: null,
  sort: null,
  path: null,
  redirect: null,
  hidden: 1
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
//表格重置
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
    <el-dialog v-model="dialogVisible" title="添加菜单" width="480px">
      <el-form
        :model="paramsFrom"
        :rules="rules"
        ref="formRef"
        label-width="120px"
        size="small"
      >
        <el-form-item label="菜单名称：" prop="name">
          <el-input v-model="paramsFrom.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单：" prop="parentId">
          <el-select v-model="paramsFrom.parentId" placeholder="请选择菜单">
            <el-option
              v-for="item in props.menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="前端名称：" prop="title">
          <el-input v-model="paramsFrom.title" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="前端图标：" prop="icon">
          <el-input v-model="paramsFrom.icon" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="paramsFrom.hidden">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序：" prop="sort">
          <el-input v-model="paramsFrom.sort" style="width: 250px"></el-input>
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
