<script setup lang="ts">
import { getPageList } from "/@/api/menu";
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
const admin = reactive({
  listQuery: {
    pageNum: 1,
    pageSize: 10
  },
  parentId: 0,
  total: 0,
  list: [],
  listLoading: false
});
//菜单页面等级切换
let parentId = ref(0);
const { globalProperties } = useCurrentInstance();
const query = globalProperties.$router.currentRoute.value.query;
watchEffect(() => {
  parentId.value = query.parentId ? query.parentId : 0;
  console.log(globalProperties.$router);
  console.log(parentId.value);
});
const handleShowNextLevel = (index, row) => {
  globalProperties.$router.push({
    path: "/ums/menu",
    query: { parentId: row.id }
  });
};
const formatterLevel = (row, column, cellValue, index) => {
  console.log(cellValue);
  if (cellValue === 0) {
    return "一级";
  } else if (cellValue === 1) {
    return "二级";
  }
};
const disableNextLevel = value => {
  if (value === 0) {
    return false;
  } else {
    return true;
  }
};
onBeforeMount(() => {
  getList();
});
//获取顶级菜单
const selectMenuList = ref([]);
getPageList(0, { pageSize: 100, pageNum: 1 }).then(response => {
  const menuList = response?.list;
  menuList.unshift({ id: 0, title: "无上级菜单" });
  selectMenuList.value = menuList;
});
const getList = async () => {
  admin.listLoading = true;
  const data = await getPageList(parentId.value, admin.listQuery);
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
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <Add class="btn-add" :menuList="selectMenuList" @changePage="getList" />
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

        <el-table-column label="菜单名称" align="center" prop="name" />

        <el-table-column
          label="菜单级数"
          align="center"
          prop="level"
          :formatter="formatterLevel"
        />
        <el-table-column label="前端名称" align="center" prop="title" />
        <el-table-column label="前端图标" align="center" prop="icon" />
        <el-table-column label="是否启用" width="90" align="center">
          <template #default="scope">
            <Status :rowInfo="scope.row" @changePage="getList" />
          </template>
        </el-table-column>
        <el-table-column label="排序" align="center" prop="sort" />
        <el-table-column label="设置" width="120" align="center">
          <template #default="scope">
            <el-button
              size="small"
              type="text"
              :disabled="disableNextLevel(scope.row.level)"
              @click="handleShowNextLevel(scope.$index, scope.row)"
              >查看下级
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <Edit
              :rowInfo="scope.row"
              :menuList="selectMenuList"
              @changePage="getList"
            />
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
