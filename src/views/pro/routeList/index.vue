<script setup lang="ts">
import { ref, reactive, onBeforeMount } from "vue";
import type { ElForm } from "element-plus";
import { statusList } from "/@/utils/constant";
import { getPageList } from "/@/api/proRoute";
// @ts-ignore
import Add from "./components/add.vue";
// @ts-ignore
import Edit from "./components/edit.vue";
// @ts-ignore
import FromDel from "./components/fromDel.vue";
// @ts-ignore
import Status from "./components/status.vue";
// @ts-ignore
import Upload from "./components/upload.vue";
import { status } from "nprogress";
const params = reactive({
  listQuery: {
    routeName: "",
    status: 999,
    pageNum: 1,
    pageSize: 10
  },
  total: 0,
  list: [],
  listLoading: false
});
onBeforeMount(() => {
  getList();
});
const getList = async () => {
  params.listLoading = true;
  const data = await getPageList(params.listQuery);
  console.log(data);
  const { list, totalPage } = data;
  params.list = list;
  params.total = totalPage;
  params.listLoading = false;
};
// 查询数据
const handleSearchList = () => {
  params.listQuery.pageNum = 1;
  getList();
};
// 表单重置
type FormInstance = InstanceType<typeof ElForm>;
const formRef = ref<FormInstance>();
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  console.log(params.listQuery);
  getList();
};
// 改变页码
const handleSizeChange = (val: number) => {
  params.listQuery.pageNum = 1;
  params.listQuery.pageSize = val;
  getList();
};
// 改变页面数量
const handleCurrentChange = (val: number) => {
  params.listQuery.pageNum = val;
  getList();
};
// 改变状态
const handleStatusChange = (index: number, row: unknown) => {};
</script>

<template>
  <div class="welcome">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          type="primary"
          @click="handleSearchList"
          size="small"
        >
          查询搜索
        </el-button>
        <el-button
          style="float: right; margin-right: 15px"
          @click="resetForm(formRef)"
          size="small"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form
          ref="formRef"
          :inline="true"
          :model="params.listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item label="流程名称：" prop="routeName">
            <el-input
              v-model="params.listQuery.routeName"
              class="input-width"
              placeholder="流程名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="流程状态：" prop="status">
            <el-select v-model="params.listQuery.status">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <Add class="btn-add" />
    </el-card>
    <div class="table-container">
      <el-table
        ref="paramsTable"
        :data="params.list"
        style="width: 100%"
        v-loading="params.listLoading"
        border
      >
        <el-table-column label="名称" align="center" prop="routeName" />
        <el-table-column label="用户" align="center" prop="createUser" />
        <el-table-column
          label="添加时间"
          width="160"
          align="center"
          prop="createTime"
        />
        <el-table-column label="是否启用" width="90" align="center">
          <template #default="scope">
            <Status :rowInfo="scope.row" @changePage="getList" />
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="routeDescribe" />
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <Edit :rowInfo="scope.row" @changePage="getList" />
            <FromDel :id="scope.row.id" @changePage="getList" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page="params.listQuery.pageNum"
        :page-size="params.listQuery.pageSize"
        :page-sizes="[10, 15, 20]"
        :total="params.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<style lang="scss"></style>
