<script setup lang="ts">
import { getPageList } from "/@/api/role";
import { ref, reactive, onBeforeMount } from "vue";
import type { ElForm } from "element-plus";
import Add from "./components/add.vue";
import Edit from "./components/edit.vue";
import FromDel from "./components/fromDel.vue";
import Status from "./components/status.vue";
const admin = reactive({
  listQuery: {
    keyword: "",
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
  admin.listLoading = true;
  const data = await getPageList(admin.listQuery);
  console.log(data);
  const { list, totalPage } = data;
  admin.list = list;
  admin.total = totalPage;
  admin.listLoading = false;
};
// 查询数据
const handleSearchList = () => {
  admin.listQuery.pageNum = 1;
  getList();
};
// 表单重置
type FormInstance = InstanceType<typeof ElForm>;
const formRef = ref<FormInstance>();
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  console.log(admin.listQuery);
  getList();
};
// 改变页码
const handleSizeChange = (val: number) => {
  admin.listQuery.pageNum = 1;
  admin.listQuery.pageSize = val;
  getList();
};
// 改变页面数量
const handleCurrentChange = (val: number) => {
  admin.listQuery.pageNum = val;
  getList();
};
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
          :model="admin.listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item label="输入搜索：" prop="keyword">
            <el-input
              v-model="admin.listQuery.keyword"
              class="input-width"
              placeholder="角色名称"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <Add class="btn-add" @changePage="getList" />
    </el-card>
    <div class="table-container">
      <el-table
        ref="adminTable"
        :data="admin.list"
        style="width: 100%"
        v-loading="admin.listLoading"
        border
      >
        <el-table-column label="编号" width="100" align="center" prop="id" />

        <el-table-column label="角色名称" align="center" prop="name" />

        <el-table-column label="描述" align="center" prop="description" />
        <el-table-column label="用户数" align="center" prop="adminCount" />
        <el-table-column
          label="创建时间"
          width="160"
          align="center"
          prop="createTime"
        />
        <el-table-column label="是否启用" width="90" align="center">
          <template #default="scope">
            <Status :rowInfo="scope.row" @changePage="getList" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
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
        :current-page="admin.listQuery.pageNum"
        :page-size="admin.listQuery.pageSize"
        :page-sizes="[10, 15, 20]"
        :total="admin.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<style lang="scss"></style>
