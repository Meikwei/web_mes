import { App } from "vue";
import control from "./Control.vue";
import dataDialog from "./DataDialog.vue";
export const Control = Object.assign(control, {
  install(app: App) {
    app.component(control.name, control);
  }
});

export const DataDialog = Object.assign(dataDialog, {
  install(app: App) {
    app.component(dataDialog.name, dataDialog);
  }
});

