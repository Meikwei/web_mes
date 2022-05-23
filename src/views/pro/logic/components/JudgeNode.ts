import { DiamondNode, DiamondNodeModel } from "@logicflow/core";

class JudegeDiamondModel extends DiamondNodeModel {
  setAttributes() {
    this.rx = 50;
    this.ry = 20;
  }
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
        x,
        y: y - 0.5 * height,
        name: "top",
        id: `${id}_top`
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
    style.fontSize = 12;
    style.color = "red";
    return style;
  }
}

export default {
  type: "judge-node",
  view: DiamondNode,
  model: JudegeDiamondModel
};
