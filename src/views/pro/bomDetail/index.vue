<script setup lang="ts">
import { getPageList } from "/@/api/bomDetail";
import { bomSelect } from "/@/api/bom";
import { ref, reactive, onBeforeMount, watchEffect } from "vue";
import useCurrentInstance from "/@/utils/vueInstance";
import type { ElForm } from "element-plus";
// @ts-ignore
import Add from "./components/add.vue";
// @ts-ignore
import Edit from "./components/edit.vue";
// @ts-ignore
import FromDel from "./components/fromDel.vue";
// @ts-ignore
import Status from "./components/status.vue";
import console from "console";
const params = reactive({
  listQuery: {
    partNo: "",
    pageNum: 1,
    pageSize: 10
  },
  total: 0,
  list: [],
  listLoading: false
});
const bomList = ref([]);
bomSelect().then(response => {
  console.log(response);
  bomList.value = response.data;
});

onBeforeMount(() => {
  getList();
});
const getList = async () => {
  params.listLoading = true;
  const data = await getPageList(params.listQuery);
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
          <el-form-item label="物料编号：" prop="partNo">
            <el-select v-model="params.listQuery.partNo">
              <el-option
                v-for="item in bomList"
                :key="item.id"
                :label="item.partNo"
                :value="item.partNo"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <div class="table-container">
      <el-table
        ref="paramsTable"
        :data="params.list"
        style="width: 100%"
        v-loading="params.listLoading"
        border
      >
        <el-table-column
          label="料号"
          width="160"
          align="center"
          prop="itemPartNo"
        />
        <el-table-column label="组件描述" width="160" align="center">
          <template #default="scope">
            <el-popover
              effect="light"
              trigger="hover"
              placement="top"
              width="auto"
            >
              <template #default>
                <div>{{ scope.row.itemDescribe }}</div>
              </template>
              <template #reference>
                <el-tag>详情</el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="物料代码"
          width="160"
          align="center"
          prop="itemShopName"
        />
        <el-table-column
          label="刷入方式"
          width="160"
          align="center"
          prop="itemScanType"
        />
        <el-table-column
          label="替代物料组"
          width="160"
          align="center"
          prop="itemCode"
        />
        <el-table-column
          label="数量"
          width="160"
          align="center"
          prop="itemQty"
        />
        <el-table-column label="单位" align="center" prop="itemUnit" />
        <el-table-column label="废品率" align="center" prop="attritionPart" />
        <el-table-column
          label="用户"
          width="160"
          align="center"
          prop="createUser"
        />
        <el-table-column
          label="添加时间"
          width="160"
          align="center"
          prop="createTime"
        />
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <Edit :rowInfo="scope.row" @changePage="getList" />
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
