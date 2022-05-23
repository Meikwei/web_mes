import { RectNode, RectNodeModel } from "@logicflow/core";

class MaintainModel extends RectNodeModel {
  // 定义锚点属性
  getDefaultAnchor() {
    const { width, height, x, y, id } = this;
    return [
      {
        x: x - 0.5 * width,
        y,
        name: "left",
        id: `${id}_left`
      },
      {
        x: x + 0.5 * width,
        y,
        name: "right",
        id: `${id}_right`
      }
    ];
  }

  initNodeData(data) {
    super.initNodeData(data);
    this.text.draggable = false; // 不允许文本被拖动
    this.text.editable = false; // 不允许文本被编辑
  }
  getTextStyle() {
    const style = super.getTextStyle();
    style.fontSize = 16;
    style.color = "red";
    return style;
  }
}

class MaintainView extends RectNode {}

export default {
  type: "maintain-node",
  view: MaintainView,
  model: MaintainModel
};
