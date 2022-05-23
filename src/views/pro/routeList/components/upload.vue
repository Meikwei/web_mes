<template>
  <div>
    <el-button size="small" @click="open">添加</el-button>
    <el-dialog v-model="dialogVisible" title="添加BOM" width="400px">
      <el-upload
        class="upload-demo"
        ref="uploadRef"
        drag
        :action="URL"
        :headers="headers"
        :on-success="success"
        :on-exceed="handleExceed"
        :on-error="error"
        :multiple="false"
        :auto-upload="false"
        :limit="1"
        accept=".xlsx,.xls"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">将文件拖到此处,或<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">
            提示：只能上传.xlsx和.xls文件，且不超过1个!
          </div>
        </template>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="submitUpload">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import { ElMessage, ElUpload } from "element-plus";
import { loadEnv } from "@build/index";
import { getToken } from "/@/utils/auth";
import { UploadFile } from "element-plus/es/components/upload/src/upload.type";
import { Awaitable } from "@vueuse/core";
const uploadRef = ref<InstanceType<typeof ElUpload>>();
const dialogVisible = ref(false);
// 上传地址
const URL = ref("");
const token = getToken();
const data = JSON.parse(token);
// 上传token
const headers: any = { Authorization: "Bearer " + data.accessToken };
const { VITE_PROXY_DOMAIN_REAL } = loadEnv();
const open = () => {
  URL.value = VITE_PROXY_DOMAIN_REAL + "bom/uploadFile";
  dialogVisible.value = true;
  console.log(VITE_PROXY_DOMAIN_REAL);
};
const close = () => {
  dialogVisible.value = false;
};
//点击文件列表中已上传的文件时的钩子
const preview = (file: UploadFile) => {};
//文件列表移除文件时的钩子
const remove = (file: UploadFile, fileList: UploadFile[]) => {};
const emit = defineEmits(["changePage"]);
//文件上传成功时的钩子
const success = (response: any, file: UploadFile, fileList: UploadFile[]) => {
  if (response.code != 200) {
    ElMessage.error(response.message);
    uploadRef.value.clearFiles();
    return;
  }
  dialogVisible.value = false;
  uploadRef.value.clearFiles();
  emit("changePage");
};
// 文件上传失败时的钩子
const error = (error, file: UploadFile, fileList: UploadFile[]) => {
  console.error(error);
};
//文件上传时的钩子
const progress = (evt: unknown, file: UploadFile, fileList: UploadFile[]) => {};
//文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
const change = (file: UploadFile, fileList: UploadFile[]) => {};
//上传文件之前的钩子，参数为上传的文件。 若返回 false 或者返回 Promise 且被 reject，则终止上传。
const beforeUpload = (
  file: unknown
): Awaitable<void | undefined | null | boolean | File | Blob> => {};
//删除文件之前的钩子，参数为上传的文件和文件列表。 若返回 false 或者返回 Promise 且被 reject，则终止删除。
const beforeRemove = (file: UploadFile, fileList: UploadFile[]): any => {};
//超出文件限制的钩子
const handleExceed = files => {
  uploadRef.value.clearFiles();
  uploadRef.value.handleStart(files[0]);
};

const submitUpload = () => {
  uploadRef.value!.submit();
};
</script>
