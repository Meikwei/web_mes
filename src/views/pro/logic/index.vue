<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect, watch, unref } from "vue";
import LogicFlow from "@logicflow/core";
import {
  Menu,
  DndPanel,
  //Control,
  MiniMap,
  SelectionSelect,
  Snapshot
} from "@logicflow/extension";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";
// @ts-ignore
import type { FormInstance, FormRules } from "element-plus";
import { Control, DataDialog } from "./components/src";
import { commonStoreHook } from "/@/store/modules/commonStore";
import CommonNode from "./components/CommonNode";
import JudePolygonNode from "./components/JudgeNode";
import ContainerNode from "./components/ContainerNode";
import MaintainNode from "./components/MaintainNode";
// @ts-ignore
import addNode from "./components/add.vue";
import { create, getInfo } from "/@/api/proRoute";
import useCurrentInstance from "/@/utils/vueInstance";
const { globalProperties } = useCurrentInstance();
// 获取路由信息
const query = globalProperties.$router.currentRoute.value.query;
console.log(query);
watchEffect(async () => {
  console.log(query);
  const info = await getInfo(query.id);
  console.log(JSON.parse(info.routeData));
});
const store = commonStoreHook();
const addRef = ref(null);
let lf = ref(null);
let graphData = ref(null);
let dataVisible = ref<boolean>(false);
let saveDialogVisible = ref<boolean>(false);
let saveRouteData = reactive({
  routeName: "",
  routeData: null,
  routeDescribe: ""
});
const rules = reactive<FormRules>({
  routeName: [{ required: true, message: "请输入工艺名称", trigger: "blur" }]
});
const ruleFormRef = ref<FormInstance>();
let config = ref({
  grid: true,
  background: {
    color: "#f7f9ff"
  },
  keyboard: {
    enabled: true
  },
  plugins: [DndPanel, SelectionSelect, MiniMap, Menu, Snapshot]
});
// 查看数据
function catData() {
  graphData.value = unref(lf).getGraphData();
  console.log(graphData.value);
  dataVisible.value = true;
}
// 保存数据弹出框
function saveData() {
  graphData.value = unref(lf).getGraphData();
  saveRouteData.routeData = JSON.stringify(graphData.value);
  console.log(graphData.value);
  saveDialogVisible.value = true;
}
// 将工艺流程数据提交到后台
const submit = () => {
  create(saveRouteData);
  saveDialogVisible.value = false;
};
// 清空Form表单数据
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  saveDialogVisible.value = false;
};
const initLf = () => {
  const domLf = new LogicFlow({
    ...unref(config),
    container: document.querySelector("#LF-Turbo")
  });
  lf.value = domLf;
  store.lf = lf.value;
  //注册自定义节点
  lf.value.register(CommonNode);
  lf.value.register(JudePolygonNode);
  lf.value.register(ContainerNode);
  lf.value.register(MaintainNode);
  // 框选与画布托拽不能同时存在
  // lf.value.openSelectionSelect();
  // 1.1.0新增用法
  // lf.value.extension.selectionSelect.openSelectionSelect();
  // 添加导航
  // lf.extension.miniMap.show();
  // lf.extension.control.addItem({
  //   iconClass: "custom-minimap",
  //   title: "",
  //   text: "导航",
  //   onMouseEnter: (lf, ev) => {
  //     const position = lf.getPointByClient(ev.x, ev.y);
  //     lf.extension.miniMap.showMiniMap.show(
  //       position.domOverlayPosition.x - 120,
  //       position.domOverlayPosition.y + 35
  //     );
  //   },
  //   onClick: (lf, ev) => {
  //     const position = lf.getPointByClient(ev.x, ev.y);
  //     lf.extension.miniMap.show(
  //       position.domOverlayPosition.x - 120,
  //       position.domOverlayPosition.y + 35
  //     );
  //   }
  // });
  // 为菜单追加选项（必须在 lf.render() 之前设置）
  lf.value.extension.menu.addMenuConfig({
    graphMenu: [
      {
        text: "添加制程",
        callback() {
          addRef.value.open();
          //alert("分享成功！");
        }
      }
    ]
  });
  lf.value.render();
};
onMounted(() => {
  initLf();
});
</script>
<template>
  <div class="logic-flow-view">
    <!-- 辅助工具栏 -->
    <Control
      class="demo-control"
      v-if="lf"
      :lf="lf"
      :catTurboData="false"
      @catData="catData"
      @saveData="saveData"
    ></Control>

    <div id="LF-Turbo"></div>
    <el-dialog
      customClass="flow-dialog"
      title="数据"
      v-model="dataVisible"
      width="50%"
    >
      <el-scrollbar>
        <DataDialog :graphData="graphData"></DataDialog>
      </el-scrollbar>
    </el-dialog>
    <el-dialog v-model="saveDialogVisible" title="保存流程图" width="50%">
      <el-form
        label-position="top"
        label-width="100px"
        :rules="rules"
        ref="ruleFormRef"
        :model="saveRouteData"
        style="max-width: 460px"
      >
        <el-form-item label="工艺名称">
          <el-input v-model="saveRouteData.routeName" />
        </el-form-item>
        <el-form-item label="工艺描述">
          <el-input
            :rows="2"
            type="textarea"
            v-model="saveRouteData.routeDescribe"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetForm(ruleFormRef)">取消</el-button>
          <el-button type="primary" @click="submit">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <addNode ref="addRef" />
  </div>
</template>
<style scoped>
#LF-Turbo {
  width: 100%;
  height: calc(100vh - 90px);
}
.logic-flow-view {
  position: relative;
}
.demo-control {
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 2;
}
:deep(.flow-dialog) {
  transform: none;
  left: 0;
  top: 5vh;
  position: relative;
  margin: 0 auto;
}

:deep(.flow-dialog) .el-dialog__body {
  height: 85vh;
  overflow: auto;
}

.main-content {
  margin: 0;
}
</style>
